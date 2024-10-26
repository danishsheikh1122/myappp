'use client'
import React, { useState, useEffect } from "react";
const images = [
  {
    src : '/assest/y5.jpg',
    title : 'AI-driven diagnostics'
  },
  {
    src : '/assest/y1.jpg',
    title : 'Remote Monitoring'
  },
  {
    src : '/assest/y2.webp',
    title : 'satellite-based deforestation monitoring'
  },
  {
    src : '/assest/y3.jpg',
    title : 'Remote Monitoring'
  },
  {
    src : '/assest/y4.webp',
    title : 'Remote Monitoring'
  },
  {
    src : '/assest/y5.jpg',
    title : 'Remote Monitoring'
  },
];

export const Cards = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center relative">
        <span className="w-full text-center font-bold text-3xl"></span>
        <div className="flex justify-center items-center gap-2 my-10">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-96 w-28 rounded-lg hover:w-96 overflow-hidden transition-all cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image.src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {hoveredIndex === index && (
                <div 
                className="w-full flex justify-center items-center absolute bottom-0 z-20 bg-gray-800 bg-opacity-75 text-white p-2">
                  <span>{image.title}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};