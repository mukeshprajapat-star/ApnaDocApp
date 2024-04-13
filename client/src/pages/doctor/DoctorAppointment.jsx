import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table, message } from 'antd';
import Layouts from '../../components/Layouts';
import moment from 'moment'

const DoctorAppointment = () => {
    const [appointments,setAppointments]=useState([]);
    const getAppointments=async ()=>{
        try {
            const res=await axios.get('/api/v1/doctor-appointments',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setAppointments(res.data.data)
            }
        } catch (error) {
            console.log(error);

            
        }

    }
    useEffect(() => {
        getAppointments()
    
    }, [])
    const handleStatus=async (record,status)=>{
        try {
            const res=await axios.post('/api/v1/update-status',{
                appointmentsId:record._id,status
            },
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                message.success(res.data.message)
                getAppointments()
            }
            
        } catch (error) {
            console.log(error);
            message.error('Something Went Wrong')
            
        }
    }
    const columns=[
        {
            title:'ID',
            dataIndex:"_id"
        },
        // {
        //     title:'Name',
        //     dataIndex:"name",
        //     render:(text,record)=>(
        //         <span>
        //             {record.doctorId.firstName}{record.doctorId.lastName}
        //         </span>
        //     )
        // },
        // {
        //     title:'Phone',
        //     dataIndex:"phone",
        //     render:(text,record)=>(
        //         <span>
        //             {record.doctorId.phone}
        //         </span>
        //     )
        // },
        {
            title:'Date & Time',
            dataIndex:"date",
            render:(text,record)=>(
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                    {moment(record.time).format("HH:mm")}

                </span>
            )
        },
        {
            title:'Status',
            dataIndex:"status",
        },
        {
            title:'Actions',
            dataIndex:"actions",
            render:(text,record)=>(
                <div className="d-flex">
                    {record.status === "pending" && (
                        <div className="d-flex"> 
                        <button className='btn btn-success' onClick={()=>handleStatus(record,"approved")}>Approved</button>
                        <button className='btn btn-danger ms-2' onClick={()=>handleStatus(record,"reject")}>Reject</button>
                        </div>
                    )}
                </div>
                

            )
        },
    ]
  return (
    <Layouts>
        <h4 className='p-3 text-center'>Appointments Lists</h4>
         <Table columns={columns} dataSource={appointments} />
    </Layouts>
  )
}

export default DoctorAppointment