const mailer = require('../utils/mailer');
const response = require('../utils/responseTemp');

const verifyEmail = async (req,res) => {
    try {
        const result = await mailer.sendMail('tranminhthuyet1002@gmail.com','test');
        console.log('result: ' + result);
    } catch (error) {
        console.log(error);
        res.status(500).json(response(error));
    }
}

module.exports = {
    verifyEmail
}
