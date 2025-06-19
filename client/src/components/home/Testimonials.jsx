import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HiStar } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("/api/testimonials");
      setTestimonials(response.data.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      // Fallback to default testimonials if API fails
      setTestimonials(getDefaultTestimonials());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultTestimonials = () => [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Bride",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      content:
        "The team captured our wedding day perfectly! Every photo tells a story, and we couldn't be happier with the results.",
      rating: 5,
      event: "Wedding Photography",
    },
    {
      id: 2,
      name: "Michael Smith",
      role: "Anniversary Client",
      imageUrl:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80",
      content:
        "They captured our 25th anniversary celebration beautifully. The candid moments, the emotions, everything was perfect. We now have memories to cherish forever.",
      rating: 5,
      event: "Anniversary Shoot",
    },
  ];

  if (loading) {
    return (
      <section className="py-20 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-800 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-800 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-black overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Client <span className="text-primary-400">Testimonials</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear what our clients have to say
            about their experience
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        {testimonials.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-gray-600",
                bulletActiveClass:
                  "swiper-pagination-bullet-active !bg-primary-500",
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="!pb-12"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="bg-dark-200/50 backdrop-blur-sm rounded-2xl p-8 h-full border border-gray-800 hover:border-gray-700 transition-colors">
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <HiStar
                          key={i}
                          className="w-5 h-5 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-gray-300 mb-6 italic">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      {testimonial.imageUrl ? (
                        <img
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-400 to-purple-400 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {testimonial.name[0]}
                          </span>
                        </div>
                      )}
                      <div>
                        <h4 className="text-white font-medium">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {testimonial.role}
                        </p>
                        {testimonial.event && (
                          <p className="text-primary-400 text-xs mt-1">
                            {testimonial.event}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No testimonials yet.</p>
          </div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-800"
        >
          {[
            { number: "98%", label: "Client Satisfaction" },
            { number: "500+", label: "Events Covered" },
            { number: "50+", label: "5-Star Reviews" },
            { number: "24hr", label: "Avg. Response Time" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
