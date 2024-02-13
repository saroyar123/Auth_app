const nodemailer = require('nodemailer')

const mailSender = async (email, body)=>{
    try {
        // // to send email ->  firstly create a Transporter
        let transport= nodemailer.createTransport({
            host:process.env.MAIL_HOST,  //-> Host SMTP detail
                auth:{
                    user: process.env.MAIL_USER,  //-> User's mail for authentication
                    pass: process.env.MAIL_PASS,  //-> User's password for authentication
                }
        }) 

        // now Send e-mails to users
        let info = await transport.sendMail({
            from: 'yarsaro2001@gmail.com',
            to:`${email}`,
            subject: "OTP Verification",
            html: `${body}`,
        })
        return info

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = mailSender;