import { useState, useEffect } from 'react';
import TrackingOrder from './track';
import { useLazyGetcartDataQuery, useDeletecartDataMutation } from '../../Service/addCartSlice';
import cartImage from '../../images/addcart.png';
import { useLazyGetUserDataQuery } from "../../Service/loginSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export default function ShoppingCart() {
  const [getcartApi] = useLazyGetcartDataQuery();
  const navigate = useNavigate();
  const [getAddressApi] = useLazyGetUserDataQuery();
  const [product, setProduct] = useState([]);
  const [deletecartApi] = useDeletecartDataMutation();
  const [qty, setQty] = useState(1);
  const [isRemoved, setIsRemoved] = useState(false);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const token = sessionStorage.getItem('token');
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      getUser(decoded.emailid);
    }
  }, [token]);

  async function getUser(id) {
    try {
      const res = await getAddressApi(id).unwrap();
      setAddress(res);
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  }

  async function fetchCart() {
    try {
      const res = await getcartApi().unwrap();
      setProduct(res);
    } catch (error) {
      console.error('Failed to fetch product data:', error);
    }
  }

  async function handleDelete(itemId) {
    try {
      const json = { id: itemId };
      const res = await deletecartApi(json).unwrap();
      setProduct([]);
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  }

  const cartItems = product.map((item) => item.productDetails).flat();
  const productDetails = product.length > 0 ? product[0].productDetails[0]?.productdetails[0] : null;

  const handleIncreaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const handleDecreaseQty = () => {
    setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
  };

  const totalOrderPrice = cartItems.reduce(
    (total, item) => total + item.price * qty,
    0
  );
  
  const orderTotal = cartItems.reduce(
    (total, item) => total + (item.extraCharges || 0),
    0
  );

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
  };

  return (
    <div className="relative z-10 min-h-screen bg-gradient-to-r from-blue-100 to-gray-300 w-full overflow-x-hidden">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-6 space-x-0 lg:space-x-6">
        {/* Left Side - Cart Content */}
        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900">Shopping Cart</h2>

          <div className="mt-6">
            <div className="flow-root">
              {cartItems.length !== 0 ? (
                <ul role="list" className="-my-6 divide-y divide-gray-300">
                  {cartItems.map((item) => (
                    <li key={item?._id} className="flex py-6 hover:bg-gray-50 transition duration-200">
                      <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border border-gray-300">
                        <img
                          alt="Product"
                          src={`http://localhost:4000/images/${item?.file[0]?.filename}`}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex justify-between text-lg font-medium text-gray-900">
                          <h3>
                            <a href={item.href} className="hover:text-indigo-600 transition duration-200">
                              {productDetails?.productDescription}
                            </a>
                          </h3>
                          <p className="ml-4 text-xl font-semibold">₹{item.price}</p>
                        </div>

                        <div className="flex space-x-2 items-center mt-4">
                          <button
                            onClick={handleDecreaseQty}
                            className="bg-blue-900 text-white px-2 py-1 rounded hover:bg-blue-800 transition duration-200 font-bold text-md"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <p className="text-sm text-gray-500 font-bold">Qty: {qty}</p>
                          <button
                            onClick={handleIncreaseQty}
                            className="bg-blue-900 text-white px-2 py-1 rounded hover:bg-blue-800 transition duration-200"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <button
                            type="button"
                            onClick={() => handleDelete(item._id)}
                            className="font-medium text-red-600 hover:text-red-500 transition duration-200"
                            aria-label="Remove product"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center py-15 mt-10">
                  <img src={cartImage} alt="Empty cart" className="h-40 w-40 mb-4" />
                  <p className="text-gray-500 text-lg font-medium mb-6">Your cart is empty!</p>
                  <a
                    href="/"
                    className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-200"
                  >
                    Continue Shopping
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Price Details */}
          {!isRemoved && product.length > 0 && cartItems.length > 0 && (
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
                onClick={()=>navigate("/update")}
              >
                Edit Address
              </button>
            </div>
          </div>

          {/* Tracking Order */}
          <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Track Your Order</h3>
            <TrackingOrder />
          </div>
        </div>
      </div>
    </div>
  );
}
