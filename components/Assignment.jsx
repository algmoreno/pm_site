"use client"
import axios from "axios";
import React, { useState, useCallback, useEffect } from 'react'
import {useDropzone} from 'react-dropzone'
import { PlusIcon } from '@heroicons/react/20/solid'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CiSquareRemove, CiFileOn  } from "react-icons/ci";
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Assignment = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user.id
  const isAdmin = session?.user.role === "admin";
  const [showAdd, setShowAdd] = useState(false);
  const [files, setFiles] = useState([]);
  const [assignment, setAssignment] = useState({
    userId: userId,
    title: '',
    notes: '',
    fileNames: [],
  });

  // POST assignment to db
  // const handleSubmit = async () => {
  //   fetch('https://defovu6u7yq96.cloudfront.net/pm_yoga/index.html', {
  //     method: 'POST', 
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'YOUR_TOKEN'
  //     }
  //   })
  //   .then(response => console.log(response.text()))
  //   .catch(error => console.error('Error:', error));
  // }

  const uploadFiles = async () => {
    event.preventDefault();
    try {
      const uploadPromises = files.map(async (file) => {
        const { data } = await axios.get(`/api/auth/s3/`, {
          params: { fileName: file.name, fileType: file.type, userId: userId },
        });
        const uploadUrl = data.uploadUrl;
        const uploadResponse = await axios.put(uploadUrl, file, {
          headers: { "Content-Type": file.type },
        });
      });
  
      await Promise.all(uploadPromises);
      console.log("All files uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };



  const AddAssignmentDivider = () => {
    return (
      <div className="relative mb-10">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-green-300 p-[2px] text-gray-500 rounded-full hover:bg-green-400 hover:cursor-pointer">
            <PlusIcon onClick={() => setShowAdd(true)} aria-hidden="true" className="size-5 text-gray-500" />
          </span>
        </div>
      </div>
    )
  }

  const handleFileChange = (event) => {
    let fileLength = event.target.files.length
    if (event.target.files && fileLength > 0) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(event.target.files)]);
    }
  };

  const removeFile = (removeIndex) => {
    let filesArray = files;
    let newArray = filesArray.filter((_, index) => index !== removeIndex)
    setFiles(prev => newArray)
  }

  const NewAssignmentForm = () => {
    return (
      <form className="p-5">
        <div className="space-y-12 sm:space-y-16 ">
          <div>
            <h2 className="text-base/7 font-semibold text-gray-900">New Assignment</h2>

            <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5">
                  Title
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 
                                outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:max-w-md">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Title"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5">
                  Notes
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    placeholder=". . . "
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:max-w-2xl sm:text-sm/6"
                    defaultValue={''}
                  />
                </div>
              </div>

              <div className="flex sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5">
                  Files
                </label>
                <div className="flex gap-2 mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex w-[200px] justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                      <div className="mt-4 flex text-sm/6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-mdfont-semibold text-green-600 focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 
                            focus-within:outline-hidden hover:text-green-500">
                          <span>Upload a file</span>
                          <input multiple onChange={handleFileChange} id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                      </div>
                    </div>
                  </div>
                  {files.length > 0 && (
                    files.map((file, index) => (
                    <div key={index} className="relative w-[200px] justify-center rounded-lg border border-gray-600 bg-gray-400 px-6 py-10">
                      <div className="text-center">
                        <CiFileOn aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                        <div className="block mt-4 text-sm/6 text-gray-600">
                          <p className="mx-auto text-gray-700 text-sm text-center truncate">
                            {file.name}
                          </p>
                          <CiSquareRemove onClick={(e) => removeFile(index)} size={25} className="absolute top-0 right-0 text-red-800 hover:text-red-600"/>
                        </div>
                      </div>
                    </div>
                    ))
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button onClick={() => setShowAdd(false)} type="button" className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
          <button
            onClick={uploadFiles}
            type="submit"
            className="inline-flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 
                      focus-visible:outline-offset-2 focus-visible:outline-green-600">
            Save
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="block w-[80%] h-auto mx-auto mt-[100px] max-sm:mt-[35%] mb-20 flex-wrap rounded-md bg-slate-200  p-10">
      {isAdmin && <AddAssignmentDivider />}
      {showAdd && 
        <NewAssignmentForm />
      }
      <h1 className="text-[24px] border-b border-gray-300">Assignments</h1>
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