import React from 'react'
import { useRef, useEffect } from "react";
import slide1 from "../../images/slide1.webp";
import slide2 from "../../images/slide2.webp";
import slide3 from "../../images/slide3.webp";
const cards = [slide1, slide3, slide2];
export default function Slider() {
    const carouselRef = useRef(null);

    useEffect(() => {
      const interval = setInterval(() => {
        if (carouselRef.current) {
          const { scrollLeft, scrollWidth, offsetWidth } = carouselRef.current;
          if (scrollLeft + offsetWidth >= scrollWidth) {
            carouselRef.current.scrollTo({
              left: 0,
              behavior: "smooth",
            });
          } else {
            carouselRef.current.scrollBy({
              left: offsetWidth,
              behavior: "smooth",
            });
          }
        }
      }, 3000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className=" flex flex-col items-center justify-center mt-0">
        <div className=" max-w-8xl w-full">
          <div
            ref={carouselRef}
            className="flex overflow-x-hidden snap-x snap-mandatory no-scrollbar"
          >
            {cards.map((data, index) => {
              return (
                <section
                  className="flex-shrink-0 w-full snap-center justify-center items-center"
                  key={index}
                >
                  <img
                    src={data}
                    alt={`Image ${index + 1}`}
                    className="w-full object-cover" // Added object-cover for better scaling
                  />
                </section>
              );
            })}
          </div>
        </div>
      </div>
    );
}
