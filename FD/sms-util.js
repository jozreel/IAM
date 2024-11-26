const twilio =  require('twilio');
const HttpCLient =  require('./http-client');
class SmsUtil {
     #accountsid = process.env.TWILIOSID;
     #secret = process.env.TWILIOTOKEN;
     #number = process.env.CONTACTNO;
     #client;
     constructor () {
        console.log(this.#accountsid, this.#number)
         this.#client =  new twilio(this.#accountsid, this.#secret)
     }
     async SendSms(to, message) {
    try {

        const smsMessage = await this.#client.messages.create(
            {
                body: message,
                from: `+${this.#number}`,
                to: `+${to}`
            }
        );
        return smsMessage;


    } catch (ex) {
        throw ex;
    }
   }


   async SendSmsLocal(to, message) {
    try {
        const {randomUUID} = await import('node:crypto')
        const id =  randomUUID()
        const msg = {
            id,
            message,
            phoneNumbers: ['+'+to],
            ttl: 36000
        }

        const url = process.env.SMS_GATEWAY_HOST;
        const usr = process.env.SMS_USER;
        const pass = process.env.SMS_PASS;
      
        await HttpCLient.HttpsRequest({host: url, path:'/sms/api/3rdparty/v1/message', port:443, headers: {
            'Content-Type': 'application/json',
             'Authorization': `Basic ${Buffer.from(usr+':'+pass).toString('base64')}`
            
        }, method: 'POST', reqdata: msg});
       

        return msg;

        

    } catch (ex) {
        throw ex;
    }
}

}

module.exports = SmsUtil