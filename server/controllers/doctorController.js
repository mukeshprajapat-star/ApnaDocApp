import { User } from "../models/UserModel.js";
import { Appointment } from "../models/appointmentModel.js";
import { Doctor } from "../models/doctorModel.js";

export const getDoctorInfo = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erro While Fetching Doctor Details",
      error,
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      {
        userId: req.body.userId,
      },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Updated Issue",
      error,
    });
  }
};
export const getDoctorById=async (req,res) =>{
    try {
        const doctor=await Doctor.findOne({_id:req.body.doctorId});
        res.status(201).send({
            success:true,
            message:"single doctor info fetched",
            data:doctor
        })        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in single doctor info"
        })
        
    }

}
export const doctorAppointments=async (req,res)=>{
  try {
    const doctor=await Doctor.findOne({userId:req.body.userId});
    const appointments=await Appointment.find({
      doctorId:doctor._id
    })
    res.status(200).send({
      success:true,
      message:"Doctor Appointments fetch successfully",
      data:appointments
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Error in Doctor Appointments  '
    })
    
  }
}
export const updateStatus=async (req,res)=>{
  try {
    const {appointmentsId,status}=req.body;
    const appointments=await Appointment.findByIdAndUpdate(appointmentsId,{status})
    const user=await User.findOne({_id:appointments.userId});
    const notification= user.notification
    notification.push({
        type:'status-updated',
        message:`your appointments has been updated ${status}`,
        onClickPath:'/doctor-appointments'

    })
    await user.save();
    res.status(200).send({
      success:true,
      message:'Appointment Status Updated'
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message:"Error in Update Status"
    })
  }
}