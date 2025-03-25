"use client"
import React from 'react'

const Assignment = () => {

  const handleSubmit = async () => {
    fetch('https://defovu6u7yq96.cloudfront.net/pm_yoga/index.html', {
      method: 'GET', 
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_TOKEN'
      }
    })
    .then(response => console.log(response.text()))
    .catch(error => console.error('Error:', error));
  }

  return (
    <div className="block w-[80%] h-auto mx-auto mt-[100px] max-sm:mt-[35%] mb-20 flex-wrap rounded-md bg-slate-200 border p-10">
      <button onClick={handleSubmit}>Click</button>
      {/* <div className="border-b border-gray-300">
        <h1 className="text-[24px] font-semibold text-slate-600">Assignments</h1>
      </div>
      <div className="mt-10">
        <h2 className="text-[20px] font-semibold text-slate-600">3/24/2025 - This week's assignment</h2>
        <p className="m-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Nihil laboriosam impedit repellat magnam commodi sint nisi? Magnam aperiam veritatis laborum vero suscipit, 
          error deserunt harum unde tempora obcaecati. Aspernatur, tempore!
        </p>
        <iframe 
          className="mx-auto w-[700px] h-[400px] max-sm:w-[100%]"
          src="https://www.youtube.com/embed/bjxTIcuzB6k?si=MTBBI4_nZYxdKqtW" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen>  
        </iframe>
      </div> */}
    </div>
  )
}

export default Assignment