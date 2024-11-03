import image1 from "../../images/dashboard.webp";
import image2 from "../../images/dashboard1.webp";
import image3 from "../../images/dashboard2.webp";

export default function ProductOverview() {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-gray-200">
      <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        <div className="overflow-hidden transition-shadow duration-300 rounded shadow-sm border-2  border-gray-300">
          <a
            href="/men"
            className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
            aria-label="traveling"
            title="traveling"
          >
            <img
              src={image1}
              className="object-cover w-full h-full"
              alt="traveling"
            />
          </a>
        </div>
        <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm border-2 border-gray-300">
          <a
            href="/kids"
            className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
            aria-label="traveling"
            title="traveling"
          >
            <img
              src={image2}
              className="object-cover w-full h-74"
              alt="traveling"
            />
          </a>
        </div>
        <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm border-2  border-gray-300">
          <a
            href="/women"
            className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
            aria-label="traveling"
            title="traveling"
          >
            <img
              src={image3}
              className="object-cover w-full h-74"
              alt="traveling"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
