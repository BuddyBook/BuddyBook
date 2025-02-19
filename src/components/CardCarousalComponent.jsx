/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function LazyLoad({ list }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div
      className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-lg shadow-xl 
      p-4 sm:p-6 md:p-8 lg:p-10 
      mx-auto 
      w-11/12 max-w-4xl 
      mt-8 sm:mt-12 md:mt-16 lg:mt-20"
    >
      <Slider {...settings} className="focus:outline-none">
        {list.map((item, i) => (
          <div key={i} className="px-4 sm:px-8 md:px-12 lg:px-20">
            <div
              className="bg-white/80 backdrop-blur-sm rounded-xl 
              p-4 sm:p-6 md:p-8 
              transition-all duration-300 
              hover:transform hover:scale-105 hover:shadow-2xl 
              border border-purple-100"
            >
              <h1
                className="text-violet-600 
                text-lg sm:text-xl md:text-2xl 
                font-bold 
                mb-2 sm:mb-3 md:mb-4 
                tracking-wide"
              >
                {item.answer}
              </h1>
              <h1
                className="text-rose-400 
                text-base sm:text-lg 
                font-medium"
              >
                {item.name}
              </h1>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default LazyLoad;
