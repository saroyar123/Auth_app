const express=require("express")
const dotenv=require("dotenv");
const cors=require("cors")
const dbConnect = require("./config/dbConnect");
const userRouter=require("./Route/userRoute");
const app=express();
dotenv.config();
dbConnect();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1",userRouter);



app.get("/",(req,res)=>{
    res.status(200).json({
        success:true
    })
})

app.listen(process.env.PORT,()=>{
    console.log("server is running")
})