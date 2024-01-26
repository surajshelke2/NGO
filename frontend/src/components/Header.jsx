import {Link} from 'react-router-dom'
export default function Header(){
    return <div className="h-14 flex px-8 bg-emerald-500 items-center justify-between">
        header
        <div className="flex gap-6">
            <button className="border-2 p-2 rounded-lg border-transparent text-white bg-emerald-600"><Link to="/user/login/?role=student">Student</Link></button>
            <button className="border-2 p-2 rounded-lg border-transparent text-white bg-emerald-600"><Link to="/user/login/?role=teacher">Teacher</Link></button>
        </div>
    </div>
}