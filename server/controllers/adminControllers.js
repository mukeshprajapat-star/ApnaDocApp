import { User } from "../models/UserModel.js"
import { Doctor } from "../models/doctorModel.js";


export const getAllUsers=async (req,res)=>{
    try {
        const users=await User.find({});
        res.status(200).send({
            success:true,
            message:"users data",
            data:users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error while fetching users",
            error
        })
        
    }


}
export const getAllDoctors=async(req,res)=>{
    try {
        const doctors=await Doctor.find({});
        res.status(200).send({
            success:true,
            message:"users data",
            data:doctors
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error while fetching users",
            error
        })
        
    }


}
export const changeAccountStatus=async (req,res)=>{
    try {
        const {doctorId,status}=req.body;
        const doctor =await Doctor.findByIdAndUpdate(doctorId,{status});
        const user=await User.findOne({_id:doctor.userId});
        const notification=user.notification;
        notification.push({
            type:"doctor-account-request-updated",
            message:`Your Doctor Account Request Has ${status}`,
            onClickPath:"/notification"
        });
        user.isDoctor=status=== "approved" ? true :false
        await user.save();
        res.status(201).send({
            success:true,
            message:"Account Status Updated",
            data:doctor
        }) 
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in account status',
            error
        })
        
        
    }
}