import React from 'react';
import Page404 from '../../images/404 Error-amico.png';


export default function PageNotFound() { 
  return (
    <div>
      <div className="h-[100vh] flex flex-col justify-center items-center">
        <img
          src={Page404}
          draggable="false"
          alt="404 Page Not Found"
          className="h-[85%] sm:h-[50%]"
        />
        <div className="text-center">
          <a
            href={`http://localhost:3000`}
            className="border py-2 px-3 text-h1-text-color transition duration-200 hover:bg-white hover:text-primary hover:border-primary"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
