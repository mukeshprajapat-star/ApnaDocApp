import React from 'react'
import Home from '../pages/Home'
import '../styles/LayoutStyles.css'
import {  adminMenu, userMenu } from '../Data/data'
import { Link ,useLocation, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Badge, message } from 'antd'


const Layouts = ({children}) => {
    const navigate=useNavigate()
    const {user} =useSelector(state=>state.user) 
    const location=useLocation()

    const handleLogout=()=>{
        localStorage.clear()
        message.success("Logout Successfully");
        navigate("/login")
    }
    
const  doctorMenu=[
    {
    name:"Home",
    path:"/",
    icon:"fa-solid fa-house"
},
{
    name:"Appointments",
    path:"/doctor-appointments",
    icon:"fa-solid fa-list"
},{
    name:"Profile",
    path:`/doctor/profile/${user?._id}`,
    icon:"fa-solid fa-user"
}]
const Sidebar=user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu: userMenu; 

  return (
    <div className="main">
        <div className="layout">
            <div className="sidebar">
                <div className="logo">
                    <h6>
                        DOCAPPSYS
                        </h6>
                </div>
                <hr/>
                <div className="menu">{Sidebar.map((menu)=>{
                    const isActive=location.pathname === menu.path
                    return(
                        <>
                        <div className={`menu-item ${isActive && 'active' }`}>
                            <i className={menu.icon}></i>
                            <Link to={menu.path}  key={menu.path}>
                                {menu.name}
                            </Link>
                        </div>
                        </>
                    )

                }

                )}
                 <div className={`menu-item`} onClick={handleLogout}>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            <Link to="/login">
                                Logout
                            </Link>
                        </div></div>
            </div>
            <div className="content">
                <div className="header">
                <div className="header-content" style={ {cursor:"pointer"}}>
                    <Badge count={user && user.notification.length} onClick={()=>{navigate("/notification")}}   >
                    <i className="fa-solid fa-bell" ></i>
                    </Badge>
               
                <Link  >
                {user?.name} </Link>
                </div>
                </div>
                <div className="body">{children} </div>
            </div>
        </div>
    </div>
  )
}

export default Layouts