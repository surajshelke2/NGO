import { useNavigate } from "react-router-dom";

export default function ClassCard({classItem , role}){
    const navigate = useNavigate()
    function HandleExploreClick(e,role){
        e.preventDefault();
        console.log(role);
        navigate(`/user/class/${e.target.id}?role=${role}`);
    }
    return (
    <div>
    <div key={classItem.className} className="bg-black bg-opacity-10 rounded-lg flex-col content-between overflow-hidden">
    <div className="flex justify-between py-4 px-2 max-lg:flex-col-reverse">
    <div className="flex flex-col">
        <p className="text-2xl font-medium text-white max-lg:hidden">Class</p>
        <small>{classItem.classTeacher}</small>
    </div>
    <div className="font-black text-7xl max-xl:text-5xl text-white">{classItem.className}{classItem.classCode}</div>
    </div>
    <button className="py-1 rounded-md w-full text-white bg-teal-500" onClickCapture={(e)=>{
        HandleExploreClick(e,role);
    }} id={classItem._id}>Explore</button>
    </div>
    </div>)
}