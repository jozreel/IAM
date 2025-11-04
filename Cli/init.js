require('dotenv').config();
  console.log(process.env.DBURL);
const { add_user } = require("../UseCases/User")

const CreateDefaultAdmin = () => {
    try {
      
    const userUc =  add_user({data: {
        "username": "admin",
        "password" : "P8ssw0rd!@",
        "email": "admin@kwapodev.com",
        "firstname": "System",
        "lastname": "Admin"
    }, credentials: "bearer dsffdgd"});
} catch(ex) {
    console.log(ex);
}
}


CreateDefaultAdmin();