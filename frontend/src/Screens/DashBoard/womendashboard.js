import image1 from "../../images/kurtidashboard.jpg";
import image2 from "../../images/sareeDashboard.jpg";
import image3 from "../../images/jeweldashboard.jpg";
import image4 from "../../images/footware.jpg";

export default function Content ()  {
  return (
    <div className="px-1 py-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10 bg-gray-200 ">
      <p className="font-bold text-2xl">Best of Women </p>
      <div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-4 sm:row-gap-6 sm:grid-cols-2 mt-4">
        <a href="/" aria-label="View Item">
          <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
            <img
              className="object-cover w-full h-56 md:h-64 xl:h-80"
              src={image1}
              alt="Best sale"
            />
          </div>
        </a>
        <a href="/" aria-label="View Item">
          <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
            <img
              className="object-cover w-full h-56 md:h-64 xl:h-80"
              src={image2}
              alt="Best sale"
            />
          </div>
        </a>
        <a href="/" aria-label="View Item">
          <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
            <img
              className="object-cover w-full h-56 md:h-64 xl:h-80"
              src={image3}
              alt="best sale"
            />
          </div>
        </a>
        <a href="/" aria-label="View Item">
          <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
            <img
              className="object-cover w-full h-56 md:h-64 xl:h-80"
              src={image4}
              alt="best sale"
            />
          </div>
        </a>
      </div>
      <div className="text-center">
        <a
          href="/women"
          aria-label=""
          className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
        >
          View gallery
          <svg
            className="inline-block w-3 ml-2"
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
          </svg>
        </a>
      </div>
    </div>
  );
};
