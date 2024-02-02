import { useEffect, useState } from "react";
import { classList } from "../../constants.js";
import axios from 'axios'
import { useParams } from "react-router-dom";

export default function AddUnit({positionUnitData,setPositionUnitData}) {
   const [unit, setUnit] = useState("");
   const {classid} = useParams()
   useEffect(()=>{

   },[positionUnitData,unit.length])
  function handleAddUnitSubmit(e){
    e.preventDefault();
    if(!unit)
    {
      alert("Enter subject name!")
      return;
    }
    // ;(async()=>{
    //   await axios.post(`http://localhost:4000/api/v1/class/subject/add/${classid}`,{subject}).then((res)=>{
    //     console.log("response : ",res.data.message)
    //   }).catch((err)=>{
    //     console.log("error : ",err.response.data.message);
    //   })
    // })();
    setPositionUnitData("-200%")
  }
  return (
    <div className="absolute w-full z-50 bg-black text-gray-500 h-screen bg-opacity-70" style={{top:positionUnitData}}>
      <div className="m-auto w-1/3 mt-12 bg-white p-2 rounded-lg">
        <div className="text-black text-2xl text-end mb-4 cursor-pointer" onClick={()=>setPositionUnitData("-200%")}>X</div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col max-md:w-2/3 max-md:m-auto bg-white max-md:p-4 max-md:rounded-lg max-md:m-50px max-sm:w-10/12"
        >
          <input
            type="text"
            placeholder="Unit Name"
            required
            value={unit}
            className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-400  focus:ring-1 focus:orange-500"
            onChange={(e) => setSubject(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e)=>handleAddUnitSubmit(e)}
            className="mt-6 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
