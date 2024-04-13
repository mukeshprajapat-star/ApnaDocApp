import express  from "express";
import { getDoctorInfo,updateProfile ,getDoctorById,doctorAppointments,updateStatus} from "../controllers/doctorController.js";
import { isAuthenticated } from "../middleware/auth.js";
const router=express.Router();

router.route('/getdoctorinfo').post(isAuthenticated,getDoctorInfo)
router.route('/updateprofile').post(isAuthenticated,updateProfile)
router.route('/getdoctorbyid').post(isAuthenticated,getDoctorById)
router.route('/doctor-appointments').get(isAuthenticated,doctorAppointments)
router.route('/update-status').post(isAuthenticated,updateStatus)






export default router;