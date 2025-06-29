import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ carouselImages, currentSlide, setCurrentSlide, nextSlide, prevSlide }) => {
  return (
    <div className="relative h-96 lg:h-[500px] overflow-hidden">
      {carouselImages.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide ? 'translate-x-0 opacity-100' : 
            index < currentSlide ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
          }`}
        >
          <img src={slide.url} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-6">
              <h2 className="text-4xl lg:text-6xl font-bold mb-4">{slide.title}</h2>
              <p className="text-xl lg:text-2xl opacity-90">{slide.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
      <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full">
        <ChevronLeft className="w-7 h-7 text-white" />
      </button>
      <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full">
        <ChevronRight className="w-7 h-7 text-white" />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
