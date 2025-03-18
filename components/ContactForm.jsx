"use client"
import { useState } from 'react';
import axios from 'axios';
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPending(true);

    emailjs.send(
      'service_qjdjgk9',
      'template_irpu8ds',
      {
        from_name: form.name,
        to_name: 'Alan',
        from_email: form.email,
        to_email: 'alg.moreno00@gmail.com',
        message: form.message,
      }, 'GDA7yUKvlEcVbask0')
      .then(() => {
        setPending(false);        
        setForm({
          name: "",
          email: "",
          message: "",
        })
        toast.success("Message successfully sent!")
      }, (error) => {
        setPending(false);
        console.log(error);
        toast.error("Something went wrong.")
      })

      
  }

  return (
    <div className="w-[800px] mx-auto mt-[8%] max-sm:mt-[20%]  mb-10  bg-2 rounded-md border-2 border-gray-300 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">

      <form onSubmit={handleSubmit} className="w-[70%] my-20 mx-auto">
        <div className="space-y-2">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-[24px] font-semibold text-gray-900">Contact</h2>
            <p className="mt-1 text-sm/6 text-gray-500">Send me a message.</p>
            
            {!!error && (
              <div className="bg-red-500 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-200 my-6">
                <p>
                  {error}
                </p>
              </div>
            )}
            <div className="mt-10 ">

            <div className="sm:col-span-4">
                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                  Name
                </label> 
                <div className="mt-2">
                  <input
                    disabled={false}
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({...form, name:e.target.value})}
                    required
                    className="block w-[50%] max-sm:w-[100%] max-sm:m-auto mr-auto rounded-md border border-gray-400 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                    outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"/>
                </div>
              </div>

              <div className="sm:col-span-4 mt-2">
                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                  Email
                </label> 
                <div className="mt-2">
                  <input
                    disabled={pending}
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email:e.target.value})}
                    required
                    className="block w-[50%] mr-auto max-sm:w-[100%] max-sm:m-auto rounded-md border border-gray-400 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                    outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"/>
                </div>
              </div>

              <div className="sm:col-span-4 mt-2">
                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                  Message
                </label> 
                <div className="mt-2">
                <textarea
                  disabled={pending}
                  value={form.message}
                  onChange={(e) => setForm({...form, message:e.target.value})}
                  required
                  className="w-full h-[100px] m-auto rounded-md border border-gray-400 px-3 py-2 text-base text-gray-900 outline-1 
                            -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                            focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm leading-tight resize-none"/>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-700 focus-visible:outline-2 f
                        ocus-visible:outline-offset-2 focus-visible:outline-slate-600">
            Submit
          </button>
        </div>

      </form>
    </div>
  )
}

export default ContactForm