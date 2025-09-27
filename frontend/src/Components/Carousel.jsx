// // Carousel.jsx
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import { Link } from "react-router-dom";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// const Carousel = () => {
//     return (
      
//         <div className="pt-0.5">
//             <div className="w-full max-w-5xl mx-auto bg-white">
//       <Swiper
//         spaceBetween={30}
//         centeredSlides={true}
//         autoplay={{
//           delay: 2200, // 3 seconds
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         navigation={true}
//         modules={[Autoplay, Pagination]}
//         className="rounded-2xl shadow-lg"
//       >
//             {/* Slides */}
//             <SwiperSlide className="hover:cursor-pointer">
//               <Link to={"/jpg-to-pdf"}>
                
//                   <img
//                     src="./Images-to-pdf.png"
//                     alt="Slide 1"
//                     className="w-full h-90 rounded-2xl"
//                                 />
               
//               </Link>
//             </SwiperSlide>
        
            
//             <SwiperSlide>
//               <Link to={"/pdf-to-jpg"}>
//                <img
//                   src="./PDF-to_Images.png"
//                   alt="Slide 2"
//                   className="w-full h-90 rounded-2xl"
//                 />
//               </Link>
         
//             </SwiperSlide>
//         {/* <SwiperSlide>
//           <img
//             src="https://source.unsplash.com/random/800x400/?city"
//             alt="Slide 3"
//             className="w-full h-80 object-cover rounded-2xl"
//           />
//               </SwiperSlide> */}
             
//       </Swiper>
//     </div>
//     </div>
    
//   );
// };

// export default Carousel;


import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Carousel = () => {
  return (
    <div className="pt-2">
      <div className="w-full max-w-full sm:max-w-4xl md:max-w-5xl mx-auto">
        <Swiper
          spaceBetween={20}
          centeredSlides={true}
          autoplay={{
            delay: 2200,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination]}
          className="rounded-2xl shadow-lg"
        >
          <SwiperSlide className="hover:cursor-pointer">
            <Link to={"/jpg-to-pdf"}>
              <img
                src="./Images-to-pdf.png"
                alt="Slide 1"
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-2xl"
              />
            </Link>
          </SwiperSlide>

          <SwiperSlide className="hover:cursor-pointer">
            <Link to={"/pdf-to-jpg"}>
              <img
                src="./PDF-to_Images.png"
                alt="Slide 2"
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-2xl"
              />
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
