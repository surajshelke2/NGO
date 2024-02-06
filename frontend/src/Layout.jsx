import { Outlet } from "react-router-dom"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
export default function Layout(){
    return(
        <div className="flex flex-col relative bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-200 overflow-x-hidden">
        <Header/>
        <Outlet/>
        <Footer/>
        </div>
    )
}