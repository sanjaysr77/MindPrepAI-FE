import { AICard } from "./AICard";
import { useCardContext } from "./CardContext";
import { SmallCard } from "./SmallCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export function CardStructure({ title }: { title: string }) {
  const { subjects } = useCardContext();

  return (
    <div className="flex justify-center">
      <div
        className="
        bg-gray-100 border border-black rounded-lg p-2 mt-12 h-40 w-70 
        sm:w-100 sm:h-50
        md:w-140 
        lg:w-200 lg:h-60 lg:ml-20
      "
      >
        <div className="flex items-center justify-center">
          <h2
            className="text-lg font-bold text-center
          lg:text-2xl"
          >
            {title}
          </h2>
        </div>

        {/* 🚀 Carousel for subjects */}
        <div className="flex justify-center items-center">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={4}
            slidesPerView={2}
            centeredSlides={true}
            centeredSlidesBounds={true}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 8, centeredSlides: false },
              1024: { slidesPerView: 4, spaceBetween: 12, centeredSlides: false },
            }}
          >
            {subjects.map((subject, index) => (
              <SwiperSlide key={index}>
                <SmallCard image={subject.image} title={subject.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <AICard />
    </div>
  );
}
