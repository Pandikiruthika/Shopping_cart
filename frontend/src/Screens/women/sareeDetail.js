import React, { useState, useEffect } from 'react';
import { useLazyGetProductDataQuery } from "../../Service/productSlice";
import { useParams } from 'react-router-dom';
import Footer from "../DashBoard/footer";
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa'; // For loading spinner

const categories = ['All', 'Georgette', 'Litchi Silk', 'Cotton'];
const colors = ['All', 'Black', 'Blue', 'Brown', 'Red', 'Violet', 'Purple', 'Green'];
const sizes = ['All', 'S', 'M', 'L', 'XL', 'One Size', 'Free Size'];

export default function SareeDetail() {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getProductApi] = useLazyGetProductDataQuery();
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(id);
  }, [id]);

  async function getProduct(id) {
    setLoading(true); // Start loading
    try {
      const data = await getProductApi(id).unwrap();
      setProduct(data);
    } catch (error) {
      console.error('Failed to fetch product data:', error);
    } finally {
      setLoading(false); // End loading
    }
  }

  const filteredProducts = product.filter((prod) => {
    return (
      (selectedCategory === 'All' || prod.productdetails[0].typeofproduct === selectedCategory) &&
      (selectedColor === 'All' || prod.colour === selectedColor) &&
      (selectedSize === 'All' || prod.size === selectedSize) &&
      (prod.price >= minPrice && prod.price <= maxPrice)
    );
  });

  const handleCardClick = (Id) => {
    navigate(`/product/${Id}`);
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:flex lg:gap-8">
        <aside className="w-full lg:w-1/4  top-0 border-2  border-gray-300 bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Filters</h2>
          
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900">Category</h3>
            <div className="mt-2 space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    id={`category-${category}`}
                    name="category"
                    type="radio"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="h-4 w-4 text-blue-950 border-gray-300 focus:ring-blue-950"
                  />
                  <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-700 font-semibold">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900">Color</h3>
            <div className="mt-2 space-y-2">
              {colors.map((color) => (
                <div key={color} className="flex items-center">
                  <input
                    id={`color-${color}`}
                    name="color"
                    type="radio"
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                    className="h-4 w-4 text-blue-950 border-gray-300 focus:ring-blue-950"
                  />
                  <label htmlFor={`color-${color}`} className="ml-3 text-sm text-gray-700 font-semibold">
                    {color}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900">Size</h3>
            <div className="mt-2 space-y-2">
              {sizes.map((size) => (
                <div key={size} className="flex items-center">
                  <input
                    id={`size-${size}`}
                    name="size"
                    type="radio"
                    value={size}
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                    className="h-4 w-4 text-blue-950 border-gray-300 focus:ring-blue-950"
                  />
                  <label htmlFor={`size-${size}`} className="ml-3 text-sm text-gray-700 font-semibold">
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900">Price Range</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <label htmlFor="minPrice" className="mr-2 text-sm text-gray-700 font-semibold">
                  Min Price:
                </label>
                <input
                  id="minPrice"
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="h-8 border border-gray-300 rounded-lg p-2 w-24"
                />
              </div>
              <div className="flex items-center mt-2">
                <label htmlFor="maxPrice" className="mr-2 text-sm text-gray-700 font-semibold">
                  Max Price:
                </label>
                <input
                  id="maxPrice"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="h-8 border border-gray-300 rounded-lg p-2 w-24"
                />
              </div>
            </div>
          </div>
        </aside>

        <div className="w-full lg:w-3/4">
          {/* Show loading spinner while fetching */}
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <FaSpinner className="animate-spin text-indigo-600 text-4xl" />
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="space-y-4 hover:scale-105 transform transition-transform duration-300 cursor-pointer"
                    onClick={() => handleCardClick(prod._id)}
                  >
                    <div className="group relative  border-2  border-gray-300 rounded-lg bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-90 lg:h-80">
                        <img
                          alt="saree"
                          src={`http://localhost:4000/images/${prod.file[0].filename}`}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="p-4 flex flex-col">
                        <h3 className="text-sm text-gray-700">
                          <a href={prod.href}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {prod.name}
                          </a>
                        </h3>
                        <p className="mt-1 text-lg text-gray-600">{prod.productdetails[0].typeofproduct}</p>
                        <p className="mt-2 text-lg font-bold text-gray-900">₹ {prod.price}</p>
                        <p className="mt-1 text-sm font-bold text-green-700">
                          {prod.extraCharges === 0 ? 'Free Delivery' : `₹${prod.extraCharges} Delivery Charge`}
                        </p>
                        <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
                          {prod.isNew ? 'New' : 'Best Seller'}
                        </span>
                        {/* Add a CTA button */}
                        <button
                          className="mt-3 px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-indigo-500 transition-colors duration-300"
                          onClick={() => handleCardClick(prod._id)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No products found</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
