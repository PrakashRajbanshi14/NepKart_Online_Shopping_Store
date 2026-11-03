import nodemailer from 'nodemailer'
import { envConfig } from '../config/config'

interface IData {
    to: string,
    subject: string,
    text: string
}

const sendMail = async (data:IData)=> {
   const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : envConfig.companyEmail,
            pass: envConfig.companyEmailPass
        }
    })

    const mailOptions = {
        from : "Digital Store<Digitalstore12@gmail.copm>",
        to: data.to,
        subject : data.subject,
        text: data.text,
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error);
    }
}

export default sendMail