require ('dotenv').config();
import { result } from 'lodash';
import nodemailer from 'nodemailer';


let sendSimpleEmail = async (dataSend) => {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
    let info = await transporter.sendMail({
    from: '"nhbthach" <nhbthach@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
}

let getBodyHTMLEmail = (dataSend) => {
  let result = ''
  if(dataSend.language === 'vi'){
    result = 
    `<h3> Xin chào ${dataSend.patientName}</h3>
    <h5> Bạn đã đặt lịch online trên MedicBooking  </h5>
    <div> <h5> Thông tin đặt lịch khám bệnh :  </h5></div>
    <div><h5> Thời gian : ${dataSend.time}</h5></div>
    <div><h5> Bác sĩ : ${dataSend.doctorName}</h5></div>
    <div> <h6> Để xác nhận thông tin đặt lịch, vui lòng nhấn vào link để xác nhận và hoản
    tất thủ tục đặt lịch khám bệnh. </h6></div>
    <div> <a href=${dataSend.redirectLink} target="_blank" > Click Here</a> </div>
    <div> Xin chân thành cảm ơn !</div>
    
    `
  }
  if(dataSend.language === 'en'){
    result = 
    `<h3> Dear ${dataSend.patientName}</h3>
    <h5> You have made an online appointment on the online MedicBooking  </h5>
    <div> <h5> Information to schedule an appointment:  </h5></div>
    <div><h5> Time : ${dataSend.time}</h5></div>
    <div><h5> Doctor : ${dataSend.doctorName}</h5></div>
    <div> <h6> To confirm booking information, please click on the link to confirm. </h6></div>
    <div> <a href=${dataSend.redirectLink} target="_blank" > Click Here</a> </div>
    <div> Sincerely thank ! </div>
    
    `
  }
  return result;
}

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = ''
  if(dataSend.language === 'vi'){
    result = 
    `<h3> Xin chào ${dataSend.patientName} ! </h3>
    <h5> Bạn đã đặt lịch online trên MedicBooking thành công  </h5>
    <div> <h5> Thông tin hoá đơn được gửi trong file đính kẻm : </h5></div>
    <div> Xin chân thành cảm ơn !</div>
    `
  }
  if(dataSend.language === 'en'){
    result = 
    `<h3> Dear ${dataSend.patientName} ! </h3>
    <h5> You have made an online appointment on the online MedicBooking  </h5>
    <p> ................................ </p>
    <div> Sincerely thank ! </div>
    `
  }
  return result;
}

let sendAttachment = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"nhbthach" <nhbthach@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Kết quả đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmailRemedy(dataSend),
    attachments: [{
      filename: `remedy-#${dataSend.patientId}-${new Date().getTime}.png`,
      content: dataSend.imgBase64.split("base64,")[1],
      encoding: 'base64'
    }
    ],
  });
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}