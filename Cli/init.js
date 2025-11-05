require('dotenv').config();
  console.log(process.env.DBURL);
const { add_user } = require("../UseCases/User")
const {add_app} =  require('../UseCases/Application');
const {AddTenant} = require('../UseCases/Tenant');

const CreateDefaultAdmin = (udata) => {
    try {
      const roles = [];
      for(let rl of udata.tenantroles) {
        roles.push({roleid: rl.id, type: 'tenant'});
      }
      for(let rl of udata.approled) {
        roles.push({roleid: rl.id, type: 'client'})
      }
    const userUc =  add_user({data: {
        username: "appadmin",
        password : "P8ssw0rd!@",
        email: "admin@kwapodev.com",
        firstname: "System",
        lastname: "Admin",
        roles

    }, credentials: "bearer dsffdgd"});
} catch(ex) {
    console.log(ex);
}
}

const createTenant = async () => {
    const tenant_data =  {
        tenantname: 'KwapoDev'
    }

    return await AddTenant({
        data: tenant_data
    });
}

const createApplication = async (data) => {
    try {
        let appdata = {
            applicationname: 'Kwapo Auth Admin',
            domain: "kwapodev.com",
            tenantid: '86391ac9-2d2c-43d0-bc71-fbca8958128b'

        }
       return await add_app(appdata);
    } catch(ex) {
        console.log(ex);
    }
}

(async () => { 

const ten = await createTenant();
 const app = await createApplication({tenantid: ten.id});
 const usr =  await CreateDefaultAdmin({tenantroles: ten.roles, approles: app.roles});
})()