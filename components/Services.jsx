"use client";
import React from 'react'
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/hoc/index'
import { fadeIn, textVariant, slideIn  } from '@/lib/motion.js';
import "@/styles/globals.css"

const Services = () => {
  const services= [
    ["Yoga", "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error voluptate animi eius sint, ad minus libero nisi ex mollitia voluptatibus illo, dolorem, iusto ea ratione dicta voluptatum ullam culpa quo! ", "/assets/yoga1.jpg"],
    ["Yoga Therapy", "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error voluptate animi eius sint, ad minus libero nisi ex mollitia voluptatibus illo, dolorem, iusto ea ratione dicta voluptatum ullam culpa quo!", "/assets/wellness.jpg"],
  ]

  const container = {
    margin: "100px auto",
    maxWidth: 500,
    paddingBottom: 100,
    width: "100%",
  }

  const cardContainer = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: 20,
    marginBottom: -120,
  }

  const splash = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
  }

  const card = {
    fontSize: 16,
    width: 1800,
    height: 830,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transformOrigin: "10% 60%",
  }

  const cardVariants = {
    offscreen: {
        y: 0,
        transition: {
          type: "spring",
          bounce: 0,
          duration: 2.8,
      },
    },
    onscreen: {
        y: 900,
        rotate: 0,
        transition: {
            type: "spring",
            bounce: 0,
            duration: 2.8,
        },
    },
  }

  function Card({ name, description, image}) {

    return (
        <motion.div
            style={cardContainer}
            initial="onscreen"
            whileInView="offscreen"
            viewport={{ amount: .7 }}>
            {/* <div style={{ ...splash,  }} /> */}
            <motion.div style={card} variants={cardVariants} className="card">
            <div className="mx-auto w-auto flex">
              <img className="m-auto w-[70%]" src={image} alt="service image" />
              <div className="justify-items-center align-middle my-auto">
                <h1 className="text-[16px] font-light">{name}</h1>
                <div>
                  <p className="p-20">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            </motion.div>
        </motion.div>
    )
  }

  return (
    <div id="services" className="min-h-[850px] w-auto justify-items-center ">

      {/* <motion.div variants={fadeIn("right", "spring", 0, 3)}>
      <div className="mx-auto w-auto flex">
        <img className="m-auto w-[60%] border-r border-black" src="/assets/yoga1.jpg" alt="yoga pose" />
        <div className="justify-items-center align-middle my-auto">
          <h1 className="text-[24px] font-light">Yoga</h1>
          <div>
            <p className="p-20">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Reiciendis reprehenderit consectetur est, facere exercitationem maiores magni perspiciatis quaerat, voluptas at quae dicta, odit natus in quod sed et ratione neque!
            </p>
          </div>
        </div>
      </div>
      </motion.div>

      <motion.div variants={fadeIn("left", "spring", 2, 3)}>
      <div className="mx-auto w-auto flex gap-4">
        <div className="justify-items-center align-middle my-auto">
            <h1 className="text-[24px] font-light">Yoga Therapy</h1>
            <div>
              <p className="p-20">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Reiciendis reprehenderit consectetur est, facere exercitationem maiores magni perspiciatis quaerat, voluptas at quae dicta, odit natus in quod sed et ratione neque!
              </p>
            </div>
          </div>
          <img className="ml-auto w-[60%] border-l border-black" src="/assets/wellness.jpg" alt="yoga pose" />

        </div>
      </motion.div> */}
      {services.map(([name, description, image], i) => (
        <Card name={name} description={description} image={image} key={i}/>
    ))}
    </div>
  )
}

export default Services
// export default SectionWrapper(Services, "services")