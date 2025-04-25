"use client";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import "@/styles/globals.css"

const Services = () => {
  const serviceDiv = "w-full flex flex-col md:flex-row justify-center rounded-[10px] border border-blue-200";
  const serviceSpan = "md:w-1/2 w-full justify-center rounded-[10px] text-right text-[24px] font-light p-3 backdrop-blur-lg";
  const serviceHeaderDiv = "flex-wrap md:text-[104px] text-[60px] md:w-1/2 p-2";

  return (
    <div id="services" className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="flex w-full rounded-[10px] justify-center">
        <div className={`flex justify-center relative`}>
          <h1 className={`services-header my-auto font-light lg:text-[140px] text-[80px]`}>Services</h1>
        </div>
      </div>

      <div className={`yoga-therapy-service-div ${serviceDiv}`}>
        <div className={`${serviceHeaderDiv} md:border-r`}>
          <h1 className="yoga-therapy-service-h1">Yoga Therapy</h1>
        </div>
        <span className={`${serviceSpan} text-white`}>
          <p>
            Yoga therapy is a mind-body practice that focuses on your physical, emotional and mental health. The practice uses movement, mindfulness, 
            meditation, relaxation and breathing exercises to help you relax, 
            relieve stress and manage underlying conditions or symptoms in addition to treatment by a healthcare provider.
          </p>
        </span>
      </div>

      <div className={`yoga-service-div ${serviceDiv}`}>
        <span className={`${serviceSpan} text-black`}>
          <p>Yoga is a holistic practice that combines physical postures (asanas), breath control (pranayama), and meditation (dhyana) to 
            connect the body, mind, and spirit. It aims to create a sense of balance and well-being by harmonizing these aspects. Yoga is often described as a union, 
            or yoking together, of these three elements.
          </p>
        </span>
        <div className={`${serviceHeaderDiv} md:border-l text-right `}>
          <h1 className={`yoga-service-h1`}>Yoga</h1>
        </div>
      </div>

      <div className="flex w-full rounded-[10px] justify-center">
        <div className="flex justify-center items-center">
          <h1 className="my-auto font-bold"> 
            Ready to try? <br />
            <HiOutlineCalendarDateRange size={50} />
            <a href="/schedule" className="font-light hover:text-blue-500 underline decoration-1">Schedule now.</a>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Services