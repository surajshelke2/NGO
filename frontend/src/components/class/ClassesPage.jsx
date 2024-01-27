import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function ClassesPage(){
    const navigate = useNavigate()
    const location = useLocation()
    const [currentUrl,setCurrentUrl] = useState("");
    useEffect(()=>{
        setCurrentUrl(location.pathname + location.search);
    },[location])
    function HandleOnclick(e){
        navigate(currentUrl+`&class=${e.target.id}`);
    }
    return(
        <div className="p-8 grid grid-cols-5">
            <div className="bg-slate-600 m-auto w-60">
                1
                <button id = "first" onClick={(e)=>HandleOnclick(e)}>
                    explore
                </button>
            </div>
            <div className="bg-slate-600 m-auto w-60">1</div>
            <div className="bg-slate-600 m-auto w-60">1</div>
            <div className="bg-slate-600 m-auto w-60">1</div>
            <div className="bg-slate-600 m-auto w-60">1</div>
            <div className="bg-slate-600 m-auto w-60 my-3">1</div>
        </div>
    )
}