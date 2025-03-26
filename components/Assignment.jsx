"use client"
import React, { useState, useCallback } from 'react'
import {useDropzone} from 'react-dropzone'
import { PlusIcon } from '@heroicons/react/20/solid'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Assignment = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user.id
  const isAdmin = session?.user.role === "admin";
  const [showAdd, setShowAdd] = useState(false)

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const handleSubmit = async () => {
    fetch('https://defovu6u7yq96.cloudfront.net/pm_yoga/index.html', {
      method: 'GET', 
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'YOUR_TOKEN'
      }
    })
    .then(response => console.log(response.text()))
    .catch(error => console.error('Error:', error));
  }

  const AddAssignmentDivider = () => {
    return (
      <div className="relative mb-10">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-green-300 px-2 text-gray-500 rounded-full hover:bg-green-400 hover:cursor-pointer">
            <PlusIcon onClick={() => setShowAdd(true)} aria-hidden="true" className="size-5 text-gray-500" />
          </span>
        </div>
      </div>
    )
  }

  const FileInput = () => {
    return (
      <div {...getRootProps()} className="border-2 border-dashed border-gray-500">
        <input {...getInputProps()} className="border-2 border-black bg-blue-50 h-20 w-20"/>
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
      </div>
    )
  }

  const handleFileChange = (event) => {
    console.log(event.target.files);
  };

  const handleUpload = () => {
    console.log("handleUpload");
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        console.log('File name:', file.name);
        console.log('File size:', file.size);
        console.log('File type:', file.type);

        // Perform further operations with the file, e.g., read content or upload
      }
    }
  };

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

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5">
                  Files
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                      <div className="mt-4 flex text-sm/6 text-gray-600">
                        <label
                          onClick={handleUpload}
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 
                            focus-within:outline-hidden hover:text-green-500">
                          <span>Upload a file</span>
                          <input onChange={handleFileChange} id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
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