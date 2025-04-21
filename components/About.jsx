"use client";
import React, { useRef, useEffect } from 'react'
import * as motion from "motion/react-client"
import "@/styles/globals.css";

const About = () => {
  return (
    <div id="about" className="flex min-h-[700px] justify-items-center w-auto">
      <div className="m-auto flex">
        <div className="flex-wrap w-[50%]">
          <img className="w-[50%] m-auto rounded-md border-l border-black" src="/assets/wellness.jpg" alt="yoga pose" />
        </div>
        <div className="flex-wrap m-auto w-[50%]">
          <p className="w-[500px]">
            Lorem ipsum dolor sit amet 
            consectetur adipisicing elit. Iusto quia beatae quos, ipsam soluta iure! Perferendis, impedit, 
            numquam id ullam dolores odio voluptas dolore architecto magni quo debitis laboriosam nostrum?
            Lorem ipsum dolor sit amet 
            consectetur adipisicing elit. Iusto quia beatae quos, ipsam soluta iure! Perferendis, impedit, 
            numquam id ullam dolores odio voluptas dolore architecto magni quo debitis laboriosam nostrum?
          </p>
        </div>
        </div>
    </div>
  )
}

export default About