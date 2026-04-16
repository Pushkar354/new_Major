import React, { useRef } from "react";
import { motion } from "framer-motion";
import "./featuredvideo.css";

const courses = [
  {
    title: "Machine Learning",
    desc: "Learn ML algorithms",
  },
  {
    title: "Deep Learning",
    desc: "CNN, RNN & Neural Nets",
  },
  {
    title: "AI Basics",
    desc: "Start from scratch",
  },
  {
    title: "Generative AI",
    desc: "Build AI tools",
  },
  {
    title: "NLP",
    desc: "Text & language models",
  },
  
];

export default function AdvancedSlider() {
  const sliderRef = useRef();

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-10 px-6">
      <h2 className="text-2xl font-bold mb-6">
        Featured AI Courses
      </h2>

      <div className="relative">

        
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full hover:bg-gray-200"
        >
          ◀
        </button>

        
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {courses.map((course, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="min-w-[260px] bg-white rounded-2xl shadow-lg p-5 flex-shrink-0 cursor-pointer"
            >
              <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-4"></div>

              <h3 className="text-lg font-semibold mb-2">
                {course.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {course.desc}
              </p>

              <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Enroll Now
              </button>
            </motion.div>
          ))}
        </div>

        
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full hover:bg-gray-200">
          ▶
        </button>
      </div>
    </div>
  );
}