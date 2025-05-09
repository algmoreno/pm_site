"use client"
import axios from "axios";
import React, { useState, useRef, useEffect } from 'react'
import { toast } from "sonner";
import { PageLoader } from '@/components/index';
import { PlusIcon } from '@heroicons/react/20/solid'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CiSquareRemove, CiFileOn  } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { format, parseISO, formatISO } from 'date-fns';
import Accordion from 'react-bootstrap/Accordion';

const Assignment = ({ userId }) => {
  const router = useRouter();
  const effectRan = useRef(false);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const isAdmin = session?.user.role === "admin";
  const [user, setUser] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const validTitle = new RegExp('^[^/]+$');
  const [assignments, setAssignments] = useState([]);
  const [assignment, setAssignment] = useState({
    userId: '',
    dateAssigned: '',
    title: '',
    notes: '',
    filePaths: [],
  });

  // pull user assignments from db
  useEffect(() => {
    if (effectRan.current) return; // Prevents second call
    effectRan.current = true;
    axios.get(`/api/auth/users/${userId}`)
      .then(res => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(err => console.error(err));

  }, [userId]);

  // grabbing files for each assignment
  useEffect(() => {
    async function fetchFiles() {
      try {
        const updatedAssignments = await Promise.all(user.assignments.map(async (assignment) => {
          const filesArray = await Promise.all(assignment.filePaths.map(async (filePath) => {
            try {
              const response = await fetch(`https://defovu6u7yq96.cloudfront.net/pm_yoga/users/${user._id}/${filePath}`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
              });
  
              if (!response.ok) throw new Error(`Failed to fetch file: ${filePath}`);
              const contentType = response.headers.get("content-type");
              const blob = await response.blob();
              const url = URL.createObjectURL(blob);
  
              return { url, contentType };
            } catch (error) {
              console.error('Error fetching file:', error);
              return null; 
            }
          }));
  
          return {
            title: assignment.title,
            notes: assignment.notes,
            files: filesArray.filter(file => file !== null) 
          };
        }));
  
        setAssignments(updatedAssignments); 
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    }
  
    if (user) {
      fetchFiles();
    }
  }, [user]);
  
  const uploadAssignment = async (event) => {
    event.preventDefault();
    const validated = validation();
    if (!validated) return;

    const date = formatISO(new Date());
    let formattedTitle = assignment.title.replace(/\s/g, '');
    let formattedDate = format(date, "M-dd-yyyy");
    const titleDate = formattedTitle + "-" + formattedDate;
    const filePaths = createFilePaths(titleDate);

    const newAssignment = {
      title: assignment.title,
      notes: assignment.notes,
      userId: userId,
      dateAssigned: date,
      filePaths: filePaths
    };

    // setting assignment state
    setAssignment({
      ...assignment,
      userId: userId,
      dateAssigned: date,
      filePaths: filePaths
    })

    try {
      // uploading to s3
      const uploadPromises = files.map(async (file) => {
        const { data } = await axios.get(`/api/auth/s3/`, {
          params: { fileName: file.name, fileType: file.type, userId: userId, title: titleDate,},
        });
        const uploadUrl = data.uploadUrl;
        const uploadResponse = await axios.put(uploadUrl, file, {
          headers: { "Content-Type": file.type },
        });
      });
  
      await Promise.all(uploadPromises);
      console.log("All files uploaded successfully!");

      // uploading to db
      const response = await axios.post("/api/auth/assignments/", newAssignment)
      if (response.status == 201){
        toast.success(`Assignment uploaded!`)
      }
      // resetting assignment related state
      setFiles([]);
      setAssignment({
        ...assignment,
        dateAssigned: '',
        title: '',
        notes: '',
        filePaths: [],
      }) 
      setShowAdd(false)
      // repulling assignments 
      axios.get(`/api/auth/users/${userId}`)
      .then(res => {
        setUser(res.data.user);
      })
      .catch(err => console.error(err));
    } catch (error) {
      toast.error(`${error}`)
      console.error("S3 Upload failed:", error);
    }
  };

  const createFilePaths = (titleDate) => {
    const filePaths = []
    files.map(file => {
      let filePath = `${titleDate}/${file.name}`;
      filePaths.push(filePath)
    })
    return filePaths;
  }

  const validation = () => {
    if (!validTitle.test(assignment.title)) {
      setError("Title can't have '/'")
      return false
    }
    return true
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

  const cancelAssignment = () => {
    setError(null)
    setFiles([]);
    setAssignment({
      ...assignment,
      dateAssigned: '',
      title: '',
      notes: '',
      filePaths: [],
    }) 
    setShowAdd(false)
  }

  const AddAssignmentDivider = () => {
    return (
      <div className="relative mb-10">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gray-300 p-[2px] text-gray-500 rounded-full hover:bg-gray-400 hover:cursor-pointer">
            <PlusIcon onClick={() => setShowAdd(true)} aria-hidden="true" className="size-5 text-gray-500" />
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="block w-[80%] max-sm:w-full h-auto mx-auto max-sm:mt-[35%] p-10 max-sm:p-2 mb-20 flex-wrap">
      {isAdmin && <AddAssignmentDivider />}
      {showAdd && 
      <form onSubmit={uploadAssignment} className="p-5 bg-slate-200 mb-10">
        <div className="space-y-12 sm:space-y-16 ">
          <div>
            <h2 className="text-[18px] font-semibold text-gray-900">New Assignment</h2>
            {!!error && (
              <div className="bg-red-500 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-200 my-6">
                <p>
                  {error}
                </p>
              </div>
            )}
            <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5">
                  Title
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 
                                outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:max-w-md">
                    <input
                        type="text"
                        value={assignment.title}
                        onChange={(e) => setAssignment(prev => ({ ...prev, title: e.target.value }))}
                        required
                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-hidden sm:text-sm/6"
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
                    type="text"
                    value={assignment.notes}
                    onChange={(e) => setAssignment(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder=". . . "
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 
                                placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:max-w-2xl sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5">
                  Files
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex w-full sm:w-[200px] justify-center rounded-lg border border-dashed bg-white border-gray-900/25 px-6 py-10">
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
                      <div key={index} className="relative w-full sm:w-[200px] justify-center rounded-lg border border-gray-600 bg-gray-400 px-6 py-10">
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
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button onClick={() => cancelAssignment()} type="button" className="text-sm/6 font-semibold text-gray-900">
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
      }

      {!loading ? (assignments.length > 0 ? (
        <div>
          <h1 className="text-[24px] border-b border-gray-300">Assignments</h1>
          <div className="mt-10">
            {assignments.length > 0 && assignments.map((assignment, index) => (
            <Accordion key={index} defaultActiveKey={['0']} alwaysOpen>
              <Accordion.Item eventKey={index} >
                <Accordion.Header >{assignment.title}</Accordion.Header>
                <Accordion.Body className="p-5">
                  <p className="">{assignment.notes}</p>
                  <div className="flex">
                    {Array.isArray(assignment.files) && assignment.files.length > 0 ? (
                    assignment.files.map((file, idx) => (
                    <div key={idx} className="mt-4 flex-wrap">
                      {file.contentType.startsWith("image/") ? (
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          <img src={file.url} alt="assignment files" className="w-[500px]" />
                        </a>
                      ) : file.contentType === "application/pdf" ? (
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          <img src="/pdf-placeholder.png" alt="PDF preview" className="w-48 cursor-pointer" />
                          <p>{file.title}</p>
                        </a>
                      ) : file.contentType.startsWith("video/") ? (
                        <video controls width="320">
                          <source src={file.url} type={file.contentType} />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                          Download File
                        </a>
                      )}
                    </div>
                    ))
                    ) : (
                    <p>No files available</p>
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            ))}
          </div>

        </div>
        ) : (
        <div className="flex justify-center align-middle">
          <h1 className="mx-auto text-[18px]">
            No assignments.
          </h1>
        </div>
        )
    ) : (
      <PageLoader />
    ) }
    </div>
  )
}

export default Assignment