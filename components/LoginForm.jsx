"use client"
import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(27);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("name", name);
    console.log("email", email);
    console.log("age", age);
    try {
      const response = await axios.post('/api/users', {name, email, age})
      console.log(response)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-[800px] h-auto mx-auto my-20 bg-slate-300 rounded-md">

      <form className="w-[70%] my-20 mx-auto" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-[24px] font-semibold text-gray-900">Sign In</h2>
            <p className="mt-1 text-sm/6 text-gray-600">Not a member? Create account here.</p>
              <div className="mt-10 ">

                <div className="sm:col-span-4">
                  <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="family-name"
                      className="block w-[50%] m-auto rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                      outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="name"
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="block w-[50%] m-auto rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                              outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                  </div>
                </div>

                {/* <div className="sm:col-span-4">
                  <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="family-name"
                      className="block w-[50%] m-auto rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                      outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                  </div> */}

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
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-300 focus-visible:outline-2 f
                        ocus-visible:outline-offset-2 focus-visible:outline-slate-600">
            Save
          </button>
        </div>

      </form>
    </div>
  )
}

export default LoginForm