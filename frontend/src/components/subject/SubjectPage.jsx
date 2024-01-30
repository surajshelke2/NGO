import { useEffect, useState } from "react";
import AddSubject from "./AddSubject";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SubjectPage(){
    const [topPosition,setTopPosition] = useState("-200%");
    const [subjectsData,setSubjectsData] = useState([]);
    const {classid} = useParams();
    useEffect(()=>{
        console.log(subjectsData)
        ;(async()=>{
            axios.get(`http://localhost:4000/api/v1/class/subject/${classid}`).then((res)=>{
                setSubjectsData(res.data.data)
            }).catch((err)=>{
                alert(err.response.data.message);
            })
        })();
    },[topPosition,subjectsData.length])
    return(
        <>
        <div className="flex justify-between p-8 bg-slate-800 bg-opacity-5">
            <div className="w-1/4 bg-slate-800 bg-opacity-15">
            <div className="bg-orange-500 text-center p-2">className</div>
                <div className="p-4 flex flex-col gap-2">
                <div>
                    <button className="bg-orange-500 w-full p-2" onClick={()=>setTopPosition("0%")}>Add subject</button>
                </div>
                <div className="flex flex-col gap-3">
                    {subjectsData.map((subject,index)=>
                        <button className="bg-orange-500 w-full p-2" key={index} id={subject._id}>{subject.subjectName}</button>
                    )}
                </div>
                </div>
            </div>
            <div className="w-3/4 px-4">
                <div className="flex justify-between">
                    <button className="bg-orange-500 rounded-lg py-2 px-4">Back</button>
                    <button className="bg-orange-500 rounded-lg py-2 px-4">Add Content</button>
                </div>
                <div className="py-4 w-full flex flex-col gap-2">
                <div className="bg-orange-500 p-2 w-full flex justify-between content-center">
                    <div>
                        <div>unit</div>
                        <small>unit name</small>
                    </div>
                    <div className="mt-auto flex gap-2">
                    <button className="rounded-md py-2 px-4 bg-slate-500">Edit</button>
                    <button className="rounded-lg py-2 px-4 bg-slate-500">Delete</button>
                    </div>
                </div>
                <div className="bg-orange-500 p-2 w-full flex justify-between content-center">
                    <div>
                        <div>unit</div>
                        <small>unit name</small>
                    </div>
                    <div className="mt-auto flex gap-2">
                    <button className="rounded-md py-2 px-4 bg-slate-500">Edit</button>
                    <button className="rounded-lg py-2 px-4 bg-slate-500">Delete</button>
                    </div>
                </div>
                <div className="bg-orange-500 p-2 w-full flex justify-between content-center">
                    <div>
                        <div>unit</div>
                        <small>unit name</small>
                    </div>
                    <div className="mt-auto flex gap-2">
                    <button className="rounded-md py-2 px-4 bg-slate-500">Edit</button>
                    <button className="rounded-lg py-2 px-4 bg-slate-500">Delete</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
         <AddSubject topPosition={topPosition} setTopPosition={setTopPosition}/>
         </>
    )
}