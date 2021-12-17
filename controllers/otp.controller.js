const express = require("express");
const User= require("../models/user.model");
const router= express.Router();
const transporter= require('../config/mail')


router.post("/email",async (req,res)=>{
    
    try {
        let check=req.body;
        const user=await User.find({email:Object.values(check)}).lean().exec();
        console.log(user)
        // console.log(req.body);
         if (user) {
         
            var otp = Math.random();
            otp = otp * 1000000;
            otp = parseInt(otp);
            // console.log(otp);
// send mail with defined transport object
var mailOptions = {
  to: Object.values(check),
  subject: "Otp for registration is: ",
  html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
};

 transporter.sendMail(mailOptions)
         }
         else {
             alert("user does not exist!")
         }
                return  res.status(201).json([otp]);
    }  catch (e) {
        return res.status(500).json({status: 'failed',message: e.message});
    }
})
router.get("/verify",async (req,res)=>{
    
    try {
        let otp=req.body;
        const user=await User.find({otp:Object.values(otp)}).lean().exec();
           if (user) {
            return  res.status(201).json({message:"Verified User"});
           }
         
             
    }  catch (e) {
        return res.status(500).json({status: 'failed',message: e.message});
    }
})
module.exports=router;