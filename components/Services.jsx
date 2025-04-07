import React from 'react'
import Image from 'next/image'

const Services = () => {
  return (
    <div id="services" className="min-h-[850px] w-auto justify-items-center">
      {/* <div className="">
        <h1 className="text-[38px]">
          Services
        </h1>
      </div> */}

      <div className="mx-auto w-auto flex">
        <img className="m-auto w-[60%]" src="/assets/yoga1.jpg" alt="yoga pose" />
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
        <img className="ml-auto w-[60%]" src="/assets/wellness.jpg" alt="yoga pose" />
      </div>
    </div>
  )
}

export default Services