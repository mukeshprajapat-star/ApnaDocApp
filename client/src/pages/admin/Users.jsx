import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layouts'
import { Table, message } from 'antd';
import axios from 'axios';
const Users = () => {
    const [users,setUsers]=useState([])

    const getUser=async ()=>{
        try {
            const res=await axios.get("/api/v1/getallusers",
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            if(res.data.success){
                setUsers(res.data.data)
            }
            else{
                message.error(res.data.message)
            }
        } catch (error) {
            message.error(res.data.message)
            
        }
    }
    useEffect(() => {
        getUser();
    }, [])

    const columns=[
        {
            title:"Name",
            dataIndex:'name',
        },
        {
            title:"Email",
            dataIndex:'email'
        },
        {
            title:"Doctor",
            dataIndex:'isDoctor',
            render:(text,record)=>(
                <span>{record.isDoctor ? "Yes" : "No"}</span>
            )
        },
        {
            title:"Actions",
            dataIndex:'actions',
            render:(text,record)=>(
                <div className='d-flex'>
                    <button className='btn btn-danger'>Block</button>
                </div>
            )
        },
       
    ]
    
  return (
    <Layouts>
         <h1 className='text-center m-2'>Users List </h1>
         <Table columns={columns} dataSource={users}  />


    </Layouts>
   
  )
}

export default Users