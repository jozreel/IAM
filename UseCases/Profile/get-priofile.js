const GetProfile = ({logindb, userdb, appdb, verify_token}) => {
    return async (req) => {
        try {
            const {userid} =  req.params;
            
            const session_token = req.cookies.refresh_session_cookie;
            const tkdata =  verify_token(session_token);
            const sessionid =  tkdata.session;
            const user =  await userdb.get_user(userid);
            if(!user) {
                 throw new Error('Invalid user');
            }
            
            const session = await logindb.get_login(sessionid);
            if(!session) {
                throw new Error('invalid session');
            }

            const app =  await appdb.get_application(session.getAppID());
           
            if(!app) {
                throw new Error('Invalid app');
            }

         

            const scopes=  app.getConsents();
           
            
            
            const res =  {};
            for(let scp of scopes) {
                if(scp === 'email') {
                    res.email =  user.getEmail();
                } else if(scp === 'profile') {
                    res.name =  `${user.getFirstName()} ${user.getLastName()}`
                    res.firstname =  user.getFirstName(),
                    res.lastname =  user.getLastName(),
                    res.photo =  user.getPhoto(),
                    res.username = user.getUsername(),
                    res.lastmodifieddate =  user.getLastModifiedDate()
                } else if(scp === 'phone') {
                    res.telephone = user.getTelephone()
                }
            }
             
            return res;

        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports =  GetProfile;