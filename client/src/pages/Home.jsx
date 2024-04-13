import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layouts from '../components/Layouts'
import { Row } from 'antd'
import DoctorList from '../components/DoctorList'

const Home = () => {
  const [doctors,setDoctors]=useState([])

  const getDoctor=async ()=>{
      try {
          const res=await axios.get("/api/v1/getalldoctors",
          {
              headers:{
                  Authorization:`Bearer ${localStorage.getItem("token")}`
              }
          })
          if(res.data.success){
              setDoctors(res.data.data)
          }
          else{
              message.error(res.data.message)
          }
      } catch (error) {
          message.error(res.data.message)
          
      }
  }


useEffect(() => {
  getDoctor()
  }, [])
  
  return (
    <Layouts>
          <h1 className='text-center'>Home</h1>
          <Row>
          {doctors && doctors.map((doctor)=>(
              <DoctorList doctor={doctor} />
              
            ))}

          </Row>

    </Layouts>
      )
}

export default Home