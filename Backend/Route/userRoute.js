const {Router}=require("express");
const { createUser, logIn, sendOtp, validateOtp} = require("../Methods/userMethods");

const router=Router();
 router.route("/user").post(createUser)
 router.post("/login",logIn)
 router.post("/sendOtp",sendOtp)
 router.post("/verifyOtp",validateOtp)



 module.exports=router