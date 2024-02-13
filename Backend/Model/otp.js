const { Schema, default: mongoose } = require("mongoose");


const OtpSchema=new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

OtpSchema.methods.scheduleDeletion = function () {
    const oneMinute = 60 * 1000; // 1 minute in milliseconds
    setTimeout(() => {
        this.model('Otp').findByIdAndDelete(this._id)
            .then(() => console.log(`OTP ${this._id} deleted after 1 minute`))
            .catch(err => console.error(`Error deleting OTP: ${err}`));
    }, oneMinute);
};

module.exports=mongoose.model("Otp",OtpSchema)