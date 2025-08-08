import express from "express";
import db from "./db.js";
import bcrypt from 'bcryptjs';
import jwt, { decode } from 'jsonwebtoken';
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from  'path'; 
import { upload } from "./cloudnary/cloudnary.js";
import crypto from 'crypto'
import { sendVerificationEmail } from "./utils/nodemailer.js";
import { AwsPage } from "twilio/lib/rest/accounts/v1/credential/aws.js";

const token = crypto.randomBytes(3).toString("hex");
console.log(token);

const app = express();
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true 
}));

app.use(cookieParser());
app.use(express.json());
const isDev = process.env.NODE_ENV !== "production";
let SECRET = process.env.SECRET_key; 


app.get('/get-user', async (req, res) =>{
   try {
    let user = await db.query("SELECT * FROM users")
    res.send({message: user.rows})
   } catch (error) {
    res.send({message: "internel server error"})
     console.log(error)
   }
})

// Signup api
app.post('/api/v1/signup',async (req , res) => {
    let {firstName , lastName , email , password} = req.body;
    if(!firstName || !lastName || !email || !password){
     res.status(400).send({message: "All field Requried"});
     return;
    };
    email = email.toLowerCase();
    let query = "SELECT * FROM users WHERE email = $1"
    let values = [email];
    console.log("query", query);
    try {
    let result = await db.query(query , values) 
    if(result.rows?.length){
        res.status(400).send({message: "User alreay Exits With This Email"})
        console.log(result.rows?.length)
        return;
    };
    let addQurey = "INSERT INTO users(first_name, last_name, email, password) VALUES($1, $2, $3, $4)"
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    let addValues = [firstName , lastName , email, hash]
    let addUsers = await db.query(addQurey, addValues) 
    res.status(200).send({message: "User Created", users: addUsers})
    } catch (error) {
        res.status(400).send({message: "internel server error"})
        console.log(error)
    }
});

//login Api
app.post('/api/v1/login', async (req , res) => {
    let {email , password} = req.body;
    if(!email || !password){
     res.status(400).send({message: "All Field Requried"});
      return;
    }
    email = email.toLowerCase();
    try {
     let qurey = "SELECT * FROM users WHERE email = $1";
     let value =  [email]
     let result = await db.query(qurey , value);
     if(!result.rows.length){
        res.status(404).send({message: "User not found"})
        return
     }
     let isMatched = bcrypt.compareSync(password, result.rows[0].password); 
     if(!isMatched){
        res.status(401).send({message: "Wrong password"});
        return;
     };
     let token = jwt.sign({ 
        id: result.rows[0].user_id,
        first_name: result.rows[0].first_name,
        last_name: result.rows[0].last_name,
        email: result.rows[0].email,
        user_role: result.rows[0].user_role,
        phone: result.rows[0].phone,
        profile: result.rows[0].profile,
        created_at: result.rows[0].created_at,
      }, SECRET, {expiresIn: "1d"});
        res.cookie('token', token, {
        maxAge: 86400 * 1000,
        httpOnly: true,
        secure: true,     
        sameSite: "none" 
      });
     const {password: _p, ...users } = result.rows[0];
     res.status(200).send({ message: "Login successful", user: users });
    } catch (error) {
      console.error("Login Error:", error.message);
      res.status(500).send({ message: "Server error" });
    }
    
});
app.post('/api/v1/forget-password', async (req, res) => {
   const {email} = req.body;
   if(!email){
    res.status(404).send({message: "email is Requried"})
    return
   }
   let qurey = 'SELECT * FROM user WHERE email = $1';
   let value = [email]
   let userEmail = await db.query(qurey, value);
   if(!userEmail){
    res.status(404).send({message: "email not found with this wmail"})
    return
   }  
})
// logout Api
app.post("/api/v1/logout", (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: "none",
    secure: true
  })
  res.status(200).send({message: "User Logout"});
});

app.post('/api/v1/upload', upload.single('image'), async (req, res) => {
  try {
    if(!req.file){
      return res.status(400).send({message: "no file Upload"});
    }
    const imgUrl = req.file.path
    res.status(201).send({message: "Image uploaded successfully", imgUrl})
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });  
    console.error("Upload Error:", error);
  }
})



