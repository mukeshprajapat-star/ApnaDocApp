import React, { useEffect, useState } from 'react'
import Layouts from '../components/Layouts'
import { useParams } from 'react-router-dom'
import { DatePicker, TimePicker, message, } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { showLoading,hideLoading } from '../redux/features/alertslice'

const BookingPage = () => {

  const {user} =useSelector(state=>state.user)
    const [doctors,setDoctors]=useState([])
    const params=useParams();
    const [date,setDate]=useState();
    const [time,setTime]=useState();
    const [isAvailable,setIsAvailable]=useState(false);
    const dispatch=useDispatch();
    const getAllDoctors=async ()=>{
     try {
      
      const res=await axios.post("/api/v1/getdoctorbyid" ,{doctorId:params.doctorId} ,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`}
      })
  
    if(res.data.success){
      setDoctors(res.data.data)
  
    }
  }
     catch (error) {
      console.log(error)
      
     }
    }
    const handleBooking =async ()=>{
      try {
        setIsAvailable(true)
        if(!time || !date)
        return alert("Date & Time Required")
        dispatch(showLoading())
        const res=await axios.post("/api/v1/book-appointment",{
          doctorId:params.doctorId,
          userId:user._id,
          doctorInfo:doctors,
          date:date,
          time:time,
          userInfo:user
        },
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        dispatch(hideLoading())
        if(res.data.success){
          setDoctors(res.data.data)
          message.success(res.data.message)
        }
        
      } catch (error) {
        dispatch(hideLoading())
        
      }
    }
    const handleAvailbility=async ()=>{
      try {
        dispatch(showLoading())
        const res=await axios.post('/api/v1/booking-availbility',{
          doctorId:params.doctorId,date,time
        },
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        dispatch(hideLoading());
        if(res.data.success){
          setIsAvailable(true);
          message.success(res.data.message)
        }
        else{
          message.error(res.data.message)
        }
        
      } catch (error) {
        dispatch(hideLoading());

        console.log(error)
        
      }
    }
    useEffect(() => {
      getAllDoctors()
    }, [])
    
  return (
    <Layouts>
        <h1>Booking Page</h1>
        <div className="container">
            {doctors && (
                <div>
                    <h4>
                        Dr. {doctors.firstName} {doctors.lastName} 
                    </h4>
                    <h4>
                        Fees :{doctors.feesPerConsultation}
                    </h4>
                    <h4>
                        {/* Timings :{doctors.timings[0]} - {doctors.timings[1]} */}



                        Timings : {doctors.timings && doctors.timings[0]} -{" "}
              {doctors.timings && doctors.timings[1]}{" "}
                    </h4>
                    <div className="d-flex flex-column w-50">
                        <DatePicker className='m-2' format="DD-MM-YYYY" onChange={(value)=>{
                        setDate(moment(value).format('DD-MM-YYYY'))
                        setIsAvailable(false);
                      } }
                        />
                        <TimePicker className='m-2' fromat="HH:mm" onChange={(value)=>{
                          setTime(moment(value).format("HH:mm"))
                            setIsAvailable(false)
                            }}
                            />
                        <button className='btn btn-primary mt-2' onClick={handleAvailbility}>Check Availability</button>
                        {!isAvailable && (
                        <button className='btn btn-dark mt-2' onClick={handleBooking}>Book Now</button>
                        )}

                    </div>
                </div>
            )}
        </div>

    </Layouts>
    
  )
}

export default BookingPage