import { FaShoppingCart, FaMapMarkedAlt, FaCreditCard } from 'react-icons/fa';

export default function TrackingOrder() {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
      <div className="flex justify-between max-w-2xl mx-auto items-center">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center bg-blue-950 text-white w-12 h-12 text-lg font-bold border-4 border-blue-300 rounded-full transition-transform transform hover:scale-110 mb-2 shadow-lg">
            1
          </div>
          <FaShoppingCart className="text-blue-950 text-2xl mb-2 transition-transform transform hover:scale-125" />
          <div className="font-semibold">Cart</div>
        </div>

        {/* Connecting line */}
        <div className="w-full h-1 bg-blue-950 mx-2 transition-all duration-500 ease-in-out"></div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center bg-blue-950 text-white w-12 h-12 text-lg font-bold border-4 border-blue-300 rounded-full transition-transform transform hover:scale-110 mb-2 shadow-lg">
            2
          </div>
          <FaMapMarkedAlt className="text-gray-700 text-2xl mb-2 transition-transform transform hover:scale-125" />
          <div className="font-semibold">Address</div>
        </div>

        {/* Connecting line */}
        <div className="w-full h-1 bg-gray-300 mx-2 transition-all duration-500 ease-in-out"></div>

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-12 h-12 text-lg font-bold border-4 border-gray-300 rounded-full transition-transform transform hover:scale-110 mb-2 shadow-lg">
            3
          </div>
          <FaCreditCard className="text-gray-700 text-2xl mb-2 transition-transform transform hover:scale-125" />
          <div className="font-semibold">Payment</div>
        </div>
      </div>
    </div>
  );
}
