import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AppProvider({Component}){
    const [token,setToken] = useState("");
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('token');
        setToken(token)
    },[])
    return <>
    {token ? <Component/> : navigate("/user/login"+location.search)}
    </>;
}