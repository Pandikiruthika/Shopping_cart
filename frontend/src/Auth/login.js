import { useVerifyOtpDataMutation } from "../Service/loginSlice";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import image1 from "../images/profile.jpg"

export default function Login() {
  const navigate = useNavigate();
  const [saveUserApi] = useVerifyOtpDataMutation();
  const [emailId, setEmailId] = useState('');
  const [error, setError] = useState('');

  async function verifyUser(e) {
    e.preventDefault();
    setError('');
    let Json = { emailid: emailId };

    try {
      let res = await saveUserApi(Json).unwrap();
      toast.success(res);
      setTimeout(() => {
        navigate("/verify");
      }, 2000);
    } catch (error) {
      setError(error.data);  // Display the error message in the form
      toast.error(error.data);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="flex min-h-full max-w-xl flex-1 flex-col justify-center px-6 py-10 lg:px-8 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={image1}
            className="mx-auto h-14 rounded-full w-auto text-gray-900"
          />
          <h2 className="mt-2 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={verifyUser}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  required
                  autoComplete="email"
                  className={`block w-full rounded-md border-2 py-2 px-3 text-gray-900 shadow-sm transition duration-150 ease-in-out ${error ? 'border-red-500' : 'border-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 hover:border-indigo-400`}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>} {/* Error message */}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!emailId}
                className="flex w-full justify-center border-2 border-blue-900 rounded-md bg-gradient-to-r from-blue-600 to-blue-900 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gradient-to-l transition duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Verify OTP
              </button>
              <Toaster />
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create an Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
