"use client";
import { forwardRef, SVGProps, useState, useEffect } from "react"
import { AnimatePresence, motion, } from "motion/react"
import { SectionWrapper } from '@/hoc/index'
import { fadeIn, textVariant, slideIn  } from '@/lib/motion.js';
import "@/styles/globals.css"

const Services = () => {
  const items = [
    {
      class: "bg-yoga-therapy",
      name: "Yoga Therapy",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos molestias, voluptatibus reprehenderit quam ipsam dolores magni. Quis numquam rerum, sunt, esse placeat laudantium nobis aperiam minima expedita ex quos aut.",
      image: "/assets/wellness.jpg"
    },
    {
      class: "bg-yoga",
      name: "Yoga",
      description: "Yoga is a holistic practice that combines physical postures (asanas), breath control (pranayama), and meditation (dhyana) to connect the body, mind, and spirit. It aims to create a sense of balance and well-being by harmonizing these aspects. Yoga is often described as a union, or yoking together, of these three elements. ",
      image: "/assets/yoga1.jpg"
    }
  ]

  const [iterateIndex, setIterateIndex] = useState(0)
  const [selectedItem, setSelectedItem] = useState(items[0])

  function setSlide() {
    setIterateIndex(prev => prev + 1)
    const nextItem = items[iterateIndex % items.length]
    setSelectedItem(nextItem)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide()
    }, 6000);
    return () => clearInterval(interval);
  })

  const Slide = forwardRef(function Slide({ service }, ref) {
    return (
      <motion.div
        className={`flex w-full h-[700px] `}
        ref={ref}
        initial={{ opacity: 0, x: 25 }}
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
        exit={{ opacity: 0, x: -25, transition: { visualDuration: 2 } }}>
        <div className={`${selectedItem.class}-div relative z-0`}>
          <div className="flex absolute bottom-10 right-0">
            <h1 className={`${selectedItem.class}-h1 `}>{service.name}</h1>
          </div>
          <span className={`${selectedItem.class}-span my-auto w-[400px] justify-center text-center`}>
            <p>{service.description}</p>
          </span>
        </div>
        {/* <img className="flex-wrap ml-auto w-[60%]" src={service.image} alt="yoga pose" /> */}
      </motion.div >
    )
  })

  return (
    <div id="services" className={`flex justify-center relative align-middle gap-10 ${selectedItem.class}`} >
      <button className="bg-red-400 absolute top-0 right-0 z-100" onClick={setSlide}>Next</button>
      <AnimatePresence
          custom={1}
          initial={false}
          mode="popLayout">
          <Slide key={selectedItem.name} service={selectedItem}  />
      </AnimatePresence>
    </div>

  )
}

export default Services