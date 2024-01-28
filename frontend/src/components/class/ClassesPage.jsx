import { useState, useEffect } from "react";
import ClassNavBar from "../navbars/ClassNavBar.jsx";
import { classList } from "../../constants.js";
import axios from "axios";

export default function ClassesPage() {
  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [classTeacherName,setClassTeacherName] = useState("")
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/class");
        setClassData(data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };
  return (
    <>
    <ClassNavBar />
    <div className="flex">
      
      <div className="w-2/3 p-4">
        {classData ? classData.map((classItem)=><div>
            class {classItem}
            </div>
        ) : <div className="text-center text-3xl text-gray-300">No Classes Available Yet!!</div>}
      </div>


      <div className="w-1/3 p-4 rounded-lg mx-auto">
        <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col">
          <button className="bg-orange-400 p-2 w-full rounded-md">
            Add Class Here!
          </button>
          <div className="flex flex-row items-center mt-4">
            <select
              type="number"
              placeholder="className"
              autoFocus
              value={className}
              required
              className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-400  focus:ring-1 focus:orange-500"
              onChange={(e) => setClassName(e.target.value)}
            >
                <option value="0">Select class</option>
                {classList.classes.map((classItem) => (<option value={classItem}>class {classItem}</option>))}
            </select>
            <input
              type="text"
              placeholder="class code"
              value={classCode}
              required
              className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-400  focus:ring-1 focus:orange-500"
              onChange={(e) => setClassCode(e.target.value)}
            />
          </div>
          <div>
          <input
              type="text"
              placeholder="class teacher name"
              value={classTeacherName}
              required
              className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-400  focus:ring-1 focus:orange-500"
              onChange={(e) => setClassTeacherName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-6 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

