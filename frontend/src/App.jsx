import { useEffect } from 'react';
import Fotter from './components/Fotter';
import Navbar from './components/Navbar';
import CustomRoutes from './Routes/CustomRoutes';
import axios from 'axios';
import { useContext } from 'react';
import { GlobalContext } from './Context/Context';
import api from './Api';

const App = () => {


   let {state, dispatch} = useContext(GlobalContext);
   console.log("state demo" , state)

  useEffect(() => {
    const getUserData = async() => {
      try {
        let res = await api.get('/profile');
        dispatch({type: "USER_LOGIN", payload: res?.data?.user})
        console.log("profile....", res.data.user.email)
      } catch (error) {
        console.log('profile ', error)
        dispatch({type: "USER_LOGOUT"})
      }
    }
    getUserData();
  } , [])

  return (
    <>
    <Navbar/>
    <CustomRoutes/>
    <Fotter/>
    </>
  )
}

export default App
