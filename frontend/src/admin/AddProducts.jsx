import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import api from '../Api'; 
import { FiUploadCloud, FiEdit, FiTrash2, FiPlus, FiSave } from 'react-icons/fi';

const Spinner = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
);

const SkeletonCard = () => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex flex-col shadow-lg animate-pulse">
    <div className="h-48 w-full bg-slate-700 rounded-lg"></div>
    <div className="mt-4 flex flex-col gap-3">
      <div className="h-6 w-3/4 bg-slate-700 rounded"></div>
      <div className="h-5 w-1/4 bg-slate-700 rounded"></div>
      <div className="h-4 w-full bg-slate-700 rounded mt-1"></div>
      <div className="h-4 w-5/6 bg-slate-700 rounded"></div>
    </div>
    <div className="mt-auto flex gap-3 pt-4">
      <div className="h-10 w-full bg-slate-700 rounded-lg"></div>
      <div className="h-10 w-full bg-slate-700 rounded-lg"></div>
    </div>
  </div>
);


const ProductCard = ({ product, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${product.product_name}"?`)) {
      setIsDeleting(true);
      try {
        await onDelete(product.product_id);
      } catch (error) {
        toast.error("Failed to delete product.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 flex flex-col shadow-lg hover:border-cyan-500/50 transition-all duration-300 group">
      <img
        src={product.product_img}
        alt={product.product_name}
        className="h-48 w-full object-cover rounded-lg mb-4"
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
          {product.product_name}
        </h3>
        <p className="text-xl font-semibold text-green-400">PKR {product.price}</p>
        <p className="text-sm text-slate-400 line-clamp-2">{product.description}</p>
      </div>
      <div className="mt-auto flex gap-3 pt-4">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <FiEdit /> Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-red-800 disabled:cursor-not-allowed"
        >
          {isDeleting ? <Spinner /> : <><FiTrash2 /> Delete</>}
        </button>
      </div>
    </div>
  );
};


const AddProducts = () => {
  const initialFormState = {
    productName: '',
    price: '',
    description: '',
    categoryId: '',
  };

  const [productForm, setProductForm] = useState(initialFormState);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  
  const [editingProductId, setEditingProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          api.get('/allcategories'),
          api.get('/allproducts'),
        ]);
        setAllCategories(categoriesRes.data);
        setAllProducts(productsRes.data.products);
      } catch (error) {
        toast.error('Failed to load initial data. Please refresh.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setProductForm(initialFormState);
    setImageFile(null);
    setImagePreview('');
    setEditingProductId(null);
    formRef.current.reset(); 
  };
  
 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { productName, price, description, categoryId } = productForm;

    if (!productName || !price || !description || !categoryId || (!imageFile && !editingProductId)) {
      return toast.error('All fields, including image, are required!');
    }
    
    setIsSubmitting(true);
    let imageUrl = imagePreview;

    try {
      
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
      
        const { data } = await axios.post('http://localhost:5004/api/v1/upload', formData);
        imageUrl = data.imgUrl;
        toast.success('Image uploaded successfully!');
      }

      const productData = { ...productForm, productImg: imageUrl };

      if (editingProductId) {
        await api.put(`/product/${editingProductId}`, productData);
        toast.success('Product updated successfully!');
      } else {
        await api.post('/products', productData);
        toast.success('Product added successfully!');
      }

      resetForm();
      const productsRes = await api.get('/allproducts');
      setAllProducts(productsRes.data);

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred.';
      toast.error(`Operation failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (product) => {
    setEditingProductId(product.product_id);
    setProductForm({
      productName: product.product_name,
      price: product.price,
      description: product.description,
      categoryId: product.category_id,
    });
    setImagePreview(product.product_img);
    setImageFile(null);
    formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const handleDeleteProduct = async (productId) => {
    try {
      await api.delete(`/product/${productId}`);
      setAllProducts((prev) => prev.filter((p) => p.product_id !== productId));
      toast.success('Product deleted!');
    } catch {
      toast.error('Deletion failed. Please try again.');
      throw new Error('Deletion failed'); 
    }
  };


  const inputStyle = "w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all";
  const btnStyle = "w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-3 disabled:bg-slate-700 disabled:cursor-wait";

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{
        style: { background: '#1e293b', color: '#fff', border: '1px solid #334155' },
      }}/>
      <div className="bg-slate-900 text-slate-100 min-h-screen w-full pt-28 pb-10 px-4">
        <main className="max-w-7xl mx-auto flex flex-col items-center gap-y-12">
          
          <section className="w-full max-w-2xl">
            <form
              ref={formRef}
              onSubmit={handleFormSubmit}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/20 flex flex-col gap-y-5"
            >
              <h1 className="text-3xl font-extrabold text-center text-white mb-2">
                {editingProductId ? 'Update Product Details' : 'Create New Product'}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="productName" value={productForm.productName} onChange={handleInputChange} placeholder="Product Name" className={inputStyle} />
                <input type="number" name="price" value={productForm.price} onChange={handleInputChange} placeholder="Price (PKR)" className={inputStyle} />
              </div>

              <textarea name="description" value={productForm.description} onChange={handleInputChange} placeholder="Product Description" className={`${inputStyle} h-24 resize-none`} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <select name="categoryId" value={productForm.categoryId} onChange={handleInputChange} className={inputStyle}>
                  <option value="">Select Category</option>
                  {allCategories.map((c) => (
                    <option key={c.category_id} value={c.category_id}>{c.category_name}</option>
                  ))}
                </select>

                <label htmlFor="file-upload" className={`${inputStyle} cursor-pointer flex items-center justify-center gap-2 text-slate-400`}>
                  <FiUploadCloud /> {imageFile ? imageFile.name : 'Upload Image'}
                </label>
                <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </div>

              {imagePreview && (
                <div className="w-full text-center">
                  <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain border-2 border-slate-700" />
                </div>
              )}

              <div className="flex gap-4 mt-2">
                <button type="submit" disabled={isSubmitting} className={btnStyle}>
                  {isSubmitting ? <Spinner /> : editingProductId ? <><FiSave/> Update Product</> : <><FiPlus/> Add Product</>}
                </button>
                {editingProductId && (
                  <button type="button" onClick={resetForm} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
              ) : (
                allProducts.map((p) => (
                  <ProductCard key={p.product_id} product={p} onEdit={handleEditClick} onDelete={handleDeleteProduct} />
                ))
              )}
            </div>
          </section>
          
        </main>
      </div>
    </> 
  );
};

export default AddProducts;