const user = require("../Model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mailSender = require("../Utils/sendMails");
const OtpModel=require("../Model/otp")

function validateEmail(email) {
  const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return regex.test(email);
}

// create user account
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validateEmail(email)) throw new Error("Please give a valid mail");

    //   create user in the database
    const User = await user.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User created,Go to login",
    });
  } catch (error) {
    // handeling the error
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// user login method
exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await user.findOne({ email: email }).select("+password");

    if (!User) throw new Error("User not found");
    // console.log(User.password);

    const flag = await bcrypt.compare(password, User.password);
    // console.log(flag);
    if (!flag) throw new Error("wormg Password");

    const token = jwt.sign({ email: email }, process.env.jwtSecret);

    res.status(200).json({
      success: true,
      message: "YOu are login",
      token,
    });
  } catch (error) {
    // handeling the error
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// create a methods for send mail
exports.sendOtp = async(req, res) => {
  try {
    const {email} = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);

    const emailContent = `
      <html>
       <body>
        <p>Your OTP is <strong>${otp}</strong>. Valid for 2 minutes.</p>
       </body>
      </html>
     `;

  

   const mailDetails=await mailSender(email,emailContent);
   const newOtp=await OtpModel.create({email,otp});

   newOtp.save()
    .then(savedOtp => {
        console.log('OTP saved successfully');
        // Schedule deletion after 1 minute
        savedOtp.scheduleDeletion();
    })
    .catch(err => console.error('Error saving OTP:', err));

   res.status(200).json({
    success:true,
    message:"Email send successfully",
    data:mailDetails
   })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// method for the validate the otp

exports.validateOtp=async(req,res)=>{
  try {
    const {email,otp}=req.body;
    const validOtp=await OtpModel.findOne({email:email,otp:otp});
    if(!validOtp)
    throw new Error("Otp is not valid");
    
    res.status(200).json({
      success:true,
      message:"Otp verified",
      data:null
    })


  } catch (error) {
    res.status(400).json({
      success:false,
      message:error.message,
      data:null
    })
  }
}
