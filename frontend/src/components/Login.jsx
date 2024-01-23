import { useState } from "react";
import { MdCastForEducation } from "react-icons/md";
import {Link} from 'react-router-dom'
export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div>
    <div className="flex m-auto gap-1 text-emerald-700 w-fit align-middle flex-col items-center bold my-8 text-3xl font-medium max-sm:text-2xl">
        <MdCastForEducation/>NGO
    </div>
    <div className="w-1/3 m-auto max-lg:w-1/2 max-sm:w-4/5 h-fit">
      <form>
        <input
          type="Email"
          placeholder="Email/Roll No."
          value={email}
          className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          onChange={(e) => setEmail(e.value)}
        />
        <input
          type="password"
          value={email}
          placeholder="password"
          className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          onChange={(e) => setPassword(e.value)}
        />
          <button
            type="submit"
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-emerald-700 text-white hover:bg-emerald-800">
            Register
          </button>
          <Link><div className="text-end my-1 text-indigo-400 max-sm:text-sm">foreget passoword?</div></Link>
          <Link to="/user/register"><div className="text-center my-1 text-indigo-400 max-sm:text-sm">Not have an Account ?</div></Link>
      </form>
    </div>
    </div>
  );
}