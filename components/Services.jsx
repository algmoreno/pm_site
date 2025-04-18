"use client";
import { forwardRef, SVGProps, useState, useEffect } from "react"
import { AnimatePresence, motion, } from "motion/react"
import { SectionWrapper } from '@/hoc/index'
import { fadeIn, textVariant, slideIn  } from '@/lib/motion.js';
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import "@/styles/globals.css"

const Services = () => {
  const items = [
    {
      class: "bg-yoga-therapy",
      name: "Yoga Therapy",
      description: "Yoga therapy is a mind-body practice that focuses on your physical, emotional and mental health. The practice uses movement, mindfulness, meditation, relaxation and breathing exercises to help you relax, relieve stress and manage underlying conditions or symptoms in addition to treatment by a healthcare provider.",
      image: "/assets/wellness.jpg"
    },
    {
      class: "bg-yoga",
      name: "Yoga",
      description: "Yoga is a holistic practice that combines physical postures (asanas), breath control (pranayama), and meditation (dhyana) to connect the body, mind, and spirit. It aims to create a sense of balance and well-being by harmonizing these aspects. Yoga is often described as a union, or yoking together, of these three elements. ",
      image: "/assets/yoga1.jpg"
    }
  ]

  return (
    // Configuration 1
    // <div id="services" className={``}>
    //   <div className="bg-yoga-therapy flex w-full h-[850px] justify-center relative align-middle ">
    //     <div className={`bg-yoga-therapy-div`}>
    //       <div className={`bg-yoga-therapy-header-div `}>
    //         <h1 className={`bg-yoga-therapy-h1 `}>Yoga Therapy</h1>
    //       </div>
    //       <span className={`bg-yoga-therapy-span `}>
    //         <p>Yoga therapy is a mind-body practice that focuses on your physical, emotional and mental health. The practice uses movement, mindfulness, 
    //           meditation, relaxation and breathing exercises to help you relax, 
    //           relieve stress and manage underlying conditions or symptoms in addition to treatment by a healthcare provider.
    //         </p>
    //       </span>
    //     </div>
    //   </div>
    //   <div className="bg-yoga flex w-full h-[850px] justify-center relative align-middle ">
    //     <div className={`bg-yoga-div `}>
    //       <div className={`bg-yoga-header-div `}>
    //         <h1 className={`bg-yoga-h1 `}>Yoga</h1>
    //       </div>
    //       <span className={`bg-yoga-span `}>
    //         <p>Yoga is a holistic practice that combines physical postures (asanas), breath control (pranayama), and meditation (dhyana) to 
    //           connect the body, mind, and spirit. It aims to create a sense of balance and well-being by harmonizing these aspects. Yoga is often described as a union, 
    //           or yoking together, of these three elements.
    //         </p>
    //       </span>
    //     </div>
    //   </div>
    // </div>
    // Configuration 2
    <div id="services" className={`grid grid-cols-2 p-5 gap-2`}>
      <div className="flex w-[900px] rounded-[10px] justify-center bg-2">
        <div className={`flex justify-center relative`}>
          <h1 className={`my-auto font-light services-header`}>Services</h1>
        </div>
      </div>

      <div className={`bg-yoga-therapy-div border-1 border-blue-200`}>
        <div className={`bg-yoga-therapy-header-div `}>
          <h1 className={`bg-yoga-therapy-h1`}>Yoga Therapy</h1>
        </div>
        <span className={`bg-yoga-therapy-span backdrop-blur-md font-light`}>
          <p>Yoga therapy is a mind-body practice that focuses on your physical, emotional and mental health. The practice uses movement, mindfulness, 
            meditation, relaxation and breathing exercises to help you relax, 
            relieve stress and manage underlying conditions or symptoms in addition to treatment by a healthcare provider.
          </p>
        </span>
      </div>

      <div className={`bg-yoga-div border-1 border-blue-200`}>
        <span className={`bg-yoga-span backdrop-blur-md font-light`}>
          <p>Yoga is a holistic practice that combines physical postures (asanas), breath control (pranayama), and meditation (dhyana) to 
            connect the body, mind, and spirit. It aims to create a sense of balance and well-being by harmonizing these aspects. Yoga is often described as a union, 
            or yoking together, of these three elements.
          </p>
        </span>
        <div className={`bg-yoga-header-div ml-auto mt-auto`}>
          <h1 className={`bg-yoga-h1 `}>Yoga</h1>
        </div>
      </div>

      <div className="flex w-[900px] rounded-[10px] justify-center ">
        <div className="flex justify-center items-center">
          
          <h1 className="my-auto font-bold"> 
            Ready to try? <br />
            <HiOutlineCalendarDateRange size={50} />
            <a href="/login" className="font-light hover:text-blue-500 underline decoration-1">Log in and book a session.</a>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Services