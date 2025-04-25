"use client";
import React, { useRef, useEffect } from 'react'
import * as motion from "motion/react-client"
import "@/styles/globals.css";

const About = () => {
  return (
    <div id="about" className="flex flex-col md:flex-row min-h-[700px] justify-center items-center w-full p-4">
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img 
          className="w-full max-w-[500px] rounded-md border-l border-black" 
          src="/assets/wellness.jpg" 
          alt="yoga pose" 
        />
      </div>

      <div className="w-full md:w-1/2 flex justify-center p-4">
        <p className="w-full max-w-[500px] text-center md:text-left">
          Lorem ipsum dolor sit amet 
          consectetur adipisicing elit. Iusto quia beatae quos, ipsam soluta iure! Perferendis, impedit, 
          numquam id ullam dolores odio voluptas dolore architecto magni quo debitis laboriosam nostrum?
          Lorem ipsum dolor sit amet 
          consectetur adipisicing elit. Iusto quia beatae quos, ipsam soluta iure! Perferendis, impedit, 
          numquam id ullam dolores odio voluptas dolore architecto magni quo debitis laboriosam nostrum?
        </p>
      </div>
    </div>
  )
}

export default About