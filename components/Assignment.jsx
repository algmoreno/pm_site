import React from 'react'

const Assignment = () => {
  return (
    <div className="w-[80%] h-auto mx-auto mt-[100px] max-sm:mt-[35%] mb-20 flex flex-wrap rounded-md bg-slate-200 border p-10">
      <h1 className="text-[24px] font-semibold text-slate-600">3/24/2025 - This week's assignment</h1>
      <p className="m-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Nihil laboriosam impedit repellat magnam commodi sint nisi? Magnam aperiam veritatis laborum vero suscipit, 
        error deserunt harum unde tempora obcaecati. Aspernatur, tempore!
      </p>
      <iframe 
        className="mx-auto"
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/bjxTIcuzB6k?si=MTBBI4_nZYxdKqtW" 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen>  
      </iframe>
    </div>
  )
}

export default Assignment