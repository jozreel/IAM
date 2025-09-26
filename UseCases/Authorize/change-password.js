const {authorize_helpers} =  require('../Helpers');
const ChangePassword = ({user_change_password, hash_string}) => {

    return async req => {
        try {
            console.log('CHANGING PASSWORD')
            const {sid, resetcode, password} =  req.data;

            const res =await user_change_password(sid, {resetcode, password});
            console.log(res.lastpasswordchangedate)
            return {
                type: 'redirect',
                data: {url: '/api/authorize/passwordchangemessage'},
                cookies: [
                    {name: 'passwordchangesessioncookie',
                    value: await hash_string(res.lastpasswordchangedate.toString()),
                    options: {
                        httpOnly: true, // This is the crucial part
                        secure: process.env.NODE_ENV === 'production', 
                        maxAge: Date.now() + (60 * 5 * 1000),
                        sameSite: 'Lax', 
                        path: '/' 
                       }
                    },
                    {name: 'sessionholdercookie',
                    value: authorize_helpers.encrypt_string(sid),
                    options: {
                        httpOnly: true, // This is the crucial part
                        secure: process.env.NODE_ENV === 'production', 
                        maxAge: Date.now() + (60 * 5 * 1000),
                        sameSite: 'Lax', 
                        path: '/' 
                       }
                    }
                ]
            }
            

        } catch (ex) {
            throw ex;
        }
    }
    
}

module.exports = ChangePassword;