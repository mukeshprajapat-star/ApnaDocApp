import React from 'react'
import {Button, Form, Input,message} from "antd" 
import "../styles/RegisterStyles.css"
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertslice'


const Register = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const onFinishHandler=async (values) =>{
        try {
            dispatch(showLoading())
            const res=await axios.post("/api/v1/register", values)
            dispatch(hideLoading())
            if(res.data.success){
                message.success("Register Successfully ")
                navigate("/login")
            }
            else{
                message.error(res.data.message)
            }
            
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error('Something Went Wrong')
            
        }
        console.log(values) 
    }
  return (
    <div className="form-container">
       
        <Form layout="vertical" onFinish={onFinishHandler} className='card p-5 ' style={{ width: 400 }} > 
        <h1 style={{textAlign:"center"}}>Register</h1>
        <Form.Item label="Name" name="name">
            <Input type="text" required placeholder="Enter Your Name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
            <Input type="Email" required placeholder="Enter Your Email"/>
        </Form.Item>
        <Form.Item label="Password" name="password">
            <Input type="password" required placeholder="Enter Your Password"/>
        </Form.Item>
        <Link to="/login" className='m-2'>Already user login here</Link>
        <Button type="primary" htmlType="submit">
            Register
        </Button>

        </Form>
    </div>
  )
}

export default Register