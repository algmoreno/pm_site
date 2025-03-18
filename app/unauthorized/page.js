import React from 'react'
import { PiImageBrokenThin } from "react-icons/pi";

const Unauthorized = () => {
  return (
    <div className="flex flex-wrap m-auto">
      <div className="w-[800px] h-[500px] mx-auto my-[7%] rounded-md flex">
        <div className="m-auto">
          <PiImageBrokenThin size={200} color="red" className="m-auto justify-center"/>
          <h1 className="mx-auto text-center text-[22px]" >
            Unauthorized
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized