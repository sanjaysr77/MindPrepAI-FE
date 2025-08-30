import { AICard } from "./AICard";
import { useCardContext } from "./CardContext";
import { SmallCard } from "./SmallCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useState } from "react";
import { Modal } from "../Modal";

export function CardStructure({ title }: { title: string }) {
  const { subjects } = useCardContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  function handleCardClick (title: string) {
    setSelectedSubject(title);
    setModalOpen(true);
  }

  function handleCloseModal () {
    setSelectedSubject('');
    setModalOpen(false);
  }

  function handleStart () {
    setModalOpen(false);
    setSelectedSubject('')
    console.log(`Starting ${selectedSubject}`);
  }

  const getInstructions = (subject: string) => {
    const instructionsMap: Record<string, string> = {
      'DBMS': 'You will be tested on Database Management System concepts including SQL queries, normalization, and database design principles.',
      'OOPS': 'Test your knowledge of Object-Oriented Programming concepts including inheritance, polymorphism, encapsulation, and abstraction.',
      'OS': 'Challenge yourself with Operating System topics like process management, memory management, and file systems.',
      'Networks': 'Explore computer networking concepts including protocols, network architecture, and data transmission.'
    };
    
    return instructionsMap[subject] || `Click Start to begin the quiz commonly asked in ${subject} roles.`;
  };


  return (
    <div className="flex justify-center items-center">
      <div
        className="
        bg-black ring-4 ring-white rounded-lg p-2 mt-12 h-40 w-70 
        sm:w-100 sm:h-50
        md:w-140 
        lg:w-200 lg:h-60 
      "
      >
        <div className="flex items-center justify-center">
          <h2
            className="text-white text-xl font-bold text-center
          lg:text-2xl mb-1"
          >
            {title}
          </h2>
        </div>

        <div className="flex justify-center items-center">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={-30}
            slidesPerView={2}
            centeredSlides={true}
            centerInsufficientSlides={true}
            centeredSlidesBounds={true}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 8, centeredSlides: false },
              1024: { slidesPerView: 4, spaceBetween: 12, centeredSlides: false },
            }}
          >
            {subjects.map((subject, index) => (
              <SwiperSlide key={index}>
                <SmallCard image={subject.image} title={subject.title} onClick = {handleCardClick} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <AICard />
      <Modal
      isOpen = {modalOpen}
      subjectTitle={selectedSubject} 
      onClose={handleCloseModal}
      onStart={handleStart}
      instructions={getInstructions(selectedSubject)}/>
    </div>
  );
}
