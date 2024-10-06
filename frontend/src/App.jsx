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
            <Route path="/order" element={<Order  />} />

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









// import React, { useState } from 'react';
// import axios from 'axios';

// const ProductUpload = () => {
//   const [categoryid, setCategoryId] = useState('');
//   const [subcategoryid, setSubCategoryId] = useState('');
//   const [price, setPrice] = useState('');
//   const [colour, setColour] = useState('');
//   const [extraCharges, setExtraCharges] = useState('');
//   const [netWeight, setNetWeight] = useState('');
//   const [typeofproduct, setTypeofProduct] = useState('');
//   const [pattern, setPattern] = useState('');
//   const [productDescription, setProductDescription] = useState('');
//   const [files, setFiles] = useState([]); // Updated to handle multiple files
//   const [message, setMessage] = useState('');

//   // Handle multiple file changes
//   const handleFileChange = (e) => {
//     setFiles(Array.from(e.target.files)); // Convert FileList to an array
//   };

//   // Submit the form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare form data
//     const formData = new FormData();

//     // Append each file
//     files.forEach((file, index) => {
//       formData.append('files', file); // Append each file to FormData
//     });

//     // Append other fields
//     formData.append('categoryid', categoryid);
//     formData.append('subcategoryid', subcategoryid);
//     formData.append('price', price);
//     formData.append('colour', colour);
//     formData.append('extraCharges', extraCharges);

//     // Append product details as individual key-value pairs
//     formData.append('netWeight', netWeight);
//     formData.append('typeofproduct', typeofproduct);
//     formData.append('pattern', pattern);
//     formData.append('productDescription', productDescription);

//     try {
//       const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbGlkIjoicGFuZGlraXJ1dGhpa2EyMDAyQGdtYWlsLmNvbSIsInJvbGV0eXBlIjoiQWRtaW4iLCJpYXQiOjE3MjUxNjcxMjJ9.WzoYtJ5EqRdL7_9CwK1Z2r-5TFUNMkMaTMuxajq3dnI";
//       const response = await axios.post('http://localhost:4000/api/product', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setMessage('Product created successfully!');
//     } catch (error) {
//       console.error(error);
//       setMessage('Failed to create product.');
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Create Product</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Category ID</label>
//           <input
//             type="text"
//             className="form-control"
//             value={categoryid}
//             onChange={(e) => setCategoryId(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label>Subcategory ID</label>
//           <input
//             type="text"
//             className="form-control"
//             value={subcategoryid}
//             onChange={(e) => setSubCategoryId(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label>Price</label>
//           <input
//             type="number"
//             className="form-control"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label>Colour</label>
//           <input
//             type="text"
//             className="form-control"
//             value={colour}
//             onChange={(e) => setColour(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label>Extra Charges</label>
//           <input
//             type="number"
//             className="form-control"
//             value={extraCharges}
//             onChange={(e) => setExtraCharges(e.target.value)}
//           />
//         </div>

//         {/* Product Details Section */}
//         <div className="form-group">
//           <label>Product Details</label>
//           <div className="product-detail">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Net Weight"
//               value={netWeight}
//               onChange={(e) => setNetWeight(e.target.value)}
//             />
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Type of Product"
//               value={typeofproduct}
//               onChange={(e) => setTypeofProduct(e.target.value)}
//             />
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Pattern"
//               value={pattern}
//               onChange={(e) => setPattern(e.target.value)}
//             />
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Product Description"
//               value={productDescription}
//               onChange={(e) => setProductDescription(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* File Upload */}
//         <div className="form-group">
//           <label>Upload Files</label>
//           <input type="file" className="form-control" onChange={handleFileChange} multiple />
//         </div>

//         <button type="submit" className="btn btn-primary">Create Product</button>
//       </form>

//       {message && <p className="mt-3">{message}</p>}
//     </div>
//   );
// };

// export default ProductUpload;









