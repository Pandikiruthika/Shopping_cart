import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate,useParams} from 'react-router-dom';
import { useReviewDataMutation } from "../../Service/reviewSlice";
import toast, { Toaster } from 'react-hot-toast';

export default function Review() {
    const { id } = useParams();
  const [open, setOpen] = useState(true);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [createReviewApi] = useReviewDataMutation();
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  function close() {
    setOpen(false);
    navigate("/");
  }

  const submitRating = async (id) => {
    setLoading(true);
    try {
        const json={productid:id,rating,review}
      const res = await createReviewApi(json).unwrap();
      console.log(res,"res")
      toast.success(res);
      setRating(0);
      setReview('');
      setTimeout(() => {
        close()
      }, 2000);
         

    } catch (error) {
      toast.error(error);
      setError("Failed to submit your review. Please try again.");
    } 
  };

  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity duration-500 ease-in-out"
        />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-lg transform transition duration-500 ease-in-out sm:duration-700"
              >
                <div className="flex h-full flex-col bg-white shadow-xl rounded-lg">
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-xl font-bold  text-gray-900">Leave a Review</DialogTitle>
                      <button
                        type="button"
                        onClick={close}
                        className="ml-3 text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="mt-7 text-gray-700  font-medium text-lg">Your Rating</div>
                    <div className="mt-4 flex justify-center sm:justify-start">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          index={index}
                          rating={rating}
                          setRating={setRating}
                        />
                      ))}
                    </div>

                    <textarea
                      rows="4"
                      placeholder="Write your review here..."
                      className="mt-4 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />

                    {error && <p className="mt-2 text-red-500">{error}</p>}

                    <button
                      onClick={()=>submitRating(id)}
                      
                      className={`mt-4 flex items-center justify-center rounded-md border border-transparent bg-blue-950 px-6 py-3 text-base font-medium text-white shadow-sm 
                      ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'hover:bg-indigo-700'} transition duration-150 w-full`}
                    >
                    Submit
                    </button>
                    <Toaster />
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

// Star Component with improved styles
const Star = ({ index, rating, setRating }) => {
  return (
    <button
      type="button"
      onClick={() => setRating(index + 1)}
      className={`text-4xl cursor-pointer transform transition-transform duration-150 ease-in-out hover:scale-110 
        ${rating >= index + 1 ? 'text-yellow-400 ' : 'text-gray-400'} mx-1 sm:mx-2`}
    >
      ★
    </button>
  );
};
