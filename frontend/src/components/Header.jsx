import { Link } from "react-router-dom";
import ClassNavBar from "./navbars/ClassNavBar";
import img from "../img/logo.png";
export default function Header() {
  return (
    <>
      <nav className="sm:px-6 lg:px-8 w-full px-18 py-1 sticky top-0 z-50 bg-slate-300">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {/* <img src={img} className="" alt="Logo" width="150px"/> */}
            <h1 className="text-2xl font-mono">Educative</h1>
          </div>
          <div className="flex gap-6">
            <button className="px-3 py-2 rounded-lg border-transparent text-white bg-slate-600 text-base">
              <Link to="/user/login/?role=student">Student</Link>
            </button>
            <button className="px-3 py-2 rounded-lg border-transparent text-white bg-slate-600 text-base">
              <Link to="/user/login/?role=teacher">Teacher</Link>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
