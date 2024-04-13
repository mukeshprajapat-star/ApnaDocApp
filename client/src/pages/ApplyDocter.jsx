import React from 'react'
import Layouts from '../components/Layouts'
import { Button, Col, Form, Input, Row ,TimePicker, message} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/alertslice'
import axios from 'axios'
import moment from 'moment'

const ApplyDocter = () => {
    const {user}=useSelector(state=>state.user)
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleFinish=async (values)=>{
        try {
            dispatch(showLoading())
            const res=await axios.post('/api/v1/apply-doctor',{...values,userId:user._id,
                timings:[
                    moment(values.timings[0]).format('HH:mm'),
                    moment(values.timings[1]).format('HH:mm')
    
                ]},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            } )
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
                navigate('/')
            }
            else{
                message.error(res.data.success)
            }
            
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error("Something Went Wrong")
            
        }
        console.log(values)
    }
  return (
    <Layouts>
            <h1 className='text-center'>Apply Doctor</h1>
            <Form layout='vertical' onFinish={handleFinish} className='m-3'>
            <h4 className=''>Personal Details :</h4>
                <Row gutter={20} >
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="First Name" name="firstName" required rules={[{required:true}]}>
                            <Input type="text" placeholder="Enter Your FirstName" /> 
                            
                        </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Last Name" name="lastName" required rules={[{required:true}]}>
                            <Input type="text" placeholder="Enter Your LastName" /> 
                            
                        </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Phone No." name="phone" required rules={[{required:true}]}>
                            <Input type="text" placeholder="Enter Your Mobile No." /> 
                            
                        </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Email" name="email" required rules={[{required:true}]}>
                            <Input type="email" placeholder="Enter Your Email" /> 
                            
                        </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Website" name="website" >
                            <Input type="text" placeholder="Enter Your Website" /> 
                            
                        </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Address" name="address" required rules={[{required:true}]}>
                            <Input type="text" placeholder="Enter Your Address" /> 
                            
                        </Form.Item>
                    </Col>
                </Row>
                <h4 className=''>Professional Details :</h4>
                <Row gutter={20} >
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Specialization" name="specialization" required rules={[{required:true}]}>
                            <Input type="text" placeholder="Enter Your Specialization " /> 
                            
                        </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Experience" name="experience" required rules={[{required:true}]}>
                            <Input type="text" placeholder="Enter Your Experience" /> 
                            
                        </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Fees Per Consultation" name="feesPerConsultation" required rules={[{required:true}]}>
                            <Input type="text" placeholder="Enter Your Fees" /> 
                            
                        </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Timings" name="timings" required >
                         <TimePicker.RangePicker format="HH:mm" />
                            
                        </Form.Item>
                        </Col>
                </Row>
                <div className='d-flex justify-content-end'>
                    <Button htmlType='submit' type="primary">
                        Submit
                    </Button>
                </div>


            </Form>
    </Layouts>
  )
}

export default ApplyDocter