// import { useSelector, useDispatch } from 'react-redux';
import { useVerifyOtpDataMutation } from "../Service/loginSlice";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import image1 from "../images/profile.jpg"

export default function Register() {
  const navigate = useNavigate();
  const [saveUserApi] = useVerifyOtpDataMutation();
  const [emailId, setEmaiId] = useState();

  async function verifyUser(e) {
    e.preventDefault();
    let Json = { emailid: emailId };
    try {
      let res = await saveUserApi(Json).unwrap();
      console.log(res, "ggh");
      toast.success(res);
      setTimeout(() => {
        navigate("/verifyregister");
      }, 2000);
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-300">
      <div className="flex min-h-full max-w-xl flex-1 flex-col justify-center px-6 py-10 lg:px-8 border border-gray-300 rounded-lg shadow-lg bg-white bg-opacity-90 transition-transform transform hover:scale-105">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={image1}
            className="mx-auto h-14 w-auto rounded-full text-gray-900"
          />
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up to your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={verifyUser}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmaiId(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 transition duration-200 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!emailId}
                className="flex w-full justify-center rounded-md bg-gradient-to-r from-blue-600 to-blue-900 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-md hover:bg-blue-700 transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Verify OTP
              </button>
              <Toaster />
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
