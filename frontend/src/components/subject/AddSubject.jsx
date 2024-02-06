import { useEffect, useState } from "react";
import { classList } from "../../constants.js";
import axios from 'axios'
import { useParams } from "react-router-dom";
import CustomSpinner from "../CustomSpinner.jsx";

export default function AddSubject({topPosition,setTopPosition,setRefresh}) {
   const [subject, setSubject] = useState("");
   const [loading,setLoading] = useState(false);
   const {classid} = useParams()
   useEffect(()=>{

   },[topPosition,subject])
  function handleAddSubjectSubmit(e){
    e.preventDefault();
    setLoading(true);
    if(!subject)
    {
      alert("Enter subject name!")
      return;
    }
    ;(async()=>{
      await axios.post(`http://localhost:3000/api/v1/class/subject/add/${classid}`,{subject}).then((res)=>{
        setLoading(false)
        console.log("response : ",res.data.message)
      }).catch((err)=>{
        setLoading(false)
        console.log("error : ",err.response.data.message);
      })
    })();
    setTopPosition("-200%")
  }
  return (
      loading ? <CustomSpinner/> :  <div className="absolute w-full z-50 bg-black text-gray-500 h-screen bg-opacity-70" style={{top:topPosition}}>
      <div className="m-auto w-1/3 mt-12 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-200 p-2 rounded-lg max-sm:w-full max-sm:absolute">
        <div className="text-black text-2xl text-end mb-4 cursor-pointer" onClick={()=>setTopPosition("-200%")}>X</div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col max-md:w-2/3 max-md:m-auto max-md:p-4 max-md:rounded-lg max-md:m-50px max-sm:w-10/12"
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
          <button
            type="submit"
            onClick={(e)=>handleAddSubjectSubmit(e)}
            className="mt-6 px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
