export default function ClassCard({classItem}){
    return (
    <div>
    <div key={classItem.className} className="bg-slate-500 rounded-lg flex-col content-between overflow-hidden">
    <div className="flex justify-between py-4 px-2 max-lg:flex-col-reverse">
    <div className="flex flex-col">
        <p className="text-2xl font-medium text-white max-lg:hidden">Class</p>
        <small>{classItem.classTeacher}</small>
    </div>
    <div className="font-black text-7xl max-xl:text-5xl">{classItem.className}{classItem.classCode}</div>
    </div>
    <button className="bg-orange-400 py-1 rounded-md w-full text-white">Explore</button>
    </div>
    </div>)
}