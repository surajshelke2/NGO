import { useEffect, useState } from "react";
import { classList } from "../../constants.js";
import axios from 'axios'

export default function AddSubject({topPosition,setTopPosition}) {
   const [className, setClassName] = useState(null);
   const [classId, setClassId]= useState("");
   const [subject, setSubject] = useState("");
  function handleAddSubjectSubmit(e){
    e.preventDefault();
    if(!subject)
    alert("Enter subject name!")
    else if(!classId)
    alert("select class id");
    else if(!className)
    alert("select class");
    console.log({className,classId,subject});
    ;(async()=>{
      await axios.post("http://localhost:4000/api/v1/class/subject/add",{className,classId,subject}).then((res)=>{
        console.log("response : ",res)
      }).catch((err)=>{
        console.log("error : ",err);
      })
    })()
  }
  return (
    <div className="absolute w-full z-50 bg-black text-gray-500 h-screen bg-opacity-70" style={{top:topPosition}}>
      <div className="m-auto w-1/3 mt-12 bg-white p-2 rounded-lg">
        <div className="text-black text-2xl text-end mb-4 cursor-pointer" onClick={()=>setTopPosition("-200%")}>X</div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col max-md:w-2/3 max-md:m-auto bg-white max-md:p-4 max-md:rounded-lg max-md:m-50px max-sm:w-10/12"
        >
          <input
            type="text"
            placeholder="Subject Name"
            required
            value={subject}
            className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-400  focus:ring-1 focus:orange-500"
            onChange={(e) => setSubject(e.target.value)}
          />
          <div className="flex">
            <select
              required
              className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-400  focus:ring-1 focus:orange-500"
              onChange={(e) => setClassName(e.target.value)}
            >
              <option value={""}>Select Class</option>
              {classList.classes.map((classNum,index) => (
                <option key={index} value={classNum}>Class {classNum}</option>
              ))}
            </select>
            <select
              required
              className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-400  focus:ring-1 focus:orange-500"
              onChange={(e) => setClassId(e.target.value)}
            >
              <option value={""}>Select Class Id</option>
              {classList.classIds.map((classId,index) => (
                <option key={index} value={classId}>{classId}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            onClick={(e)=>handleAddSubjectSubmit(e)}
            className="mt-6 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