// jwt token
app.use('/api/v1/*splat',(req, res , next) => {
  if(!req.cookies?.token){
    res.status(401).send({message: "Unauthorized"})
    return;
  }
  jwt.verify(req.cookies?.token , SECRET, (err , decodedData) => {
    if(!err){
      const nowDate = new Date().getTime() / 1000;
      if(decodedData?.exp < nowDate){
        res.status(401);
        res.cookie('Token', '', {
          maxAge: 1, 
          httpOnly: true,
          secure: true
        })
        res.send({ message: "token expired" })
      }else{
         console.log("token approved");
         req.body = {...req.body, token: decodedData}
         next()
      }  
    }
    else{
      res.status(401).send({message: "invalid token"})
    }
  })
})

app.get('/api/v1/profile', async (req, res) => {
  const userToken = req.body.token;
  console.log("userToken id" , userToken?.id)
  if (!userToken?.id) {
    return res.status(401).send({ message: "Invalid token" });
  }

  let query = `SELECT * FROM users WHERE user_id = $1`;
  let value = [userToken.id];
  try {
    let result = await db.query(query, value);
    res.status(200).send({
      message: "User Found",
      user: {
        user_id: result.rows[0].user_id,
        first_name: result.rows[0].first_name,
        last_name: result.rows[0].last_name,
        email: result.rows[0].email,
        phone: result.rows[0].phone,
        user_role: result.rows[0].user_role,
        profile: result.rows[0].profile,
      }
    });
  } catch (error) {
    console.log("Error in /profile", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Upload Api



// products Api
app.get("/api/v1/allproducts", async (req, res) => {
  let page =  parseInt(req.query.page) || 1;
  let limit = 10;
  let skippage = (page - 1) * limit;
  try {
    let countResult = await db.query(`SELECT COUNT(*) FROM products`);
    let totalProduct = (countResult.rows[0].count);
    let totalPage = Math.ceil(totalProduct / limit);
    let qurey = `SELECT p.product_id, p.product_name, p.price, p.product_img, p.description, p.created_at, p.category_id, c.category_name FROM products AS p INNER JOIN categories AS c ON p.category_id = c.category_id ORDER BY p.product_id DESC LIMIT $1 OFFSET $2;`;
    let result = await db.query(qurey , [limit , skippage])
    res.status(200).send({
      page,
      totalPage,
      totalProduct,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPage ? page + 1 : null,
      products: result.rows
    });
  } catch (error) {
    console.log(error)
  }
});

app.post("/api/v1/products", async(req , res) => {
   const {productName , price , description , productImg, categoryId} = req.body;
   if(!productName || !price || !description || !productImg || !categoryId){
    res.status(400).send({message: "All Field Requried"});
    return;
   }

   try {
    let query = 'INSERT INTO products(product_name , price , description, product_img, category_id) VALUES($1, $2, $3, $4, $5)';
    let value = [productName, price , description , productImg, categoryId];
    let ressult = await db.query(query, value);
    res.status(200).send({message: "Product Added", ressult});  
   } catch (error) {
    res.status(404).send({message: "internel Server error"})
    console.log(error)
  }
  
});

app.put("/api/v1/product/:id", async (req , res) => {
    const {productName , price , description , productImg, categoryId} = req.body;
    let {id} = req.params;
   if(!productName || !price || !description || !productImg || !categoryId){
    res.status(400).send({message: "All Field Requried"});
    return;
   }
   try {
    let qures = 'UPDATE products SET product_name = $1, price = $2, description = $3, product_img = $4, category_id = $5 WHERE product_id = $6';
    let values = [productName, price, description, productImg, categoryId, id];
    let result = await db.query(qures , values)
    if (result.rowCount === 0) {
      return res.status(404).send({ message: "Products not found" });
    }
    res.status(201).send({message: "Product updated"})
   } catch (error) {
    res.status(500).send({message: "internel server error"})
    console.log(error)
   }

})

app.delete("/api/v1/product/:id", async (req, res) => {
  let {id} = req.params;
  try {
    let result = await db.query('delete from products WHERE product_id = $1', [id]);
    res.status(201).send({message: "product Deleted"});
  } catch (error) {
    res.status(500).send({message: "internel server error"});
    console.log(error);
  }
})

//allcategories Api
app.get("/api/v1/allcategories", async(req, res) => {
  try {
    let ressult = await db.query('SELECT * FROM categories ORDER BY category_id DESC');
    res.status(200).send(ressult.rows)
  } catch (error) {
    console.log(error)
    res.status(404).send({message: "internel Server error"})
  }
});

app.post("/api/v1/category", async(req, res) => {
  let {categoryName , description} = req.body;
  if(!categoryName || !description){
    res.status(404).send({message: "All field Requried"});
    return;
  }
  try {
    let qureys = 'INSERT INTO categories(category_name , description) VALUES ($1, $2)';
  let value = [categoryName , description];
    let ressult = await db.query(qureys, value);
    res.status(200).send({message: "Added category",  date: ressult})
  } catch (error) {
    res.status(404).send({message: "internel server error"})
    console.log(error)
  } 
});
app.put("/api/v1/category/:id", async(req, res) => {
  let {categoryName , description} = req.body;
  let {id} = req.params;
   if(!categoryName || !description){
     res.status(404).send({message: "All field Requried"});
     return;
    }
 try {
  let qureys = 'UPDATE categories SET category_name = $1, description = $2 WHERE category_id = $3';
  let value = [categoryName , description, id];
    let result = await db.query(qureys, value);
    if (result.rowCount === 0) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.status(200).send({message: "Category updated successfully", })
  } catch (error) {
    res.status(500).send({message: "internel Server error"})
    console.log(error)
  } 
});

app.delete('/api/v1/deletedcategory/:id', async (req, res) => {
  let {id} = req.params;
  let qures = 'delete from categories where category_id = $1';
  try {
    let delRes = await db.query(qures, [id]);
    res.status(201).send({message: "category deleted"})  
  } catch (error) {
    res.status(400).send({message: "category not deleted"}) 
    console.log(error) 
  }
})

//cart Api
app.get('/api/v1/cart/:user_id', async (req, res) => {
  let {user_id} = req.params;
  try {
    let qurey = 'SELECT * FROM cart WHERE user_id = $1';
    let value = [user_id];
    let response = await db.query(qurey , value);
    res.status(200).send({ cartItems: response.rows });
  } catch (error) {
    console.log(error)
    res.status(500).send({message: "internel server error"})
    
  }
})

app.post('/api/v1/cart', async (req, res) => {
  console.log("req.body", req.body)
  let {user_id, product_id, quantity ,price_per_item , product_name , product_image, product_category} = req.body;
  if(!user_id || !product_id || !quantity || !price_per_item || !product_name || !product_image || !product_category){
    res.status(400).send({message: "Allfield Requried"});
    return
  }
  try {
    let qurey = `INSERT INTO cart( user_id , product_id , quantity , price_per_item, product_name, product_image, product_category)
     VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    let values = [user_id, product_id, quantity, price_per_item, product_name, product_image, product_category];
    let response = await db.query(qurey , values);
    res.status(201).send({message: "Item added to cart", cartItems: response.rows[0]});
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).send({message: "internel server error", });
    
  }
})

app.delete('/api/v1/deletedcart/:cart_id', async (req , res) => {
  const {cart_id} = req.params;
try {
  let qurey = 'DELETE FROM cart WHERE cart_id = $1';
  let value = [cart_id]
  let result = await db.query(qurey, value);
  if(result.rowCount === 0){
    return res.status(404).send({ message: "Cart item not found" });
  }
  res.status(201).send({ message: "Cart item deleted successfully", deletedItem: result.rows[0],});
} catch (error) {
  console.error("Delete Error:", error);
  res.status(500).send({ message: "Internal server error" });
  
}
})

app.put('/api/v1/updatedcart/:id', async (req , res) => {
  const {id} = req.params;
  const {price_per_item , quantity} = req.body;
  if(!price_per_item  || !quantity){
    return res.status(401).send({message: "All fields required"});
  }
  try {
    let qurey = 'UPDATE cart SET quantity = $1, price_per_item = $2 WHERE cart_id = $3 RETURNING *';
    let values = [quantity, price_per_item, id];
    let result = await db.query(qurey, values);
    if(result.rowCount === 0){
      return res.status(404).send({ message: "Cart item not found" });
    }
    res.status(201).send({message: "Cart updated", updatedCart: result.rows[0]});
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).send({message: "Internal Server Error"});
  }
});

// const __dirname = path.resolve();
// app.use('/', express.static(path.join(__dirname, './frontend/dist')));
// app.use("/*splat" , express.static(path.join(__dirname, './frontend/dist')));

app.listen(5004, () => {
    console.log("server Is running 5004");
})
