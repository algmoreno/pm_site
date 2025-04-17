"use client";
import React, { useRef, useEffect } from 'react'
import { EnterAnimation } from '@/hoc/index';
import { useInView, Variants } from 'motion/react'
import * as motion from "motion/react-client"
import "@/styles/globals.css";

const About = () => {
  const food= [
    ["🍅", 340, 10],
    ["🍊", 20, 40],
    ["🍋", 60, 90],
    ["🍐", 80, 120],
    ["🍏", 100, 140],
    ["🫐", 205, 245],
    ["🍆", 260, 290],
    ["🍇", 290, 320],
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
    fontSize: 164,
    width: 300,
    height: 430,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    background: "#f5f5f5",
    boxShadow:
        "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
    transformOrigin: "10% 60%",
  }

  const cardVariants = {
    offscreen: {
        y: 500,
    },
    onscreen: {
        y: 50,
        rotate: 0,
        transition: {
            type: "spring",
            bounce: 0,
            duration: 0.8,
        },
    },
  }

  function Card() {

    return (
        <motion.div
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 1 }}>
            {/* <div style={{ ...splash,  }} /> */}
            <motion.div style={card} variants={cardVariants} className="card">
               hello
            </motion.div>
        </motion.div>
    )
  }


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
    // <div >
    // {food.map((food, index) => (
    //     <Card key={index}/>
    // ))}
    // </div>  
  )



}

export default About