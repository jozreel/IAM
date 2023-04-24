
const active_directory =  require('activedirectory');
const ad_utils = () =>{
    const ad_config = {
        url: `ldap://${process.env.DC}`,
        baseDN: `dc=${process.env.DOMAIN},dc=loc`,
        username: 'laurentj@liat.com',
        password: 'Inf200316!_'
    };
    const ad = new active_directory(ad_config);
    
    const find_user = async (data) => {
        try {
            console.log(data);
            return await new Promise((r , e) => {
                const sr =  ad.findUser(data, (err, user) => {
                    if(err) {
                        e(err);
                        return;
                    }
                    r(user);
                });
            });

        } catch (ex) {
            throw ex;
        }
    }

    const authenticate_user = async (data) => {
        try {
            return await new Promise((res, rej) => {
                ad.authenticate(data.email, data.password, (err, auth) => {
                    if(err) {
                        rej(err);
                        return;
                    }
                    res(auth);
                });
            });

        } catch(ex) {
            throw ex;
        }

    }
    return Object.freeze({
        find_user,
        authenticate_user
    });
}
module.exports =  ad_utils;



