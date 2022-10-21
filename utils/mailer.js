const nodemailer =  require('nodemailer'); 
// const mailConfig = require('../config/mail.config');

const sendMail = async (to,subject,text) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: 'tranminhthuyet1003@gmail.com', // generated ethereal user
                pass: 'ucwztmaomcnuircg', // generated ethereal password
            },
        });
        let info  = { // thiết lập đối tượng, nội dung gửi mail
            from: 'Tran Minh Thuyet',
            to: to,
            subject: subject,
            text: text
        }
        return await transporter.sendMail(info);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendMail
}
