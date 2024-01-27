import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import studetnLoginImage from '/images/studentLogin.png'


export default function SignUp() {
  const [firstName, setFirstname] = useState("");
  const [middleName, setMidlename] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role,setRole] = useState("");
  const location = useLocation();
  // const upload = multer()
  useEffect(()=>{
    setRole(location.search.split("=")[1]);
  },[location])

  const HandleSubmit =  async(e)=>{
    e.preventDefault();
    if(role === 'student')
    {
      await axios.post("http://localhost:4000/api/v1/user/student/signup",
      {
        firstName,middleName,lastName,email,password
      })
      .then(()=>{
        console.log("user registered successfully")
        alert("check your email for verification");
      }).catch((err)=>{
        console.log("user not registered : ",err);
        alert("user not registered try again");
      })
    }
    else if(role === 'teacher')
    {
      await axios.post("http://localhost:4000/api/v1/user/teacher/signup",
      {
        firstName,middleName,lastName,email,password,degree:"phd"
      })
      .then(()=>{
        console.log("user registered successfully")
        alert("check your email for verification");
      }).catch((err)=>{
        console.log("user not registered : ",err);
        alert("user not registered try again");
      })
    }
  }

  return (
    <div className="flex w-screen gap-18 justify-center max-sm:flex-col">
      <div className="flex gap-1 w-fit align-middle flex-col items-center bold my-8 text-3xl font-medium max-sm:text-2xl max-sm:m-auto">
        <img src={studetnLoginImage} alt="" width="100%"/>
      </div>
      <div className="max-lg:w-1/2 max-sm:w-4/5 h-fit my-auto w-1/3 max-sm:m-auto">
      <form onSubmit={(e)=>HandleSubmit(e)}>
        <input
          type="text"
          placeholder="firstname"
          value={firstName}
          autoFocus
          className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-500  focus:ring-1 focus:orange-500"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="midlename"
          value={middleName}
          className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-500  focus:ring-1 focus:orange-500"
          onChange={(e) => setMidlename(e.target.value)}
        />
        <input
          type="text"
          placeholder="lastname"
          value={lastName}
          className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-500  focus:ring-1 focus:orange-500"
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-500  focus:ring-1 focus:orange-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-500  focus:ring-1 focus:orange-500"
          onChange={(e) => setPassword(e.target.value)}
        />
          <button
            type="submit"
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-orange-500 text-white hover:bg-orange-600">
            Register
          </button>
      </form>
    </div>
    </div>
  );
}