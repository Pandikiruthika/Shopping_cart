import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './Screens/DashBoard/dashboard';
import PageNotFound from './Screens/pages/pagesNotFound';
import Login from './Auth/login';
import Register from './Auth/register';
import NavBar from './Components/navbar';
import VerifyOtp from './Auth/verifyOtp';
import WomenDashBoard from './Screens/women/womenDashboard'
import MenDashBoard from './Screens/Men/menDashBoard';
import RegisterVerifyOtp from './Auth/registerVerifyOtp'
import KidsDashBoard from './Screens/kids/kidsDashBoard';
import SareeDetail from './Screens/women/sareeDetail'
import Product from './Screens/product/product'
import UpdateUser from './Auth/updateUser'
import AddCarts from './Screens/carts/AddCarts'
import Order from './Screens/Order/order'
import Review from "./Screens/Review/review"
import OrderHistory from "./Screens/orderHistory/orderhistory"
export default function App() {
  const token = sessionStorage.getItem('token');
  const location = useLocation(); 

  return (
    <>
    
      {location.pathname !== '/404' && <NavBar />}
      
      <Routes>
        {token ? (
          <>
            
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
             {/* <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="*" element={<PageNotFound />} /> */} 
            <Route path="/" element={<Dashboard />} />
            <Route path="/women" element={<WomenDashBoard />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/men" element={<MenDashBoard  />} />
            <Route path="/kids" element={<KidsDashBoard  />} />
            <Route path="/sareedetail/:id" element={<SareeDetail  />} />
            <Route path="/update" element={<UpdateUser  />} />
            <Route path="/addcart" element={<AddCarts  />} />
            <Route path="/order/:id" element={<Order  />} />
            <Route path="/review/:id" element={<Review />} />
            <Route path="/orderhistory" element={<OrderHistory />} />

          </>
        ) : (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<VerifyOtp />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verifyregister" element={<RegisterVerifyOtp />} />
            <Route path="/women" element={<WomenDashBoard />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/men" element={<MenDashBoard  />} />
            <Route path="/kids" element={<KidsDashBoard  />} />
            <Route path="/sareedetail/:id" element={<SareeDetail  />} />
            <Route path="/404" element={<PageNotFound />} />

            <Route path="*" element={<Navigate replace to="/404" />} />
          </>
        )}
      </Routes>
    </>
  );
}







