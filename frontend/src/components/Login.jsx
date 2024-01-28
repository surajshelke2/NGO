import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import studetnLoginImage from "/images/studentLogin.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("");
 
  const location = useLocation();
  const navigate = useNavigate();

  // handler to submit data
  useEffect(() => {
    setRole(location.search.split("=")[1]);
  }, [location]);

  async function HandleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all the details !!");
    } 
    
      if (role === "student") {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };

        

          const { data } = await axios.post(
            "http://localhost:4000/api/v1/user/student/signin",
            {
              email,
              password,
            },
            config
          );
          console.log(data)

          localStorage.setItem("userInfo",JSON.stringify(data));
          console.log(data.token);
       
          navigate(`/user/class?role=${role}`);
          
        } catch (error) {
          console.log(error)
        
        }
      } else if (role === "teacher") {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };

          const { data } = await axios.post(
            "http://localhost:4000/api/v1/user/teacher/signup",
            {
              email,
              password,
            },
            config
          );

          localStorage.setItem("token", JSON.stringify(data));
          navigate(`/user/class?role=${role}`);
          
        } catch (error) {
         console.log(error)
          
        }
      } else {
        alert("Check your URL again");
      }
    
  }

  return (
    <div className="flex w-screen gap-18 justify-center max-sm:flex-col">
      <div className="flex gap-1 w-fit align-middle flex-col items-center bold my-8 text-3xl font-medium max-sm:text-2xl max-sm:m-auto">
        <img src={studetnLoginImage} alt="" width="100%" />
      </div>
      <div className="max-lg:w-1/2 max-sm:w-4/5 h-fit my-auto w-1/3 max-sm:m-auto">
        <form onSubmit={(e) => HandleSubmit(e)}>
          <input
            type="email"
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
            placeholder="Password"
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
          <Link to="/">
            <div className="text-end my-1 text-indigo-400 max-sm:text-sm">
              Forgot password?
            </div>
          </Link>
          <Link to={`/user/register/?role=${role}`}>
            <div className="text-center my-1 text-indigo-400 max-sm:text-sm">
              Don't have an Account?
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}
