"use client";
import { useState, forwardRef } from 'react';
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { MdKeyboardArrowRight } from "react-icons/md";
import { motion, AnimatePresence, usePresenceData } from "motion/react";
import "@/styles/globals.css"

const YtSlide = forwardRef(function Slide({ content, color }, ref) {
  const direction = usePresenceData()
  return (
    <motion.div
      className="text-center xl:my-auto max-xl:mb-8"
      ref={ref}
      initial={{ opacity: 0, x: direction * 25 }}
      animate={{
          opacity: 1,
          x: 0,
          transition: {
              delay: 0,
              type: "spring",
              visualDuration: 2,
              bounce: 0,
          },
      }}
      exit={{ opacity: 0.1, x: direction * -25, transition: { visualDuration: 4 } }}>
      {content}
    </motion.div >
  )
})

const YogaSlide = forwardRef(function Slide({ content, color }, ref) {
  const direction = usePresenceData()
  return (
    <motion.div
      className="text-center xl:my-auto max-xl:mb-8"
      ref={ref}
      initial={{ opacity: 0, x: direction * 25 }}
      animate={{
          opacity: 1,
          x: 0,
          transition: {
              delay: 0,
              type: "spring",
              visualDuration: 2,
              bounce: 0,
          },
      }}
      exit={{ opacity: 0.1, x: direction * -25, transition: { visualDuration: 4 } }}>
      {content}
    </motion.div >
  )
})

const YogaTherapyCard = () => {
  const serviceDiv = "w-full min-h-[400px] flex flex-col md:flex-row justify-center rounded-[10px] border border-blue-200";
  const serviceSpan = "flex md:w-1/2 w-full justify-center rounded-[10px] text-right text-[20px] font-light p-3 backdrop-blur-lg backdrop-brightness-[90%]";
  const serviceHeaderDiv = "flex-wrap xl:text-[500%] md:text-[250%] text-[60px] md:w-1/2 p-2";

  const ytSlides = ["Yoga therapy is a mind-body practice that focuses on your physical, emotional and mental health. The practice uses movement, mindfulness, meditation, relaxation and breathing exercises to help you relax, relieve stress and manage underlying conditions or symptoms in addition to treatment by a healthcare provider.", 
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita sequi fugit consequatur aliquam suscipit voluptatibus eum cumque vel quisquam quia, dolores illo ducimus dolorem consectetur distinctio cum optio et sit!"]
  const [iterateYogaTherapyIndex, setIterateYogaTherapyIndex] = useState(0)
  const [selectedYogaTherapyItem, setSelectedYogaTherapyItem] = useState(ytSlides[0])

  const nextYtSlide = () => {
    setIterateYogaTherapyIndex(prev => prev + 1)
    const nextItem = ytSlides[iterateYogaTherapyIndex % ytSlides.length]
    setSelectedYogaTherapyItem(nextItem)
  }

  return (
    <div className={`yoga-therapy-service-div ${serviceDiv}`}>
      <span className={`${serviceSpan} text-white justify-center relative `}>
        <AnimatePresence
            custom={1}
            initial={false}
            mode="wait">
            <YtSlide key={selectedYogaTherapyItem} content={selectedYogaTherapyItem} color="white"/>
        </AnimatePresence>
        <div onClick={nextYtSlide} className="absolute bottom-0 left-1/2 -translate-x-1/2 p-2 bg-black opacity-15 rounded-full hover:opacity-30 h-8 w-8 flex items-center justify-center mb-2">
          <MdKeyboardArrowRight size={20} className='text-white' />
        </div>
      </span>
      <div className={`${serviceHeaderDiv} md:border-r text-center my-auto`}>
        <h1 className="yoga-therapy-service-h1 opacity-90 ">Yoga Therapy</h1>
      </div>
    </div>
  )
}

const YogaCard = () => {
  const serviceDiv = "w-full min-h-[400px] flex flex-col md:flex-row justify-center rounded-[10px] border border-blue-200";
  const serviceSpan = "flex md:w-1/2 w-full justify-center rounded-[10px] text-right text-[20px] font-light p-3 backdrop-blur-lg backdrop-brightness-[120%]";
  const serviceHeaderDiv = "flex-wrap xl:text-[104px] text-[60px] md:w-1/2 p-2";

  const yogaSlides = ["Yoga is a holistic practice that combines physical postures (asanas), breath control (pranayama), and meditation (dhyana) to connect the body, mind, and spirit. It aims to create a sense of balance and well-being by harmonizing these aspects. Yoga is often described as a union, or yoking together, of these three elements.", 
                      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita sequi fugit consequatur aliquam suscipit voluptatibus eum cumque vel quisquam quia, dolores illo ducimus dolorem consectetur distinctio cum optio et sit!"];
  const [iterateYogaIndex, setIterateYogaIndex] = useState(0)
  const [selectedYogaItem, setSelectedYogaItem] = useState(yogaSlides[0])

  const nextYogaSlide = () => {
    setIterateYogaIndex(prev => prev + 1)
    const nextItem = yogaSlides[iterateYogaIndex % yogaSlides.length]
    setSelectedYogaItem(nextItem)
  }

  return (
    <div className={`yoga-service-div ${serviceDiv}`}>
      <div className={`${serviceHeaderDiv} md:border-l text-center my-auto`}>
        <h1 className={`yoga-service-h1 opacity-90`}>Yoga</h1>
      </div>
      <span className={`${serviceSpan} text-black relative`}>
        <AnimatePresence
          custom={1}
          initial={false}
          mode="popLayout">
          <YogaSlide key={selectedYogaItem} content={selectedYogaItem} color="white"/>
        </AnimatePresence>
        <div onClick={nextYogaSlide} className="absolute bottom-0 left-1/2 -translate-x-1/2 p-2 bg-black opacity-15 rounded-full hover:opacity-30 h-8 w-8 flex items-center justify-center mb-2">
          <MdKeyboardArrowRight size={20} className='text-white' />
        </div>
      </span>
    </div>
  )
}

const Services = () => {
  return (
    <div id="services" className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="flex w-full rounded-[10px] justify-center bg-8">
        <div className="flex justify-center relative">
          <h1 className={`services-header my-auto font-light lg:text-[140px] text-[80px]`}>Services</h1>
        </div>
      </div>
      
      <YogaTherapyCard />
      <YogaCard />

      <div className="flex w-full rounded-[10px] justify-center">
        <div className="flex justify-center items-center">
          <h1 className="my-auto font-bold"> 
            Ready to try? <br />
            <HiOutlineCalendarDateRange size={50} className="m-auto"/>
            <a href="/schedule" className="font-light hover:text-blue-500 underline decoration-1">Schedule now.</a>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Services

