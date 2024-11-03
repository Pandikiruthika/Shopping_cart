export default function Footer() {
  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 bg-blue-950">
      <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
        <div className="md:max-w-md lg:col-span-2">
          <a
            href="/"
            aria-label="Go home"
            title="Company"
            className="inline-flex items-center"
          >
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-50 uppercase">
              Shopping Cart
            </span>
          </a>
          <div className="mt-4 lg:max-w-sm">
            <p className="text-sm text-gray-50">
              Discover affordable products across all categories, with the latest in women's fashion, accessories, and much more.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
          <div>
            <p className="font-semibold tracking-wide text-gray-50">Shop</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="/women"
                  className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Women's Fashion
                </a>
              </li>
              <li>
                <a
                  href="/men"
                  className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Men's Fashion
                </a>
              </li>
              <li>
                <a
                  href="/electronics"
                  className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Electronics
                </a>
              </li>
              <li>
                <a
                  href="/accessories"
                  className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-gray-50">
              Customer Care
            </p>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="/shipping"
                  className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/customer-service"
                  className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Customer Service
                </a>
              </li>
              <li>
                <a
                  href="/contact-us"
                  className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-gray-50">About</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/sustainability"
                  className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Sustainability
                </a>
              </li>
             
            </ul>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-gray-50">Legal</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service"
                  className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/cookie-policy"
                  className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="/refund-policy"
                  className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between pt-5 pb-10 border-t sm:flex-row">
        <p className="text-sm text-gray-200">
          © {new Date().getFullYear()} Shopping Cart Inc. All rights reserved.
        </p>
        <div className="flex items-center mt-4 space-x-4 sm:mt-0">
          <a
            href="https://twitter.com"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
              {/* Twitter Icon */}
              <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7..." />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
              {/* Instagram Icon */}
              <circle cx="15" cy="15" r="4" />
              <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10..." />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            <svg viewBox="24 24 24 24" fill="currentColor" className="h-5">
              {/* Facebook Icon */}
              <path d="M22,0H2C0.895,0,0,0.895,0,2v20..." />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
