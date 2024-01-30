import { useState, useEffect } from "react";
import ClassNavBar from "../navbars/ClassNavBar.jsx";
import ClassRegistereImage from '/images/classRegisteredImage.png'
import { classList } from "../../constants.js";
import ClassCard from "./ClassCard.jsx";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

export default function ClassesPage() {
  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [classTeacher, setClassTeacher] = useState("");
  const [classData, setClassData] = useState([]);
  const [classAddedDialog,setClassAddedDialog] = useState("-200%");
  const [AddClassDialog,setAddClassDialog] = useState("-200%");
  const location = useLocation();
  useEffect(() => {
    setAddClassDialog("-200%");
    (async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/class");
        console.log(response.data.classes);
        setClassData(response.data.classes);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    })();
  }, [classAddedDialog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:4000/api/v1/class/add`, {
        className,
        classCode,
        classTeacher,
      })
      .then((res) => {
        console.log(res);
        setClassAddedDialog("20px");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function HandleRefresh(){
    setClassAddedDialog("-200%")
  }

  function HandleAddClass(){
      setAddClassDialog("0");
  }

  return (
    <>
      {/* <ClassNavBar /> */}
      {location.search.split("=")[1]==="teacher" && <button className="bg-orange-400 py-2 rounded-md mx-4 px-4 mt-2 hidden max-md:block" onClick={HandleAddClass}>
              Add Class
        </button>}
      <div className="flex">
        <div className={location.search.split("=")[1]==="teacher" ? "w-2/3 p-4 grid grid-cols-4 gap-2 h-fit max-md:w-full max-sm:grid-cols-2" : "w-full p-4 grid grid-cols-4 gap-2 h-fit max-md:w-full max-sm:grid-cols-2"} >
          {classData ? (
            classData.map((classItem,index) => <ClassCard classItem={classItem} key={index} role={location.search.split("=")[1]}/>)
          ) : (
            <div className="text-center text-3xl text-gray-300 w-full">
              No Classes Available Yet!!
            </div>
          )}
        </div>

        { location.search.split("=")[1]==="teacher" &&  <div className="w-1/3 p-4 rounded-lg mx-auto max-md:absolute max-md:h-screen max-md:bg-black max-md:w-full max-md:z-50 max-md:bg-opacity-80" style={{top:AddClassDialog}}>
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col max-md:w-2/3 max-md:m-auto bg-white max-md:p-4 max-md:rounded-lg max-md:m-50px max-sm:w-10/12">
            <div className="text-end m-2 text-xl hidden max-md:block cursor-pointer" onClick={()=>setAddClassDialog("-200%")}>X</div>
            <button className="bg-orange-400 p-2 w-full rounded-md" onClick={(e)=>e.preventDefault()}>
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
                {classList.classes.map((classItem, index) => (
                  <option value={classItem} key={index}>
                    class {classItem}
                  </option>
                ))}
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
                value={classTeacher}
                required
                className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-400  focus:ring-1 focus:orange-500"
                onChange={(e) => setClassTeacher(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="mt-6 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>}
        
        <div className="absolute text-center w-full h-full bg-black bg-opacity-70 z-50" style={{top:classAddedDialog}}>
          <div className="m-auto w-fit p-4 rounded-lg bg-blue-400 mt-8">
            <img src={ClassRegistereImage} alt="" width="80px" className="m-auto"/>
            <div className="mt-2 text-2xl font-medium">
            Class added Successfully!
            </div>
            <button className="mt-2 bg-green-700 px-4 py-2 rounded-lg text-white" onClick={HandleRefresh}>Refresh</button>
          </div>
        </div>
      </div>
    </>
  );
}
