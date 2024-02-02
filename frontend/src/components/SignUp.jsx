import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import studetnLoginImage from '/images/studentLogin.png'
import CustomSpinner from "./CustomSpinner.jsx";
import emailIcon from '/images/emailIcon.png'


export default function SignUp() {
  const [firstName, setFirstname] = useState("");
  const [middleName, setMidlename] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role,setRole] = useState("");
  const [loading,setLoading] = useState(false);
  const [emailDialogBox,setEmailDialogBox] = useState("-200%");
  const location = useLocation();
  // const upload = multer()
  useEffect(()=>{
    setRole(location.search.split("=")[1]);
  },[location])



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
      if (role === 'student') {
        await registerStudent();
      } else if (role === 'teacher') {
        await registerTeacher();
      }
    
  };

  const registerStudent = async () => {
    try {
      const { response } = await axios.post("http://localhost:4000/api/v1/user/student/signup", {
        firstName,
        middleName,
        lastName,
        email,
        password
      });
      setLoading(false);
      console.log("User registered successfully");
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      if (error) {
        console.error("Error occurred during registration:", error.response.data);
        alert("User registration failed. Error: " + error.response.data);
      } else {
        console.error("Error occurred during registration:", error.message);
        alert("User registration failed. Please try again.");
      }
    }
  };
  
  const registerTeacher = async () => {
    await axios.post("http://localhost:4000/api/v1/user/teacher/signup", {
      firstName,
      middleName,
      lastName,
      email,
      password,
      degree: "phd"
    })
    .then(()=>{
    setLoading(false);
    console.log("User registered successfully");
    setEmailDialogBox(true);
    }).catch((err)=>{
      setLoading(false);
    alert("User Registration Failed. Error: ");
    })
  }
  return (
    <>
    {loading ? <CustomSpinner/> : <>
    <div className="flex w-screen gap-18 justify-center max-sm:flex-col relative">
      <div className="flex gap-1 w-fit align-middle flex-col items-center bold my-8 text-3xl font-medium max-sm:text-2xl max-sm:m-auto">
        <img src={studetnLoginImage} alt="" width="100%"/>
      </div>
      <div className="max-lg:w-1/2 max-sm:w-4/5 h-fit my-auto w-1/3 max-sm:m-auto">
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input
          type="text"
          placeholder="firstname"
          value={firstName}
          autoFocus
          className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-slate-500  focus:ring-1 focus:slate-500"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="midlename"
          value={middleName}
          className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-slate-500  focus:ring-1 focus:slate-500"
          onChange={(e) => setMidlename(e.target.value)}
        />
        <input
          type="text"
          placeholder="lastname"
          value={lastName}
          className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-slate-500  focus:ring-1 focus:slate-500"
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-slate-500  focus:ring-1 focus:slate-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-slate-500  focus:ring-1 focus:slate-500"
          onChange={(e) => setPassword(e.target.value)}
        />
          <button
            type="submit"
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-slate-500 text-white hover:bg-slate-600">
            Register
          </button>
      </form>
    </div>
    <div className="absolute w-full z-10" style={{top:emailDialogBox,height:"100%"}}>
    <div className='w-1/4 left-1/3 bg-slate-400  m-auto text-center p-6 rounded-lg max-lg:w-2/3'>
        <img src={emailIcon} alt="" width="100px" className="m-auto"/>
        <h2 className="font-bold text-2xl my-2">Thank you for registering.</h2>
        <p>We're glad you are here Before you start exploring,we just sent you the email confirmation.</p>
        <p>Please confirm your email</p>
      </div>
    </div>
    </div>
    </>}
    </>
  );
}