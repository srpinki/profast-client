import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaQuoteLeft } from 'react-icons/fa';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import "./reviewStyle.css"
import customerTop from "../../assets/customer-top.png"

const reviews = [
  {
    id: 1,
    name: 'Awlad Hossin',
    role: 'Senior Product Designer',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    message: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
  },
  {
    id: 2,
    name: 'Nasir Uddin',
    role: 'CEO',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    message: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
  },
  {
    id: 3,
    name: 'Rasel Ahamed',
    role: 'CTO',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    message: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
  },
  {
    id: 4,
    name: 'John Doe',
    role: 'Software Engineer',
    image: 'https://randomuser.me/api/portraits/men/12.jpg',
    message: 'Great tool for improving posture. It’s really helped with my back pain.',
  },
  {
    id: 5,
    name: 'Jane Smith',
    role: 'Product Manager',
    image: 'https://randomuser.me/api/portraits/women/25.jpg',
    message: 'Love the sleek design and the benefits are amazing!',
  },
  {
    id: 6,
    name: 'Mark Taylor',
    role: 'UX Designer',
    image: 'https://randomuser.me/api/portraits/men/55.jpg',
    message: 'Super comfortable and effective for long workdays.',
  },
  {
    id: 7,
    name: 'Lisa Wong',
    role: 'HR Manager',
    image: 'https://randomuser.me/api/portraits/women/40.jpg',
    message: 'My posture has improved significantly. Highly recommend!',
  },
  {
    id: 8,
    name: 'Ali Khan',
    role: 'Team Lead',
    image: 'https://randomuser.me/api/portraits/men/71.jpg',
    message: 'The best investment for my health and work life.',
  },
  {
    id: 9,
    name: 'Sophia Kim',
    role: 'Consultant',
    image: 'https://randomuser.me/api/portraits/women/66.jpg',
    message: 'Noticed a difference within a week. Amazing product!',
  },
  {
    id: 10,
    name: 'Carlos Diaz',
    role: 'Freelancer',
    image: 'https://randomuser.me/api/portraits/men/85.jpg',
    message: 'It helps me stay upright during long editing sessions.',
  },
];

export default function Reviews() {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto text-center bg-gray-100">
      <div className="mb-8">
        <div className="flex justify-center mb-2">
          {/* <FaQuoteLeft className="text-4xl text-primary" /> */}
          <img src={customerTop} alt="" />
        </div>
        <h2 className="text-3xl font-bold text-neutral">What our customers are sayings</h2>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto mt-2">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{ nextEl: '.next', prevEl: '.prev' }}
        pagination={{ clickable: true, el: '.custom-pagination', bulletClass: 'swiper-pagination-bullet !bg-gray-800 w-2 h-2 rounded-full', bulletActiveClass: '!bg-primary' }}
        breakpoints={{ 768: { slidesPerView: 2.5 } }}
        className="relative"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="transition-all duration-300  scale-95 swiper-slide">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto h-full flex flex-col justify-between border border-gray-200">
              <p className="text-gray-600 text-left mb-4">{review.message}</p>
              <hr className="my-4" />
              <div className="flex items-center gap-4 text-left">
                <img src={review.image} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-neutral">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="prev cursor-pointer bg-lime-400 hover:bg-lime-500 border border-gray-300 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md ">
          <IoChevronBack className="text-base" />
        </div>

        <div className="custom-pagination flex gap-2 items-center justify-center"></div>

        <div className="next cursor-pointer bg-lime-400 hover:bg-lime-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
          <IoChevronForward className="text-base" />
        </div>
      </div>
    </div>
  );
}
