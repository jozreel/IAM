require('dotenv').config();
  console.log(process.env.DBURL);
const { add_user } = require("../UseCases/User")
const {add_app} =  require('../UseCases/Application');
const {AddTenant} = require('../UseCases/Tenant');

const CreateDefaultAdmin = () => {
    try {
      
    const userUc =  add_user({data: {
        "username": "appadmin",
        "password" : "P8ssw0rd!@",
        "email": "admin@kwapodev.com",
        "firstname": "System",
        "lastname": "Admin"
    }, credentials: "bearer dsffdgd"});
} catch(ex) {
    console.log(ex);
}
}

const createTenant = async () => {
    const tenant_data =  {
        tenantname: 'KwapoDev'
    }

    await AddTenant({
        data: tenant_data
    });
}

const createApplication = async () => {
    try {
        let appdata = {
            applicationname: 'Kwapo Auth Admin',
            domain: "kwapodev.com"

        }
        await add_app({data: appdata});
    } catch(ex) {
        console.log(ex);
    }
}

(async () => { 

await createTenant();
await createApplication();
})()