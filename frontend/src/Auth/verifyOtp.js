import React, { useEffect, useState } from 'react';
import { useLoginOtpDataMutation } from '../Service/loginSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function VerifyOtp() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0); 
  const [verifyApi] = useLoginOtpDataMutation();
  const navigate = useNavigate();
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < otp.length - 1) {
        setFocusedIndex(index + 1); 
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);

      if (index > 0) {
        setFocusedIndex(index - 1); 
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');

    if (/^[0-9]{4}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      setFocusedIndex(3); 
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let Json = { otp: otp.join('') };
    try {
        let res = await verifyApi(Json).unwrap();
        
      toast.success(res.msg);
      if (res.token) {
        sessionStorage.setItem('token', res.token);
    }
      setTimeout(() => {
       navigate("/")
      }, 2000);
    } catch (error) {
 
      toast.error(error.data);
    }
  }

  useEffect(() => {
   
    document.getElementById(`otp-input-${focusedIndex}`).focus();
  }, [focusedIndex]); 

  return (
    <div className="max-w-md mx-auto text-center bg-gray-200 border-2 border-gray-300 mt-20 px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
        <p className="text-[15px] text-slate-500">
          Enter the 6-digit verification code that was sent to your Email.
        </p>
      </header>
      <form onSubmit={handleSubmit} id="otp-form">
        <div className="flex items-center justify-center gap-3">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-input-${index}`} 
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border-2 border-gray-300 hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxLength="1"
              value={value}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
            />
          ))}
        </div>
        <div className="max-w-[260px] mx-auto mt-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-blue-950  border-2 border-blue-950 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
          >
            Verify Account
          </button>
          <Toaster />
        </div>
      </form>
      <div className="text-sm text-slate-500 mt-4">
        Didn't receive code?{' '}
        <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">
          Resend
        </a>
      </div>
    </div>
  );
}
