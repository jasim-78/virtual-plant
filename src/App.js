import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import Admin from './Admin/admin';
import User from './User/user';
import Login from './Home Page/Login';
import Home from './Home Page/Home';
import Header from './Home Page/Header';
import Manageproducts from './Admin/manageproducts';
import Adminnav from './Admin/Adminnav';
import Registration from './Home Page/Register';
import Manageusers from './Admin/Manageusers';
import About from './Home Page/About';
import Usernav from './User/Usernav';
import Cart from './User/Cart';
import { ToastContainer } from 'react-toastify';
import Myorders from './User/Myorders';
import Myprofile from './User/Myprofile';
export const baseurl = "http://localhost:8081"


export default function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path='' element={<Header />}>
          <Route path='' element={<Home />} />
          <Route path='About' element={<About />} />
          <Route path='Login' element={<Login />} />
          <Route path='Register' element={<Registration />} />
        </Route>
      </Routes>
      <Routes>
        <Route path='Admin' element={<Adminnav />}>
          <Route index element={<Admin />} />
          <Route path='Manageproducts' element={<Manageproducts />} />
          <Route path='Manageusers' element={<Manageusers />} />
        </Route>
        <Route path='User' element={<Usernav/>}>
        <Route index element={<User />} />
        <Route path='Cart' element={<Cart />}/>
        <Route path='MyOrders' element={<Myorders />}/>
        <Route path='MyProfile' element={<Myprofile />}/>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

