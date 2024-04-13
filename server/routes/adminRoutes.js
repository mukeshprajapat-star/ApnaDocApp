import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getAllDoctors, getAllUsers,changeAccountStatus } from "../controllers/adminControllers.js";

const router=express.Router();

router.route('/getallusers').get(isAuthenticated,getAllUsers);
router.route('/getalldoctor').get(isAuthenticated,getAllDoctors);
router.route('/changeaccountstatus').post(isAuthenticated,changeAccountStatus);


export default router;