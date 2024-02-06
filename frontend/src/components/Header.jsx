import { Link, useLocation } from "react-router-dom";
export default function Header() {
  const location = useLocation()
  console.log(location)
  return (
    <>
      <nav className="max-sm:px-4 lg:px-8 w-full px-18 py-1 sticky top-0 z-50 shadow-md bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-200">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {/* <img src={img} className="" alt="Logo" width="150px"/> */}
            <h1 className="text-2xl font-mono max-sm:text-xl">Educative</h1>
          </div>
          {(location.pathname.includes("login") || location.pathname.includes("register")) ? <div className="flex gap-8 max-sm:gap-3">
            <button className="px-3 py-2 rounded-lg border-transparent text-white text-base bg-gradient-to-r from-green-400 to-blue-500 hover:from-teal-500 hover:to-teal-500 max-sm:py-2 max-sm:px-2 max-sm:text-sm">
              <Link to="/user/login/?role=student">Student</Link>
            </button> 
            <button className="px-3 py-2 rounded-lg border-transparent text-whitetext-base text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-teal-500 hover:to-teal-500 max-sm:py-2 max-sm:px-2 max-sm:text-sm">
              <Link to="/user/login/?role=teacher">Teacher</Link>
            </button>
          </div> : <div className="flex gap-8 max-sm:gap-3">
            <button className="px-3 py-2 rounded-lg border-transparent text-white text-base bg-gradient-to-r from-green-400 to-blue-500 hover:from-teal-500 hover:to-teal-500 max-sm:py-2 max-sm:px-2 max-sm:text-sm">
              <Link to={`/user/result`+location.search}>result</Link>
            </button> 
            <button className="px-3 py-2 rounded-lg border-transparent text-whitetext-base text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-teal-500 hover:to-teal-500 max-sm:py-2 max-sm:px-2 max-sm:text-sm">
              Logout
            </button>
            </div>
          }
        </div>
      </nav>
    </>
  );
}
