import React from 'react'
import Layouts from '../components/Layouts'
import { Button, Tabs, message, } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/alertslice'
import axios from 'axios'

const Notification = () => {
    const {user}=useSelector(state=>state.user)
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleMarkAllRead=async ()=>{
        try {
            dispatch(showLoading)
            const res=await axios.post("/api/v1/getallnotification ",{userId:user._id} ,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")} `
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                window.location.reload();
                message.success(res.data.message)
                
            }
            else{
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error("something Went Wrong")
            
        }

    }
    const handleDeleteAllRead=async()=>{
        try {
            dispatch(showLoading())
            const res=await axios.post("/api/v1/deleteallnotification" ,{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")} `
                }
            })
            dispatch(hideLoading())
            if(res.data.success){

                message.success(res.data.message)
            }
            else{
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            message.error("Something  Went Wrong In Notification")
            
        }

    }
  return (
   <Layouts>
    <h4 className='p-3 text-center'>Notification Page</h4>
    <Tabs>
        <Tabs.TabPane tab="Unread" key={0}  >
            <div className='d-flex justify-content-end'>
                <Button  type="primary" className='m-5' onClick={handleMarkAllRead} >
                    Mark All Read
                </Button>
            </div>
        {user?.notification.map((notificationMgs)=>(
                <div className='card' style={{cursor:"pointer"}}>
                <div className="card-text" onClick={()=>navigate(notificationMgs.onClickPath)}>
                    {notificationMgs.message}
                </div>
                </div>

            ))}

        </Tabs.TabPane>
        
        <Tabs.TabPane tab="Read" key={1} >
            <div className='d-flex justify-content-end'>
                <Button type="primary" className='m-5' onClick={handleDeleteAllRead} >
                    Delete All Read
                </Button>

            </div>
            {user?.seennotification.map((notificationMgs)=>(
                                <div className='card' style={{cursor:"pointer"}}>
                <div className="card-text" onClick={()=>navigate(notificationMgs.onClickPath)}>
                    {notificationMgs.message} 
                </div>
                </div>

            ))}

        </Tabs.TabPane>
    </Tabs>
   </Layouts>
  )
}

export default Notification