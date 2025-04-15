"use client";
import { forwardRef, SVGProps, useState } from "react"
import { AnimatePresence, motion, usePresenceData, wrap } from "motion/react"
import { SectionWrapper } from '@/hoc/index'
import { fadeIn, textVariant, slideIn  } from '@/lib/motion.js';
import "@/styles/globals.css"

const Services = () => {
  // const items = [
  //   ["Yoga", "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error voluptate animi eius sint, ad minus libero nisi ex mollitia voluptatibus illo, dolorem, iusto ea ratione dicta voluptatum ullam culpa quo! ", "/assets/yoga1.jpg"],
  //   ["Yoga Therapy", "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error voluptate animi eius sint, ad minus libero nisi ex mollitia voluptatibus illo, dolorem, iusto ea ratione dicta voluptatum ullam culpa quo!", "/assets/wellness.jpg"]
  // ]
  
  // const items = [
  //   {
  //     name: "Yoga Therapy",
  //     description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos molestias, voluptatibus reprehenderit quam ipsam dolores magni. Quis numquam rerum, sunt, esse placeat laudantium nobis aperiam minima expedita ex quos aut.",
  //     image: "/assets/wellness.jpg"
  //   },
  //   {
  //     name: "Yoga",
  //     description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos molestias, voluptatibus reprehenderit quam ipsam dolores magni. Quis numquam rerum, sunt, esse placeat laudantium nobis aperiam minima expedita ex quos aut.",
  //     image: "/assets/yoga1.jpg"
  //   }
  // ]

  const items = [["blag", "blah", "black"], ["blag", "blah", "black"]]
  const [iterateIndex, setIterateIndex] = useState(0)
  const [selectedItem, setSelectedItem] = useState(items[0])
  const [direction, setDirection] = useState(1)

  function setSlide(newDirection) {
    setIterateIndex(prev => prev + 1)
    console.log("newDirection", newDirection)
    const nextItem = items[iterateIndex % items.length]
    console.log("nextItem", nextItem)
    setSelectedItem(nextItem)
    setDirection(newDirection)
  }

  const color = "white"

  return (
    <div className="flex relative justify-center align-middle gap-10" >
      <motion.button
        className="flex justify-center align-middle relative z-1 bg-black w-20 h-20"
        initial={false}
        animate={{ backgroundColor: "blue" }}
        aria-label="Previous"
        onClick={() => setSlide(-1)}
        whileFocus={{ outline: `2px solid black` }}
        whileTap={{ scale: 0.9 }}>
          <ArrowLeft />
      </motion.button>
      <AnimatePresence
          custom={1}
          initial={false}
          mode="popLayout">
          <Slide key={selectedItem} service={selectedItem} color={color} />
      </AnimatePresence>
      <motion.button
        className="flex justify-center align-middle relative z-1 bg-black w-20 h-20"
        initial={false}
        animate={{ backgroundColor: "blue" }}
        aria-label="Next"
        onClick={() => setSlide(1)}
        whileFocus={{ outline: `2px solid black` }}
        whileTap={{ scale: 0.9 }}>
          <ArrowRight />
      </motion.button>
    </div>

    // <div id="services" className="min-h-[850px] w-auto justify-items-center ">
      
    //   <motion.div exit={{ opacity: 0 }}>
    //   <div className="mx-auto w-auto flex">
    //     <img className="m-auto w-[60%] border-r border-black" src="/assets/yoga1.jpg" alt="yoga pose" />
    //     <div className="justify-items-center align-middle my-auto">
    //       <h1 className="text-[24px] font-light">Yoga</h1>
    //       <div>
            
    //         <motion.p exit={{ y: 10 }} className="p-20">
    //           Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
    //           Reiciendis reprehenderit consectetur est, facere exercitationem maiores magni perspiciatis quaerat, voluptas at quae dicta, odit natus in quod sed et ratione neque!
    //         </motion.p>
    //       </div>
    //     </div>
    //   </div>
    //   </motion.div>

    //   <motion.div variants={fadeIn("left", "spring", 2, 3)}>
    //   <div className="mx-auto w-auto flex gap-4">
    //     <div className="justify-items-center align-middle my-auto">
    //         <h1 className="text-[24px] font-light">Yoga Therapy</h1>
    //         <div>
    //           <p className="p-20">
    //             Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
    //             Reiciendis reprehenderit consectetur est, facere exercitationem maiores magni perspiciatis quaerat, voluptas at quae dicta, odit natus in quod sed et ratione neque!
    //           </p>
    //         </div>
    //       </div>
    //       <img className="ml-auto w-[60%] border-l border-black" src="/assets/wellness.jpg" alt="yoga pose" />

    //     </div>
    //   </motion.div>
    // </div>
  )
}

const Slide = forwardRef(function Slide({ color }, ref) {
  const direction = usePresenceData()
  return (
    <motion.div
      className="w-full h-[800px] border-2 border-slate-400"
      ref={ref}
      initial={{ opacity: 0, x: direction * 50 }}
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
      exit={{ opacity: 0.1, x: direction * -50, transition: { visualDuration: 4 } }}>
      Text here
    </motion.div >
  )
})

const iconsProps= {
  xmlns: "http://www.w3.org/2000/svg",
  width: "500",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
}

function ArrowLeft() {
    return (
        <svg {...iconsProps}>
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
        </svg>
    )
}

function ArrowRight() {
    return (
        <svg {...iconsProps}>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}




export default Services
// export default SectionWrapper(Services, "services")