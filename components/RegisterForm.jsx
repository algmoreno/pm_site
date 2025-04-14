 "use client"
import { useState } from 'react';
import axios from 'axios';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { EnterAnimation } from '@/hoc/index';

const RegisterForm = () => { 
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "member",
    description: ""
  })

  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
  const validPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{7,}$');

  const handleSubmit = async(e) => {
    e.preventDefault();
    setPending(false);
    setError(null)
    const validated = validation();
    if (!validated) return;

    // add user
    try {
      const response = await axios.post('/api/auth/users', user)
      setPending(false);
      toast.success(response.data.message);
      router.push("/login")
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setPending(false);
    }
  }

  const validation = () => {
    if (!validEmail.test(user.email)) {
      console.log("1");
      setError("Invalid email format.")
      return false
    }
    if (!validPassword.test(user.password)) {
      setError("Password must be at least 7 characters and include: number, special character, and both lower case and upper case letters.")
      return false
    }
    if (user.confirmPassword !== user.password) {
      console.log("3");
      setError("Password does not match.")
      return false
    }
    return true
  }

  return (
    <div className="w-[800px] mx-auto mt-auto mb-20 max-md:mt-20">
      <form className="w-[70%] my-20 mx-auto" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-[24px] font-semibold text-gray-900">Register</h2>
            <p className="mt-1 text-sm/6 text-gray-500">Join the club.</p>
            {!!error && (
              <div className="bg-red-500 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-200 my-6">
                <p>
                  {error}
                </p>
              </div>
            )}
            <div className="max-sm:block mt-10 grid grid-cols-2 gap-2">

              <div className="col-span-1 mt-2">
                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                  First Name
                </label> 
                <div className="mt-2">
                  <input
                    disabled={pending}
                    type="text"
                    value={user.firstName}
                    onChange={(e) => setUser({...user, firstName:e.target.value})}
                    required
                    className="block w-full rounded-md border border-gray-400 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                    outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"/>
                </div>
              </div>

              <div className="col-span-1 mt-2">
                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900 ">
                  Last Name
                </label> 
                <div className="mt-2">
                  <input
                    disabled={pending}
                    type="text"
                    value={user.lastName}
                    onChange={(e) => setUser({...user, lastName:e.target.value})}
                    required
                    className="block w-full rounded-md border border-gray-400 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                    outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"/>
                </div>
              </div>

              <div className="col-span-2 mt-2">
                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                  Email
                </label> 
                <div className="mt-2">
                  <input
                    disabled={pending}
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({...user, email:e.target.value.trim()})}
                    required
                    className="block max-sm:w-[100%] w-[49%] rounded-md border border-gray-400 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                    outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"/>
                </div>
              </div>

              <div className="col-span-1 mt-2">
                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label> 
                <div className="mt-2">
                  <input
                    disabled={pending}
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password:e.target.value})}
                    required
                    className="block w-full rounded-md border border-gray-400 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                    outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"/>
                </div>
              </div>

              <div className="col-span-1 mt-2">
                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                  Confirm Password
                </label> 
                <div className="mt-2">
                  <input
                    disabled={pending}
                    type="password"
                    value={user.confirmPassword}
                    onChange={(e) => setUser({...user, confirmPassword:e.target.value})}
                    required
                    className="block w-full rounded-md border border-gray-400 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                    outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"/>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button onClick={() => setUser({...user, password: "", confirmPassword:""})} type="button" className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            disabled={false}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-300 focus-visible:outline-2 f
                        ocus-visible:outline-offset-2 focus-visible:outline-slate-600">
            Submit
          </button>
        </div>        

      </form>
    </div>
  )
}

export default EnterAnimation(RegisterForm)