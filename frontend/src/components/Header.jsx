import {Link} from 'react-router-dom'
import ClassNavBar from './navbars/ClassNavBar'
import img from '../img/logo.png'
export default function Header(){
    

    return <>
    <nav className="sm:px-6 lg:px-8 w-full px-18 py-2 sticky top-0 z-50 bg-white">
        <div className="flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <img src={img} className="h-20 p-1 w-21" alt="Logo" />
        </div>
        <div className="flex px-8 items-center justify-between shadow-lg h-20">
        <div className="flex gap-6">
            <button className="border-2 p-2 rounded-lg border-transparent text-white bg-orange-600"><Link to="/user/login/?role=student">Student</Link></button>
            <button className="border-2 p-2 rounded-lg border-transparent text-white bg-orange-600"><Link to="/user/login/?role=teacher">Teacher</Link></button>
        </div>
    </div>
        </div>
        </nav>
        </>
    
}