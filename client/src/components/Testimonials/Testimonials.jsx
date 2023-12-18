import React from 'react';
import { Pagination, Navigation, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './testimonials.css'; // Import your CSS file

const TestimonialsSection = () => {
  const testimonials = [
    {
      author: 'John, Village Resident',
      role: 'Patient',
      comment: 'Living in the village, I struggled to access healthcare. This platform has been a lifesaver. I can now connect with healthcare professionals easily and get the help I need.',
    },
    {
      author: 'Dr. Smith',
      role: 'Doctor',
      comment: 'As a health worker, I can now serve in rural areas from anywhere, this platform has transformed the way we provide care. We can reach villagers more efficiently, address their concerns, and improve overall health outcomes.',
    },
    {
      author: 'Alice, Volunteer',
      role: 'Medical Student',
      comment: "Volunteering in rural communities through this platform has been an eye-opening experience. It's incredible to see the impact of connecting health professionals with villagers who need support.",
    },
    {
      author: 'Emily, Deity South Resident',
      role: 'Patient',
      comment: "I never thought accessing healthcare in our village could be this easy. Thanks to this platform, we now have timely consultations, and it has made a significant difference in our community.",
    },
  ];

  return (
    <section className="testimonials-section">
      <h2>What Users Say</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        modules={[Pagination, Navigation, Scrollbar, A11y]}
        pagination={{ clickable: true }}
        className="swiper-container"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="testimonial">
              <div className="author-info">
                <p className="author">{testimonial.author}</p>
                <p className="role">{testimonial.role}</p>
              </div>
              <p>{testimonial.comment}</p>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
    </section>
  );
};

export default TestimonialsSection;
