import React, { useState, useEffect } from "react";
import { useLazyGetOrderDataQuery } from "../../Service/orderSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaShippingFast, FaBoxOpen, FaCheckCircle } from "react-icons/fa";
import { MdReplay, MdCancel } from "react-icons/md";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDeleteOrderDataMutation } from "../../Service/orderSlice";

const OrderDetailCard = () => {
  const [getorderApi] = useLazyGetOrderDataQuery();
  const [deleteorderApi] = useDeleteOrderDataMutation();
  const navigate = useNavigate();
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  const toggleDetails = (orderId) => {
    setActiveOrderId((prevOrderId) => (prevOrderId === orderId ? null : orderId));
  };

  const date = new Date().toLocaleDateString();

  async function fetchOrderDetail() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.success("Please log in before you can see the order");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      try {
        const res = await getorderApi().unwrap();
        setOrderHistory(res);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    }
  }

  async function deleteOrderDetail(orderid) {
    try {
      const json = { orderid };
      const res = await deleteorderApi(json).unwrap();
    } catch (error) {
      console.error("Failed to delete order details:", error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-200  p-6 bg-pattern">
      {orderHistory.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orderHistory.map((order) => (
          <div key={order.id} className="relative bg-white border-2  border-gray-300 rounded-lg shadow-lg w-full mb-5">
            {order.orderstatus !== "Delivered" && order.orderstatus !== "order Cancel" && (
              <button
                type="button"
                onClick={() => deleteOrderDetail(order.orderid)}
                className="absolute top-2 right-2 text-black hover:text-black"
              >
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            )}

            <div className="flex justify-between items-center space-x-4 mt-4 ml-2">
              <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border-2  border-gray-300">
                {order.productDetails?.[0]?.image?.[0]?.filename ? (
                  <img
                    alt="Product"
                    src={`http://localhost:4000/images/${order.productDetails[0].image[0].filename}`}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <p className="text-gray-500">No image available</p>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-700">
                  {order.productDetails?.[0]?.typeofProduct || "Unknown Product"}
                </h3>
                <p className="text-lg font-bold text-green-500">
                  ₹{order.productDetails?.[0]?.totalamount || "N/A"}
                </p>
                <button className="flex-1 flex items-center justify-center text-blue-950 py-2 font-bold transition hover:text-black hover:shadow-lg" onClick={()=>navigate(`/product/${order.productDetails[0].productid}`)}>
                  <MdReplay className="mr-2" />
                  Buy Again
                </button>
              </div>
              <div className="text-right pr-9">
                <p className="text-sm text-gray-500">
                  Ships to{" "}
                  <span className="font-bold text-gray-700">
                    {order.userDetails?.[0]?.name || order.userDetails?.[0]?.emailid || "Unknown User"}
                  </span>
                </p>
                <button
                  onClick={() => toggleDetails(order.id)}
                  className="text-blue-600 text-md font-bold hover:underline hover:text-blue-950 transition"
                >
                  {activeOrderId === order.id ? "Hide Details" : "View Details"}
                </button>
              </div>
            </div>

            {/* Render details only for the active order */}
            {activeOrderId === order.id && (
              <div className="mt-4">
                <div className="w-full bg-white p-2 rounded-lg shadow-md border border-gray-200">
                  <div className="relative">
                    <div className="absolute w-0.5 h-full bg-gray-300 left-6 top-0"></div>

                    {/* Order Placed */}
                    <div className="flex items-center space-x-4">
                      <div className="relative z-10 bg-blue-950 rounded-full w-5 h-5 flex justify-center items-center">
                        <FaCheckCircle className="text-white text-xs" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">Order Placed</p>
                        <p className="text-sm text-gray-500">{date}</p>
                      </div>
                    </div>

                    {order.orderstatus === "order Cancel" ? (
                      <div className="flex items-center space-x-4 mt-4">
                        {/* Order Canceled */}
                        <div className="relative z-10 bg-red-500 rounded-full w-5 h-5 flex justify-center items-center">
                          <MdCancel className="text-white text-xs" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">Order Canceled</p>
                          <p className="text-sm text-gray-500">{date}</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Processing */}
                        <div className="flex items-center space-x-4 mt-4">
                          <div className="relative z-10 bg-blue-950 rounded-full w-5 h-5 flex justify-center items-center">
                            <FaBoxOpen className="text-white text-xs" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">Processing</p>
                            <p className="text-sm text-gray-500">{date}</p>
                          </div>
                        </div>

                        {/* Shipped */}
                        <div className="flex items-center space-x-4 mt-4">
                          <div className="relative z-10 bg-gray-400 rounded-full w-5 h-5 flex justify-center items-center">
                            <FaShippingFast className="text-white text-xs" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">Shipped</p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.estimatedate).toISOString().split("T")[0]} ({order.day})
                            </p>
                          </div>
                        </div>

                        {/* Delivered */}
                        <div className="flex items-center space-x-4 mt-4">
                          <div className="relative z-10 bg-gray-400 rounded-full w-5 h-5 flex justify-center items-center">
                            <FaCheckCircle className="text-white text-xs" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">Delivered</p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.estimatedate).toISOString().split("T")[0]} ({order.day})
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default OrderDetailCard;
