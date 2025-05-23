"use client"
import { useState } from 'react';
import axios from 'axios';
import { toast } from "sonner";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { EnterAnimation } from '@/hoc/index';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);

    const response = await signIn("credentials", {
      redirect: false,
      email, 
      password
    });

    if (response.ok){
      toast.success("Welcome Back!")
      router.push("/")
    } else if (response?.status === 401) {
      setError("Wrong email or password.")
      setPending(false);
    } else {
      setError("Something went wrong.")
    }
  }

  return (
    <div id="loginForm" className="w-[600px] max-sm:w-[100%] h-auto mx-auto mt-auto mb-20 max-sm:mt-20">

      <form onSubmit={handleSubmit} className="w-auto my-20 mx-auto">
        <div className="space-y-2">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-[24px] font-semibold text-gray-900">Sign In</h2>
            <p className="mt-1 text-sm/6 text-gray-500">Not a member? Create account <a className="mt-1 text-sm/6 underline underline-offset-1 text-black" href="/register">here</a>.
            </p>
            
            {!!error && (
              <div className="bg-red-500 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-200 my-6">
                <p>
                  {error}
                </p>
              </div>
            )}
            <div className="mt-10">

              <div className="sm:col-span-4">
                <label htmlFor="last-name" className="block text-sm/6 max-sm:m-auto font-medium text-gray-900 ml-[20%]">
                  Email
                </label> 
                <div className="mt-2">
                  <input
                    disabled={pending}
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-[50%] max-sm:w-[100%] max-sm:m-auto mr-auto rounded-md border border-gray-400 px-3 py-1.5 ml-[20%] text-base text-gray-900 outline-1 -outline-offset-1 
                    outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"/>
                </div>
              </div>

              <div className="sm:col-span-4 mt-2">
                <label htmlFor="last-name" className="block text-sm/6 max-sm:m-auto font-medium text-gray-900 ml-[20%]">
                  Password
                </label> 
                <div className="mt-2">
                  <input
                    disabled={pending}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-[50%] mr-auto max-sm:w-[100%] max-sm:m-auto rounded-md border border-gray-400 px-3 py-1.5 ml-[20%] text-base text-gray-900 outline-1 -outline-offset-1 
                    outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"/>
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

export default EnterAnimation(LoginForm)