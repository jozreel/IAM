const make_user = require('../../Entities/User');
//const { config } = require('chai');
const add_user_use_case = ({user_db, ad_utils, sms_utils}) => {

    const add_ad_user = async (data) => {
        try {
           
           const exist =  await ad_utils.find_user(data.email);
           if(!exist) {
               throw new Error('The user was not found. Make sure the user is part of the DC');
           }
           data.email =  exist.mail.toLowerCase().trim();
           data.fullname =  `${exist.givenName} ${exist.sn}`
           const existlocal =  await user_db.find_by_email({email: data.email});
           console.log(existlocal);
           if(existlocal) {
               throw new Error('User with email already exist');
           }
           const user = make_user(data);
           user.setADUser();
          const result = await user_db.insert_user({
           email: user.getEmail(),
           fullname: user.getFullName(),
           photo: user.getPhoto(),
           createddate: user.getCreatedDate(),
           ADUser: user.isAdUser(),
           applications: user.getApplications(),
           lastmodifieddate: user.getLastModifiedDate(),
           status: user.getStatus(),
           telephone: user.getTelephone()
           })
           return result;

        } catch (ex) {
            throw ex;
        }
    }

    return async (data) => {
        try {
            if(data.cmd && data.cmd === 'AD') {
                const res =  await add_ad_user(data);
                return res;
            }
            data.email = data.email.toLowerCase();
            const exist = await user_db.find_by_email({email: data.email});
            if(exist) {
                throw new Error('A user with this email already exist');
            }
            const existuname =  await user_db.find_by_username({username: data.username});
            if(existuname) {
                throw new Error("A user with this username already exist");
            }
            const randcode = Math.floor(100000 + Math.random() * 900000);
            data.lastcode =  randcode;
            const user = make_user(data);
            user.createLastCodeCreatedTime();
            user.encryptPassword(user.getPassword());
            const result = await user_db.insert_user({
                email: user.getEmail(),
                username: user.getUsername(),
                firstname: user.getFirstName(),
                lastname: user.getLastName(),
                password: user.getPassword(),
                lastpasswords: user.getLastPasswords(),
                lastpasswordchangedate: user.getLastPasswordChangeDate(),
                photo: user.getPhoto(),
                createddate: user.getCreatedDate(),
                applications: user.getApplications(),
                lastmodifieddate: user.getLastModifiedDate(),
                telephone: user.getTelephone(),
                status: user.getStatus(),
                lastcode: user.getLastCode(),
                lastcodecreationtime: user.getLastCodeCreationTime()
            });
            if(data.mfa) {
            try {
                await sms_utils.SendSms(user.getTelephone(), `This message is comming from vepp. Your code is ${randcode}`)

            } catch (smserr) {
                console.log(smserr);
            }
           }

            return result;
           

        } catch (ex) {
            throw ex;
        }
    }
}
module.exports =  add_user_use_case;