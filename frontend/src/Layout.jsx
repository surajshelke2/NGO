import { Outlet } from "react-router-dom"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
export default function Layout(){
    return(
        <div className="flex flex-col relative">
        <Header/>
        <Outlet/>
        <Footer/>
        </div>
    )
}