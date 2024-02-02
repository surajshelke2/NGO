import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import studetnLoginImage from "/images/studentLogin.png";
import CustomSpinner from "./CustomSpinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // handler to submit data
  useEffect(() => {
    setRole(location.search.split("=")[1]);
  }, [location, error]);

  async function HandleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (role === "student") {
      await axios
        .post("http://localhost:4000/api/v1/user/student/signin", {
          email,
          password,
        })
        .then((res) => {
          setLoading(false);
          document.cookie = `cookieName=${res.data.token}; path=/`;
          navigate(`/user/class?role=${role}`);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response.data.message);
          setError(err.response.data.message);
          console.log(err);
        });
    } else if (role === "teacher") {
      await axios
        .post("http://localhost:4000/api/v1/user/teacher/signin", {
          email,
          password,
        })
        .then((res) => {
          setLoading(false);
          res.data ? localStorage.setItem("token", res.data.token) : null;
          navigate(`/user/class?role=${role}`);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err)
          setError(err.response ? err.response.data.message : "something went wrong!");
        });
    } else {
      setError("check Your Url!");
    }
  }

  return (
    <>
    {loading ? <CustomSpinner/> : <>
    <div className="flex gap-18 justify-center max-sm:flex-col">
      <div className="flex gap-1 w-fit align-middle flex-col items-center bold my-8 text-3xl font-medium max-sm:text-2xl max-sm:m-auto">
        <img src={studetnLoginImage} alt="" width="90%" />
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
    focus:outline-none focus:border-slate-400  focus:ring-1 focus:slate-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            required
            className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-slate-500  focus:ring-1 focus:slate-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-white hover:bg-slate-800 bg-slate-600"
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
      <div className="w-full bg-black absolute z-50 h-full bg-opacity-70" style={{top:error?'0%':'-200%'}}>
        <div className="bg-slate-700 w-fit p-4 text-white m-auto mt-14 rounded-lg flex flex-col">
           <h3 className="text-center text-xl">{error}</h3>
           <button className="bg-lime-700 px-4 py-2 rounded-lg w-fit m-auto mt-3" onClick={()=>{
            setError("");
            }}>Close</button>
        </div>
      </div>
    </div>
    </>
  }
  </>
  );
}
