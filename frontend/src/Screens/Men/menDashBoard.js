import { getSubcategory } from '../../Service/subcategorySlice';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function MenDashBoard() {
  const dispatch = useDispatch();
  const [callouts, setCallouts] = useState([]);
  const [name, setName] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCallouts = async () => {
      try {
        const calloutData = await dispatch(getSubcategory()).unwrap();
        const filteredCallouts = calloutData.filter((v) => v.categoryid === "67023d42c5c08cdb31f22142");

        if (filteredCallouts.length > 0) {
          setCallouts(filteredCallouts);
          setName(filteredCallouts.map((v) => v.subcategoryname)); 
        }
      } catch (error) {
        console.error('Failed to fetch subcategories:', error);
      }
    };

    fetchCallouts();
  }, [dispatch]);

  const handleCardClick = (subcategoryId) => {
    console.log(subcategoryId,"hhddh")
    navigate(`/sareedetail/${subcategoryId}`); // Passing subcategoryId as a route parameter
  };

  return (
    <div className="px-1 py-1 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20  bg-gradient-to-r from-blue-100 to-gray-300 ">
      <div className="grid gap-10 mx-auto lg:max-w-screen-lg sm:grid-cols-1 lg:grid-cols-4">
        {callouts.map((callout, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center justify-between p-6 bg-white border rounded-3xl shadow-lg hover:shadow-2xl transform transition duration-500 hover:scale-105"
            style={{ height: '350px', width: '250px' }} 
            onClick={() => handleCardClick(callout._id)}
          >
            <div className="flex items-center justify-center h-48 w-full mb-4">
              <img
                className="object-contain w-full h-full rounded-md"
                src={`http://localhost:4000/images/${callout.file}`} 
                alt={callout.subcategoryname || 'Subcategory Image'} 
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-gray-900 hover:text-indigo-950 transition duration-300">{callout.subcategoryname}</p> {/* Enhanced font and hover color */}
              <p className="text-sm text-gray-500 mt-1">{callout.position}</p> {/* Assuming `position` is a valid key */}
              <button className="mt-4 px-4 py-2 bg-indigo-950 text-white rounded-full shadow-md hover:bg-indigo-600 transition duration-300">
                View More
              </button> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
