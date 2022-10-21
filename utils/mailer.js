const nodemailer =  require('nodemailer'); 
// const mailConfig = require('../config/mail.config');

const sendMail = async (to,subject) => {
    try {
        let testAccount = await nodemailer.createTestAccount();
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
            text: 'You recieved message from '
        }
        return await transporter.sendMail(info);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendMail
}
