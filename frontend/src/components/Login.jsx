import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import studetnLoginImage from "/images/studentLogin.png";
import { showAlert } from "tailwind-toastify";
import LoadingComponent from "./Loader/LoadingAnimation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // handler to submit data
  useEffect(() => {
    setRole(location.search.split("=")[1]);
  }, [location, error]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (role === "student") {
        const res = await axios.post("http://localhost:3000/api/v1/user/student/signin", {
          email,
          password,
        });
        setLoading(false);
        document.cookie = `cookieName=${res.data.token}; path=/`;
        showAlert("success", "Success", "Logged in successfully!",);
        navigate(`/user/class?role=${role}`);
      } else if (role === "teacher") {
        const res = await axios.post("http://localhost:3000/api/v1/user/teacher/signin", {
          email,
          password,
        });
        setLoading(false);
        res.data ? localStorage.setItem("token", res.data.token) : null;
        showAlert("success", "Success", "Logged in successfully!", { zIndex: "z-50" });
        navigate(`/user/class?role=${role}`);
      } else {
        setError("Invalid role provided");
      }
    } catch (err) {
      setLoading(false);
      
      setError(err.response?.data?.message || "Something went wrong!");
      showAlert("error", "Error", error || "Something went wrong!", { zIndex: "z-50" });
    }
  }

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="flex gap-18 justify-center max-sm:flex-col">
            <div className="flex gap-1 w-fit align-middle flex-col items-center bold my-8 text-3xl font-medium max-sm:text-2xl max-sm:m-auto">
              <img src={studetnLoginImage} alt="" width="90%" />
            </div>
            <div className="max-lg:w-1/2 max-sm:w-4/5 h-fit my-auto w-1/3 max-sm:m-auto">
              <form onSubmit={(e) => handleSubmit(e)}>
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
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-teal-500 hover:to-teal-500"
                >
                  Login
                </button>
                {/* {error && <div className="text-red-500 text-sm mt-1">{error}</div>} */}
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
        </>
      )}
    </>
  );
}
