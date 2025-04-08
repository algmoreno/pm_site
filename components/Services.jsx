"use client";
import React from 'react'
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/hoc/index'
import { fadeIn, textVariant, slideIn  } from '@/lib/motion.js';

const Services = () => {
  return (
    <div id="services" className="min-h-[850px] w-auto justify-items-center">
      {/* <div className="">
        <h1 className="text-[38px]">
          Services
        </h1>
      </div> */}

      <motion.div variants={fadeIn("right", "spring", 0, 3)}>
      <div className="mx-auto w-auto flex ">
        <img className="m-auto w-[60%] border-2 border-black" src="/assets/yoga1.jpg" alt="yoga pose" />
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
          <img className="ml-auto w-[60%] border-2 border-black" src="/assets/wellness.jpg" alt="yoga pose" />
        </div>
      </motion.div>
    </div>
  )
}

//export default Services
export default SectionWrapper(Services, "services")