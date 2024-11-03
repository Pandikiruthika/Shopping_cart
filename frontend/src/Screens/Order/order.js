import { useState, useEffect } from 'react';
import Tracking from './orderTrack';
import { useLazyGetOrderDataQuery, useDeleteOrderDataMutation, useLazyGetOrderIdDataQuery, useUpdateOrderDataMutation } from '../../Service/orderSlice';
import { useLazyGetUserDataQuery } from "../../Service/loginSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
export default function Order() {
  const { id } = useParams();
  const [getOrderById] = useLazyGetOrderIdDataQuery();
  const [confirmOrderApi] = useUpdateOrderDataMutation();
  const [getAddressApi] = useLazyGetUserDataQuery();
  const [deleteCartApi] = useDeleteOrderDataMutation();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState([]);
  const [qty, setQty] = useState(1);
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      getUser(decoded.emailid);
    }
  }, [token]);

  useEffect(() => {
    fetchOrderById(id);
  }, [id]);

  const getUser = async (emailId) => {
    try {
      const res = await getAddressApi(emailId).unwrap();
      setAddress(res);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setError("Failed to fetch user data.");
    }
  };

  const fetchOrderById = async (orderId) => {
    setLoading(true);
    try {
      const res = await getOrderById(orderId).unwrap();
      setProductDetails(res);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch order details by ID:', error);
      setError("Failed to fetch order details.");
      setLoading(false);
    }
  };

  const updateOrderById = async (orderId) => {
    try {
      const json = { orderid: orderId };
      const res = await confirmOrderApi(json).unwrap(); 
      toast.success(res);
    
      setTimeout(() => {
        navigate(`/review/${productDetails[0].productDetails[0].productid}`)
      }, 5000);
         
    } catch (error) {
      setError(error.data); 
      toast.error(error.data);
    }
  };

  return (
    <div className="relative z-10 min-h-screen bg-gradient-to-r from-indigo-100 to-gray-300 w-full overflow-x-hidden py-8">
      <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto p-4 lg:p-6 space-y-6 lg:space-y-0">
        {/* Left Side - Cart Content */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-xl p-6 lg:p-8 border border-gray-200 space-y-4 transition transform hover:scale-105 duration-200">
          <h2 className="text-3xl font-bold text-gray-900">Product Details</h2>
          <div className="mt-4">
            <ul role="list" className="-my-6 divide-y divide-gray-300">
              {productDetails.map((item) => (
                <li key={item?._id} className="flex py-6 hover:bg-gray-50 transition duration-200 rounded-lg">
                  <div className="h-32 w-32 mt-8 flex-shrink-0 overflow-hidden rounded-lg border border-gray-300 shadow-md">
                    <img
                      alt="Product"
                      src={`http://localhost:4000/images/${item?.productDetails[0]?.image[0]?.filename}`}
                      className="h-full w-full object-cover object-center transition-transform duration-300 transform hover:scale-110"
                    />
                  </div>
                  <div className="ml-6 flex flex-1 flex-col">
                    <div className="border-b-2 border-gray-300 mt-0 pt-4 space-y-2">
                      <p className="text-md text-gray-600 font-bold mt-2">
                        Estimated Delivery by: <span className='text-md text-gray-600 font-normal'>{new Date(item.estimatedate).toISOString().split('T')[0] + `(${item.day})`}</span>
                      </p>
                    </div>
                    <div className="flex justify-between text-lg font-medium text-gray-900">
                      <h3 className="hover:text-indigo-600 transition duration-200">
                        {item.productDescription}
                      </h3>
                      <p className="ml-4 mt-3 text-xl font-bold">₹{item.productDetails[0].totalamount}</p>
                    </div>
                    <div>
                      <div className="flex items-center mt-2">
                        <i className="fas fa-box text-blue-500 mr-2"></i>
                        <p className="text-lg text-black font-bold">{item.productDetails[0]?.typeofProduct}</p>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-sort-numeric-up text-green-500 mr-2"></i>
                        <p className="text-sm text-black font-semibold">Qty: <span className="text-gray-700">{qty}</span></p>
                      </div>
                      {item.productDetails[0]?.productDescription === "Saree" ? null : (
                        <div className="flex items-center">
                          <i className="fas fa-ruler text-purple-500 mr-2"></i>
                          <p className="text-sm text-black font-semibold">Size: <span className="text-gray-700">{item.productDetails[0]?.size}</span></p>
                        </div>
                      )}
                      <div className="flex items-center">
                        <i className="fas fa-store text-orange-500"></i>
                        <p className="text-sm text-black font-semibold">Sold By: <span className="text-gray-700">{item.productDetails[0]?.vendorname}</span></p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="ml-6 flex flex-1 flex-col">
            <div className="border-t-2 border-gray-300 mt-0 pt-4 space-y-2">
              <p className="text-md text-gray-600 font-bold mt-2">Payment Method: <span className='text-md font-normal text-black'>Cash on Delivery Only</span></p>
            </div>
            <div className="mt-6">
              <button
                className="flex w-full items-center justify-center rounded-lg bg-blue-950 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-blue-800 transition duration-200 transform hover:scale-105"
                onClick={() => updateOrderById(id)} // Corrected this line
              >
              Place the Order
              </button>
              <Toaster />
            </div>
          </div>
        </div>

        {/* Right Side - Tracking Order and Delivery Address */}
        <div className="space-y-6">
          {/* Delivery Address Card */}
          <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delivery Address</h3>
            <div className="space-y-4">
              <p className="text-lg font-semibold">{address.name}</p>
              <p className="text-gray-700">{address.phoneNumber}</p>
              <p className="text-gray-700">{address.Address}</p>
              <p className="text-gray-700">{address.city}, {address.state}</p>
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
