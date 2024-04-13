import { User } from "../models/UserModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Doctor } from "../models/doctorModel.js";
import { Appointment } from "../models/appointmentModel.js";
import moment from 'moment'

export const registerController=async (req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(200).send({success:false,message:"User Already Exist"})
        }
        const password=req.body.password;
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        req.body.password=hashedPassword;
        const newUser=new User(req.body)
        await newUser.save();
        res.status(201).send({success:true,message:"Register Successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:`Register Controllers ${error.message} `
        })
        
    }

}
export const loginController=async (req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        if(!user) return res.status(200).send({success:false,message:"User Not Found"});
        const isMatch=await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            return res.status(200).send({
                message:"Invalid Email or Password",success:false
            })
        }
        const token= jwt.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:"1d"
        })
        res.status(200).send({message:"Login Success",success:true,token})
        
    } catch (error) {

        console.log(error)
        res.status(500).send({
            message:`Error in Login CTRl ${error.message}`
        })
    }
    
}
export const myProfile=async (req,res)=>{
try {
    const user=await User.findById({_id:req.body.userId});
    user.password=undefined;
    if(!user) {
        return res.status(200).send({
        message:"User Not Found",
        success:false
    })
}else{
    res.status(200).send({
        success:true,
        data:user
    })
}

} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"auth error"
    })
}
}
export const applyDoctor=async (req,res) =>{
    try {
        const doctor=await Doctor({...req.body,status:'pending'})
        await doctor.save();
        const adminUser=await User.findOne({isAdmin:true});
        const notification=adminUser.notification
        notification.push({
            type:"apply-doctor-request",
            message:`${doctor.firstName} ${doctor.lastName} Has Applied For A Doctor Account`,
            data:{
                doctorId:doctor._id,
                name:doctor.firstName + "  " + doctor.lastName ,
                onClickPath:'/admin/doctors'
            }
        })
        await User.findByIdAndUpdate(adminUser._id,{notification})
        res.status(201).send({
            success:true,
            message:"Doctor Account  Applied Successfully"
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error While Applying For Doctor"
        })
        
    }

}

export const getNotification=async (req,res)=>{
    try {
        const user=await User.findOne({_id:req.body.userId});
        const seennotification=user.seennotification;
        const notification=user.notification;
        
        seennotification.push(...notification)
        user.notification=[];
        user.seennotification=notification;

        const updatedUser=await user.save();
        res.status(200).send({
            success:true,
            message:'All  notification marked as read',
            data:updatedUser
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error In Notification",
            error,

        })
        
    }

}

export const deleteAllNotification=async (req,res)=>{
    try {
        const user=await User.findOne({_id:req.body.userId});
        user.notification=[];
        user.seennotification=[];
        const updatedUser=await user.save();
        updatedUser.password=undefined;
        res.status(200).send({
            success:true,
            message:"Notification Deleted Successfully",
            data:updatedUser
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"unable to delete all notifications",
            error
        })

        
    }

}
export const getAllDoctor=async (req,res)=>{
    try {
        const doctors=await Doctor.find({status:"approved"});
        res.status(200).send({
            success:true,
            message:"Doctors List Fetched Successfully",
            data:doctors

        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error While Fetching Doctor",
            error
        })
        
    }

}
export const bookAppointment=async(req,res)=>{
    try {
        req.body.date=moment(req.body.date,"DD-MM-YYYY").toISOString();
        req.body.time=moment(req.body.time,"HH:mm" ).toISOString();
        req.body.status="pending";
        const newAppointment=new Appointment(req.body)
        await newAppointment.save();
        const user=await User.findOne({_id:req.body.doctorInfo.userId});
        user.notification.push({
            type:'New-Appointment-Request',
            message:` A New Appointment Request from ${req.body.userInfo.name}`,
            onClickPath:'/user/appointments'

        })
        await user.save();
        res.status(200).send({
            success:true,
            message:"Appointment Book Successfully"
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error While Booking Appointment"
        })
        
    }
}
export const bookingAvailbility=async (req,res)=>{
    try {
        const date=moment(req.body.date,'DD-MM-YYYY').toISOString();
        const fromTime=moment(req.body.time,'HH:mm').subtract(1,'hours').toISOString();
        const toTime=moment(req.body.time,'HH:mm').add(1,'hours').toISOString();

        const doctorId=req.body.doctorId
        const appointments =await Appointment.find({
            doctorId,date,time:{
                $gte:fromTime,
                $lte:toTime
            }
        })
        if(appointments.length > 0){
            return res.status(200).send({
                message:'Appointments not available at this time',
                success:true
            })
        }
            else{
                return res.status(200).send({
                    success:true,
                    message:'Appointments Available '
                })
            
        }
    

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error In Booking",
            error
        })
    }
        
}
export const userAppointments=async(req,res)=>{
    try {
        const appointments=await Appointment.find({userId:req.body.userId})
        res.status(200).send({
            success:true,
            message:'Users Appointments Fetch Successfully',
            data:appointments
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In User Appointments",
            error
        })
        
    }
}