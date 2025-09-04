const nodemailer =  require('nodemailer')
const SendEmail = async (mail) => {
    try {
        const sendmailoptions = {
            sendmail: true,
            path: '/usr/sbin/sendmail',
            newline: 'unix'
        }

        const transport = nodemailer.createTransport(sendmailoptions);
        return await transport.sendMail(mail);
    } catch (ex) {
        throw ex;
    }
}

module.exports = Object.freeze({
    SendEmail
})
