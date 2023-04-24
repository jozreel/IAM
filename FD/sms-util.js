const twilio =  require('twilio');
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

}

module.exports = SmsUtil