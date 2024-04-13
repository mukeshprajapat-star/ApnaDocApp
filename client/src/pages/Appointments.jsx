import React, { useEffect, useState } from 'react'
import Layouts from '../components/Layouts'
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment'

const Appointments = () => {
    const [appointments,setAppointments]=useState([]);
    const getAppointments=async ()=>{
        try {
            const res=await axios.get('/api/v1/user-appointments',{
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
    const columns=[
        {
            title:'ID',
            dataIndex:"_id"
        },
        {
            title:'Name',
            dataIndex:"name",
            render:(text,record)=>(
                <span>
                    {record.doctorId.firstName}{record.doctorId.lastName}
                </span>
            )
        },
        {
            title:'Phone',
            dataIndex:"phone",
            render:(text,record)=>(
                <span>
                    {record.doctorId.phone}
                </span>
            )
        },
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
    ]
  return (
    <Layouts>
         <h4 className='p-3 text-center'>Appointments Lists</h4>
         <Table columns={columns} dataSource={appointments} />
    </Layouts>
   
  )
}

export default Appointments