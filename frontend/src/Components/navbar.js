import { useState,useEffect } from "react";
import cart from "../images/cart.jpg";
import { CgProfile } from "react-icons/cg";
import { GrCart } from "react-icons/gr";
import {useLazyGetUserDataQuery} from "../Service/loginSlice"
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
export default function NavBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
const [getUserApi]=useLazyGetUserDataQuery()
const [user,setUser]=useState([])
  
  const token = sessionStorage.getItem('token');
  
 
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/';
  };
  useEffect(() => {
    if(token){
      const decoded = jwtDecode(token);
      getUser(decoded.emailid)  
    }
  }, [token]);

  async function getUser(id) {
    try {
      const res = await getUserApi(id).unwrap();
      setUser(res);
  
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  }

  return (
    <div className="px-1 py-1 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-8 lg:px-6 bg-blue-950">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          <a
            href="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center mr-8"
          >
            <img src={cart} alt="Company Logo" className="w-11 rounded-full" />
            <span className="ml-2 text-md font-bold tracking-wide text-gray-50 uppercase">
              Shopping Cart
            </span>
          </a>
          {/* Menu for Larger Screens */}
          <ul className="flex items-center hidden space-x-4 lg:flex">
            <li>
              <a
                href="/women"
                aria-label="Women"
                title="Women"
                className="font-medium tracking-wide text-gray-200 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Women
              </a>
            </li>
            <li>
              <a
                href="/men"
                aria-label="Men"
                title="Men"
                className="font-medium tracking-wide text-gray-200 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Men
              </a>
            </li>
            <li>
              <a
                href="/kids"
                aria-label="Kids"
                title="Kids"
                className="font-medium tracking-wide text-gray-200 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Kids
              </a>
            </li>
            {/* <li>
              <a
                href="/electronics"
                aria-label="Electronics"
                title="Electronics"
                className="font-medium tracking-wide text-gray-200 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Electronics
              </a>
            </li> */}
          </ul>
        </div>

        {/* Profile and Cart Icons */}
        <ul className="flex items-center space-x-4 hidden lg:flex mr-20">
          {token ? (
            <>
              <li>
                <button
                  aria-label="Profile"
                  title="Profile"
                  className="font-medium tracking-wide text-gray-200 transition-colors duration-200 hover:text-deep-purple-accent-400"
                  onClick={() => setIsProfileOpen(true)}
                >
                  <CgProfile className="text-2xl" />
                </button>
              </li>
              <li>
                <a
                  href="/addcart"
                  aria-label="View Cart"
                  title="View Cart"
                  className="font-medium tracking-wide text-gray-200 transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  <GrCart className="text-2xl" />
                </a>
              </li>
            </>
          ) : (
            <>
              {/* <li>
                <button
                  aria-label="Sign in"
                  title="Sign in"
                  className="font-medium tracking-wide text-gray-200 transition-colors duration-200 hover:text-deep-purple-accent-400"
                  // onClick={() => setIsSignInOpen(true)}
                 
                >
                  <CgProfile className="text-2xl" />
                </button>
              </li> */}
              <li>
                <a
                  href="/login"
                  aria-label="Sign in"
                  title="Sign in"
                  className="font-medium tracking-wide text-gray-200 transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                 <CgProfile className="text-2xl" />
                </a>
              </li>
              
              <li>
                <a
                  href="/addcart"
                  aria-label="View Cart"
                  title="View Cart"
                  className="font-medium tracking-wide text-gray-200 transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  <GrCart className="text-2xl" />
                </a>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full bg-white shadow-md">
              <div className="p-4 border rounded">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <a
                      href="/"
                      aria-label="Company"
                      title="Company"
                      className="inline-flex items-center"
                    >
                      <img src={cart} alt="Company Logo" className="w-11" />
                      <span className="ml-2 text-md font-bold tracking-wide text-gray-50 uppercase">
                        Shopping Cart
                      </span>
                    </a>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="/women"
                        aria-label="Women"
                        title="Women"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Women
                      </a>
                    </li>
                    <li>
                      <a
                        href="/men"
                        aria-label="Men"
                        title="Men"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Men
                      </a>
                    </li>
                    <li>
                      <a
                        href="/kids"
                        aria-label="Kids"
                        title="Kids"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Kids
                      </a>
                    </li>
                    {/* <li>
                      <a
                        href="/electronics"
                        aria-label="Electronics"
                        title="Electronics"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Electronics
                      </a>
                    </li> */}
                    {token ? (
                      <>
                        <li>
                          <button
                            aria-label="Profile"
                            title="Profile"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            onClick={() => setIsProfileOpen(true)}
                          >
                            Profile
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            aria-label="Logout"
                            title="Logout"
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <button
                            aria-label="Sign in"
                            title="Sign in"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                             onClick={() => setIsSignInOpen(true)}
                            
                          >
                            Sign in
                          </button>
                        </li>
                        <li>
                          <a
                            href="/signup"
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                            aria-label="Sign up"
                            title="Sign up"
                          >
                            Sign up
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Details Dialog Box */}
      {isProfileOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out">
    <div className="bg-white p-8 rounded-xl shadow-2xl transform scale-95 transition-all duration-300 ease-in-out">
      <div className="flex justify-end">
        <button
          aria-label="Close Menu"
          title="Close Menu"
          className="p-2 text-gray-600 transition-colors duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          onClick={() => setIsProfileOpen(false)}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3
                c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3
                c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
            />
          </svg>
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Profile Details</h2>
      <p className="text-lg text-center text-gray-600 mb-8">{user.name?`Welcome ${user.name}`:"Welcome User"}</p>

      {/* Flex container for the buttons */}
      <div className="flex justify-around space-x-4">
        <button
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout"
          className="w-1/2 h-12 px-6 font-medium tracking-wide text-white transition duration-300 transform bg-gradient-to-r from-blue-950 to-blue-600 rounded-lg shadow-md hover:scale-105 hover:from-purple-700 hover:to-purple-500 focus:shadow-outline focus:outline-none"
        >
          Logout
        </button>
        {/* <button
          // onClick={handleUpdate}
          aria-label="Update"
          title="Update"
          className="w-1/2 h-12 px-6 font-medium tracking-wide text-white transition duration-300 transform bg-gradient-to-r from-blue-950 to-blue-600 rounded-lg shadow-md hover:scale-105 hover:from-blue-600 hover:to-blue-500 focus:shadow-outline focus:outline-none"
       onClick={navigate("/update")}
       >
          Update
        </button> */}
        {/* <button
  onClick={() => {
    // setIsProfileOpen(false)
    navigate("/update");     
  }}
  aria-label="Update"
  title="Update"
  className="w-1/2 h-12 px-6 font-medium tracking-wide text-white transition duration-300 transform bg-gradient-to-r from-blue-950 to-blue-600 rounded-lg shadow-md hover:scale-105 hover:from-blue-600 hover:to-blue-500 focus:shadow-outline focus:outline-none"
>
  Update
</button> */}

      </div>
    </div>
  </div>
)}




       {/* Sign-In Dialog Box */}
      {/* {isSignInOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Sign In</h2>
            <p className="mb-4">Please enter your credentials to sign in.</p>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                aria-label="Sign in"
                title="Sign in"
              >
                Sign In
              </button>
            </form>
            <button
              onClick={() => setIsSignInOpen(false)}
              className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none mt-4"
              aria-label="Close Sign-In"
              title="Close Sign-In"
            >
              Close
            </button>
          </div>
        </div>
      )}  */}
    </div>
  );
}
