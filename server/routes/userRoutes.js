import express from "express";
import {
  loginController,
  registerController,
  myProfile,
  applyDoctor,
  getNotification,
  deleteAllNotification,
  getAllDoctor,
  bookAppointment,
  bookingAvailbility,
  userAppointments,
} from "../controllers/userControllers.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.route("/login").post(loginController);
router.route("/register").post(registerController);
router.route("/me").post(isAuthenticated, myProfile);
//Apply Docter
router.route("/apply-doctor").post(isAuthenticated, applyDoctor);
router.route("/getallnotification").post(isAuthenticated, getNotification);
router
  .route("/deleteallnotification")
  .post(isAuthenticated, deleteAllNotification);

router.route("/getalldoctors").get(isAuthenticated, getAllDoctor);
router.route("/book-appointment").post(isAuthenticated, bookAppointment);
router.route("/booking-availbility").post(isAuthenticated, bookingAvailbility);
router.route("/user-appointments").get(isAuthenticated, userAppointments);


export default router;
