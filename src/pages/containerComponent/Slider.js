// import Swiper core and required modules
import { Navigation, Pagination,  A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import slide1 from '../../images/other/slide1.jpg'
import slide2 from '../../images/other/slide2.jpg'
import slide3 from '../../images/other/slide3.jpg'
import slide4 from '../../images/other/slide4.jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/scrollbar'; 

 const Slider =  () => {
    
    SwiperCore.use([Autoplay]);

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination,  A11y, ]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={{clickable: true}}
      pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false
    }}

    className="mt-7 container mx-auto h-52 sm:h-auto relative -z-50 "
    >
      <SwiperSlide  className='relative -z-30'>
        <img src={slide1} className="w-full h-full" alt="slide-1 " />
      </SwiperSlide>
      <SwiperSlide className='relative -z-30'>
      <img src={slide2} className="w-full h-full" alt="slide-2 " />

      </SwiperSlide>
      <SwiperSlide className='relative -z-30'>
      <img src={slide3} className="w-full h-full" alt="slide-3 " />

      </SwiperSlide>
      <SwiperSlide className='relative -z-30'>
      <img src={slide4} className="w-full h-full" alt="slide-4 " />

      </SwiperSlide>
 
    </Swiper>
  );
};


export default Slider