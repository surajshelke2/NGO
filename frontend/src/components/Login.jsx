import { useEffect, useState } from "react";
import { Link, useLocation , useNavigate} from "react-router-dom";  
import axios from "axios";
import studetnLoginImage from '/images/studentLogin.png'

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role,setRole] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // handler to submit data
  useEffect(()=>{
    setRole(location.search.split("=")[1]);
  },[location])


  function HandleSubmit(e) {
    e.preventDefault();
    if(role === 'student'){
      axios
      .post("http://localhost:4000/api/v1/user/student/signin", {
        email,
        password,
      })
      .then(() => {
        navigate(`/user/class?role=${role}`)
      })
      .catch((err) => console.log(err.response ? err.response.data.message : err));
    }
    else if(role === 'teacher')
    {
      axios
      .post("http://localhost:4000/api/v1/user/teacher/signin", {
        email,
        password,
      })
      .then((res) => {
        navigate(`/user/class?role=${role}`)
      })
      .catch((err) => console.log(err.response ? err.response.data.message : err));
    }
    else{
      alert("check your URL again");
    }
  }

  return (
    <div className="flex w-screen gap-18 justify-center max-sm:flex-col">
      <div className="flex gap-1 w-fit align-middle flex-col items-center bold my-8 text-3xl font-medium max-sm:text-2xl max-sm:m-auto">
        <img src={studetnLoginImage} alt="" width="100%"/>
      </div>
      <div className="max-lg:w-1/2 max-sm:w-4/5 h-fit my-auto w-1/3 max-sm:m-auto">
        <form onSubmit={(e) => HandleSubmit(e)}>
          <input
            type="Email"
            placeholder="Email"
            autoFocus
            value={email}
            required
            className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-400  focus:ring-1 focus:orange-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            required
            className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-500  focus:ring-1 focus:orange-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-orange-500 text-white hover:bg-orange-600"
          >
            Login
          </button>
          <Link>
            <div className="text-end my-1 text-indigo-400 max-sm:text-sm">
              foreget passoword?
            </div>
          </Link>
          <Link to={`/user/register/?role=${role}`}>
            <div className="text-center my-1 text-indigo-400 max-sm:text-sm">
              Not have an Account ?
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}
