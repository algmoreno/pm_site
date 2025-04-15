"use client";
import { forwardRef, SVGProps, useState, useEffect } from "react"
import { AnimatePresence, motion, } from "motion/react"
import { SectionWrapper } from '@/hoc/index'
import { fadeIn, textVariant, slideIn  } from '@/lib/motion.js';
import "@/styles/globals.css"

const Services = () => {
  const items = [
    {
      name: "Yoga Therapy",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos molestias, voluptatibus reprehenderit quam ipsam dolores magni. Quis numquam rerum, sunt, esse placeat laudantium nobis aperiam minima expedita ex quos aut.",
      image: "/assets/wellness.jpg"
    },
    {
      name: "Yoga",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos molestias, voluptatibus reprehenderit quam ipsam dolores magni. Quis numquam rerum, sunt, esse placeat laudantium nobis aperiam minima expedita ex quos aut.",
      image: "/assets/yoga1.jpg"
    }
  ]

  const [iterateIndex, setIterateIndex] = useState(0)
  const [selectedItem, setSelectedItem] = useState(items[0])
  const [direction, setDirection] = useState(1)

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

  return (
    <div className="flex relative justify-center align-middle gap-10" >
      <AnimatePresence
          custom={1}
          initial={false}
          mode="popLayout">
          <Slide key={selectedItem.name} service={selectedItem}  />
      </AnimatePresence>
    </div>

  )
}

const Slide = forwardRef(function Slide({ service }, ref) {
  return (
    <motion.div
      className="flex w-full h-[800px]"
      ref={ref}
      initial={{ opacity: 0, x: 5 }}
      animate={{
          opacity: 1,
          x: 0,
          transition: {
              delay: 0,
              type: "spring",
              visualDuration: 3,
              bounce: 0,
          },
      }}
      exit={{ opacity: 0, x: -5, transition: { visualDuration: 4 } }}>
      <div className="flex-wrap">
        <h1>{service.name}</h1>
        <p>{service.description}</p>
      </div>
      <img className="flex-wrap ml-auto w-[60%] border-l border-black" src={service.image} alt="yoga pose" />
    </motion.div >
  )
})




export default Services
// export default SectionWrapper(Services, "services")