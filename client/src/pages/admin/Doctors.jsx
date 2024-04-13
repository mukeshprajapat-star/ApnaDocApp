import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layouts'
import { Table, message } from 'antd';
import axios from 'axios';

const Doctors = () => {
    const [doctors,setDoctors]=useState([])

    const getDoctor=async ()=>{
        try {
            const res=await axios.get("/api/v1/getalldoctor",
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
   

    const handleAccountStatus=async (record,status) =>{
        try {
            const res=await axios.post("/api/v1/changeaccountstatus" ,{doctorId:record._id,userId:record.userId,status:status},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            });
            if(res.data.success){
                message.success(res.data.message)
                window.location.reload();
            }
        } catch (error) {
            message.error("Something Went Wrong")
            
        }
    }

    useEffect(() => {
        getDoctor();
    }, [])

    const columns=[
        {
            title:"Name",
            dataIndex:'name',
            render:(text,record)=>(
              <span>{record.firstName} {record.lastName}</span>
            )
        },
        {
            title:"Status",
            dataIndex:'status'
        },
        {
          title:"Phone",
          dataIndex:'phone'
      },
        {
            title:"Actions",
            dataIndex:'actions',
            render:(text,record)=>(
                <div className='d-flex'>
                    {record.status === 'pending' ? <button className='btn btn-success' onClick={()=>handleAccountStatus(record,'approved')} >Approved</button>:<button className='btn btn-danger'>Reject</button>}
                </div>
            )
        },
      
    ]
    return(
    
    <Layouts>
          <Table columns={columns} dataSource={doctors}  />



    </Layouts>
  )
}

export default Doctors