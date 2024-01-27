import {Link} from 'react-router-dom'
import ClassNavBar from './navbars/ClassNavBar'
export default function Header(){
    // return <div className="flex px-8 items-center justify-between shadow-lg h-20">
    //     header
    //     <div className="flex gap-6">
    //         <button className="border-2 p-2 rounded-lg border-transparent text-white bg-orange-600"><Link to="/user/login/?role=student">Student</Link></button>
    //         <button className="border-2 p-2 rounded-lg border-transparent text-white bg-orange-600"><Link to="/user/login/?role=teacher">Teacher</Link></button>
    //     </div>
    // </div>
    return <ClassNavBar/>
}