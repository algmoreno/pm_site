"use client";
import React, { useEffect, useState } from 'react';
import '@/styles/globals.css'; 


const Landing = () => {
  const words = ['Hello', 'World', 'React', 'Next.js'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false); // fade out
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setShow(true); // fade in
      }, 500); // match this to fade-out duration
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`word ${show ? 'fade-in' : 'fade-out'} flex w-full h-[700px] max-sm:mt-[25%] text-center `}>
      <div className="m-auto align-middle text-[80px]">
        {words[currentWordIndex]}
      </div>
    </div>
  );
}



export default Landing