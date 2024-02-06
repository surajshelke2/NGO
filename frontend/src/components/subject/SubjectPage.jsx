import { useEffect, useState } from "react";
import AddSubject from "./AddSubject";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import AddUnit from "./AddUnit";
import CustomSpinner from "../CustomSpinner";

export default function SubjectPage(){
    const [topPosition,setTopPosition] = useState("-200%");
    const [subjectsData,setSubjectsData] = useState([]);
    const [unitData,setUnitData] = useState([]);
    const [positionUnitData,setPositionUnitData] = useState("-200%");
    const {classid} = useParams();
    const [loading,setLoading] = useState(false);
    const [selectedSubject,setSelectedSubject] = useState("");
    const [selectedSubjectDialog,setSelectedSubjectDialog] = useState(false);
    const [subjectId,setSubjectId] = useState("");
    const location = useLocation()
    useEffect(()=>{
        setLoading(true)
        setSelectedSubjectDialog(false);
        ;(async()=>{
            await axios.get(`http://192.168.59.242:3000/api/v1/class/subject/${classid}`).then((res)=>{
                setLoading(false)
                setSubjectsData(res.data.data)
                !subjectId && setSubjectId(res.data.data[0]._id);
                !selectedSubject && setSelectedSubject(res.data.data[0].subjectName)
            }).catch((err)=>{
                setLoading(false)
                console.log(err);
            })
        })();
        subjectId && (async ()=>{
            await axios.get(`http://192.168.59.242:3000/api/v1/class/subject/unit/${subjectId}`).then((res)=>{
                    setUnitData(res.data.data)
                }).catch((err)=>{
                    console.log(err)
                })
        })();
    },[subjectId])

    // deletion of unit 
    async function HandleDeleteUnit(e){
        await axios.delete(`http://192.168.59.242:3000/api/v1/class/subject/unit/${subjectId}/delete/${e.target.id}`).then((res)=>{
            console.log("response : ",res)
        }).catch((err)=>{
            console.log("error occured : ",err)
        })
    }


    function handleSubjectClick(e){
        setSubjectId(e.target.id);
        setSelectedSubjectDialog(true);
        setSelectedSubject(e.target.innerText);
        console.log(selectedSubjectDialog)
    }



    return(
        <>
        <div className="text-center text-xl font-mono text-gray-500 hidden max-sm:block mt-2">{selectedSubject}</div>
        {loading ? <CustomSpinner/> : <>
        <div className="flex justify-between p-8 max-sm:p-4">
            <div className={`w-1/4 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-200 rounded-md overflow-hidden max-sm:w-full max-sm:absolute max-sm:h-screen max-sm:bg-opacity-70 max-sm:${selectedSubjectDialog ? "block" : "hidden"} max-sm:left-0 max-sm:pt-20 max-sm:px-4 max-sm:text-sm max-sm:rounded-none`}>
            <div className="bg-teal-500 text-center p-2 text-white">className</div>
                <div className="p-4 flex flex-col gap-2">
                {location.search.split("=")[1]=='teacher' && <div>
                    <button className={`bg-gradient-to-r from-green-400 to-blue-500 hover:from-teal-500 hover:to-teal-500 w-full p-2 text-white`} onClick={()=>setTopPosition("0%")}>Add subject</button>
                </div>}
                <div className="flex flex-col gap-3">
                    {!subjectsData.length ? <div className="text-gray-500 font-mono text-xl m-auto">No Subjects Available</div> : <>
                    {subjectsData.map((subject,index)=><>
                        <button className={`${subjectId === subject._id ? "bg-teal-700" : "bg-teal-500"} w-full p-2 rounded-md text-white`} key={index} id={subject._id} onClick={(e)=>
                            handleSubjectClick(e)}>{subject.subjectName}</button></>
                    )}
                    </>}
                </div>
                </div>
            </div>
            <div className="w-3/4 px-4 max-sm:w-full max-sm:px-0 text-white">
                <div className="flex justify-between max-sm:grid max-sm:grid-cols-3 max-sm:gap-2">
                    <button className="bg-teal-500 rounded-lg py-2 px-4  max-sm:text-sm">Back</button>
                    <button className={`bg-teal-500  rounded-lg hidden max-sm:block px-4 py-2 max-sm:text-sm ${location.search.split("=")[1] == 'student' ? "col-span-2" : ""}`} onClick={(e)=>setSelectedSubjectDialog("0")}>Subjects</button>
                    {location.search.split("=")[1] === 'teacher' && <button className="bg-teal-500 rounded-lg py-2 px-4 max-sm:text-sm" onClick={(e)=>{
                        setPositionUnitData("0%");
                    }}>Add Unit</button>
                }
                </div>
                <div className="py-4 w-full flex flex-col gap-2">
                    {!unitData.length ? <div className="m-auto text-2xl text-gray-400">No Units Data Available</div> : <>
                {unitData.map((unit,index)=><>
                    <div className="bg-black p-2 w-full flex justify-between content-center rounded-md bg-opacity-5">
                    <div>
                        <div key={unit._id} className="max-sm:text-base text-black font-medium">{unit.title}</div>
                        <small key={index} className="text-gray-500">{unit.description}</small>
                    </div>
                    {
                    location.search.split("=")[1] == 'teacher' ? <div className="mt-auto flex gap-2">
                    <button className="rounded-md py-2 px-4 bg-teal-500 max-sm:text-sm">Edit</button>
                    <button className="rounded-lg py-2 px-4 bg-teal-500 max-sm:text-sm" id={unit._id} onClick={(e)=>{
                        HandleDeleteUnit(e);
                    }}>Delete</button>
                    </div> : <button className="rounded-md py-2 px-4 bg-teal-500 max-sm:text-sm">View</button>}
                </div>
                </>)}
                </>}
                </div>
            </div>
        </div>
         <AddSubject topPosition={topPosition} setTopPosition={setTopPosition}/>
         <AddUnit positionUnitData={positionUnitData} setPositionUnitData={setPositionUnitData} subjectId={subjectId}/>
         </>}
         </>
    )
}