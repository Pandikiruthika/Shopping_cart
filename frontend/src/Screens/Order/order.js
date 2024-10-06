import { useState, useEffect } from 'react';
import Tracking from './orderTrack';
import { useLazyGetOrderDataQuery, useDeleteOrderDataMutation } from '../../Service/orderSlice';
import cartImage from '../../images/addcart.png';
import { useLazyGetUserDataQuery } from "../../Service/loginSlice";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Order() { 
  const [getOrderApi] = useLazyGetOrderDataQuery();
  const navigate = useNavigate();
  const [getAddressApi] = useLazyGetUserDataQuery();
  const [product, setProduct] = useState([]);
  
  const [deletecartApi] = useDeleteOrderDataMutation();
  const [qty, setQty] = useState(1);
  const [address, setAddress] = useState([]);
  console.log(product,"dd")

  useEffect(() => {
    fetchOrder();
  }, []);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      getUser(decoded.emailid);
    }
  }, [token]);

  async function getUser(emailId) {
    try {
      const res = await getAddressApi(emailId).unwrap();
      setAddress(res);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }

  async function fetchOrder() {
    try {
      const res = await getOrderApi().unwrap();
      setProduct(res);
    } catch (error) {
      console.error('Failed to fetch order data:', error);
    }
  }

  // const cartItems = product.map((item) => item).flat();

  // Handle the total price calculation
  const totalOrderPrice = product.reduce(
    (total, item) => total + item.price * qty,
    0
  );

  const orderTotal = product.reduce(
    (total, item) => total + (item.extraCharges || 0),
    0
  );

  const handleQtyChange = (increment) => {
    setQty((prevQty) => Math.max(1, prevQty + increment)); // Prevents qty from going below 1
  };

  return (
    <div className="relative z-10 min-h-screen bg-gradient-to-r from-blue-100 to-gray-300 w-full overflow-x-hidden">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-6 space-x-0 lg:space-x-6">
        {/* Left Side - Cart Content */}
        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900">Order Details</h2>
          <div className="mt-6">
            <div className="flow-root">
              
                <ul role="list" className="-my-6 divide-y divide-gray-300">
                  {product.map((item) => (
                    <li key={item?._id} className="flex py-6 hover:bg-gray-50 transition duration-200">
                      <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border border-gray-300">
                      <h1>{item?.productDeatails[0]?.typeofProduct}</h1>
                        <img
                          alt="Product"
                          src={`http://localhost:4000/images/${item?.productDetails[0]?.image[0]?.filename}`}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex justify-between text-lg font-medium text-gray-900">
                          <h3>
                            <a href={item.href} className="hover:text-indigo-600 transition duration-200">
                              {item.productDescription} {/* Use item.productDescription directly */}
                            </a>
                          </h3>
                          <p className="ml-4 text-xl font-semibold">₹{item.price}</p>
                        </div>

                        <div className="flex space-x-2 items-center mt-4">
                         
                          <p className="text-sm text-gray-500 font-bold">Qty: {qty}</p>
                       
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              
            </div>
          </div>

          {/* Price Details */}
          {product.length > 0&& (
            <div className="border-t border-gray-300 mt-6 pt-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Product Price</p>
                <p>₹{totalOrderPrice}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Delivery Charge</p>
                <p>₹{orderTotal}</p>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-900 mt-4">
                <p>Order Total</p>
                <p>₹{totalOrderPrice + orderTotal}</p>
              </div>

              {/* Checkout Button */}
              <div className="mt-6">
                <button className="flex w-full items-center justify-center rounded-lg bg-blue-900 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-blue-900 transition duration-200 transform hover:scale-105">
                  Continue to Order
                </button>
              </div>

              {/* Safety Notice */}
              <div className="mt-4 flex justify-center text-sm text-gray-500">
                <p>Your safety is our priority!</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Tracking Order and Delivery Address */}
        <div className="w-full lg:w-1/3 space-y-6 mt-6 lg:mt-0">
          {/* Delivery Address Card */}
          <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delivery Address</h3>
            <div className="space-y-4">
              <p className="text-lg font-semibold">{address.name}</p>
              <p className="text-gray-700">{address.phoneNumber}</p>
              <p className="text-gray-700">{address.Address}</p>
              <p className="text-gray-700">{address.city}, {address.state} </p>
              <button
                className="text-blue-900 font-semibold hover:underline"
                onClick={() => navigate("/update")}
              >
                Edit Address
              </button>
            </div>
          </div>

          {/* Tracking Order */}
          <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Track Your Order</h3>
            <Tracking />
          </div>
        </div>
      </div>
    </div>
  );
}
