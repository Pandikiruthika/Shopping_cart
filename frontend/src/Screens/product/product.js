import { useState, useEffect } from "react";
import {
  useLazyGetProductByIdDataQuery,
  useLazyGetReviewdDataQuery,
  setProductId
} from "../../Service/productSlice";
import { useCartDataMutation } from "../../Service/addCartSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import {useOrderDataMutation} from "../../Service/orderSlice"
export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [createApiCart] = useCartDataMutation();
  const [createOrderApi]=useOrderDataMutation()
  const navigate =  useNavigate();
  const [data, setData] = useState([]);
  const [file, setFile] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [review, setReview] = useState([]);
  const [getReviewApi] = useLazyGetReviewdDataQuery();
  const [getProductByApi] = useLazyGetProductByIdDataQuery();

  useEffect(() => {
    fetchProduct();
    fetchReview();
  }, [id]);

  async function fetchProduct() {
    try {
      const res = await getProductByApi(id).unwrap();
      setData(res);
      const fileData = res.find((v) => v)?.file;
      setFile(fileData);
      if (fileData && fileData.length > 0) {
        setSelectedImage(`http://localhost:4000/images/${fileData[0].filename}`);
      }
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  }

 

  async function fetchReview() {
    try {
      const res = await getReviewApi(id).unwrap();
      setReview(res);
    } catch (error) {
      console.error("Failed to fetch product reviews:", error);
    }
  }

  const productdetails = data.find((c) => c)?.productdetails.find((a) => a);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };



  async function handleAddToCart(productId) {
    const token = sessionStorage.getItem("token");
    const json = { productid: productId };

    if (!token) {
      toast.success("Please log in before you can add items to your cart");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
     
    } else {
      try {
        await createApiCart(json).unwrap();
        navigate("/addcart");
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    }
  }

  async function handleBuy(productId) {
    const token = sessionStorage.getItem("token");
    const json = { productid: productId };

    if (!token) {
      toast.success("Please log in before you can add items to your cart");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
     
    } else {
      try {
        await createOrderApi(json).unwrap();
        navigate("/order");
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    }
  }


  // async function handleBuy(data) {
  //   const token = sessionStorage.getItem("token");
  //    const json = { productid: productId };

  //   if (!token) {
  //     toast.success("Please log in before you can add items to your cart");
  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 2000);
     
  //   } else {
  //     try {
  //      await createOrderApi(json).unwrap();
        
  //       navigate("/order");
  //     } catch (error) {
  //       console.error("Failed to add to cart:", error);
  //     }
  //   }
  // }


  return (
    <div className="bg-gradient-to-r from-blue-100 to-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="flex flex-row items-start space-x-4">
          <div className="flex flex-col space-y-4">
            {file.length > 0 ? (
              file.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:4000/images/${image.filename}`}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg cursor-pointer transition-transform hover:scale-105 shadow-lg border border-gray-300"
                  onClick={() =>
                    handleImageClick(`http://localhost:4000/images/${image.filename}`)
                  }
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
          <div className="flex-1 flex justify-center">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full max-w-sm h-auto object-cover rounded-lg hover:scale-110 transition-transform duration-500 shadow-lg border border-gray-300"
              />
            ) : (
              <p>No image selected</p>
            )}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {productdetails?.productDescription}
            </h1>
            <div className="mt-4">
              <p className="text-3xl text-gray-900">
                ₹{data[0]?.price} <span className="text-gray-700 text-3xl">Onwards</span>
              </p>
              <p className="mt-2 text-sm text-green-600">
                {data[0]?.extraCharges === 0
                  ? "Free Delivery"
                  : `₹${data[0]?.extraCharges} Delivery Charge`}
              </p>
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-6 e pt-4 shadow-md rounded-lg">
  <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
  <div className="mt-4 space-y-4 text-gray-700">
    <div className="flex">
      <span className="font-medium">Name:</span>
      <span className="text-gray-600">{productdetails?.productDescription}</span>
    </div>
    <div className="flex ">
      <span className="font-medium">Color:</span>
      <span className="text-gray-600">{data[0]?.colour}</span>
    </div>
    <div className="flex ">
      <span className="font-medium">Fabric:</span>
      <span className="text-gray-600">{productdetails?.pattern}</span>
    </div>
    <div className="flex ">
      <span className="font-medium">Net Weight:</span>
      <span className="text-gray-600">{productdetails?.netWeight}</span>
    </div>
    <div className="flex">
      <span className="font-medium">Contact Info:</span>
      <span className="text-gray-600">{productdetails?.packerinfo}</span>
    </div>
    <div className="flex text-md">
      <span className="font-medium ">Supplier Info:</span>
      <span className="text-gray-600">{productdetails?.supplierinfo}</span>
    </div>
  </div>
</div>


          {/* Size Selection */}
          {data[0]?.subcategoryid === "66e1355997e1bef501505ac3" ? null : (
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Select the Size</h3>
              <div className="grid grid-cols-4 gap-4 mt-4">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 font-bold border rounded-lg ${
                      selectedSize === size
                        ? "bg-blue-200"
                        : "bg-white hover:bg-gray-200"
                    } transition-transform duration-300`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              className="mt-6 w-52 bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-gray-400 hover:text-black hover:font-bold transition duration-300"
              onClick={() => handleAddToCart(data[0]._id)}
            >
              Add to bag
            </button>
            <Toaster />
            <button
              type="button"
              className="mt-6 w-52 bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-gray-400 hover:text-black hover:font-bold transition duration-300"
              onClick={() => handleBuy(data)}
            >
              Buy Now
            </button>
          </div>

          {/* Reviews Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Customer Reviews & Rating</h3>
            {review.length > 0 ? (
              review.map((r, index) => (
                <div key={index} className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={`h-5 w-5 ${r.rating > rating ? "text-yellow-500 text-lg" : "text-gray-300"}`}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{r.rating} stars</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 font-medium">{r.review}</p>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                    <p>{r.userName}</p>
                    <p>{new Date(r.createat).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="mt-6 text-sm text-gray-500">No reviews available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
