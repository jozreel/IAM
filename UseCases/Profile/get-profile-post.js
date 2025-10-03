const GetProfilePost = ({userdb, logindb, appdb, hash_string}) => {
    return async (req) => {
        try {
            let {userid, sessionid} = req.data;
            
            const session_token = req.cookies.sessionid;
            console.log(session_token)
            //const tkdata =  verify_token(session_token);
           
            
            const user =  await userdb.get_user(userid);
            if(!user) {
                throw new Error('Invalid user');
            }
           
            const session =  await logindb.get_login(session_token);
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


        } catch(ex) {
            console.log(ex)
            throw ex;
        }
    }
}

module.exports =  GetProfilePost;