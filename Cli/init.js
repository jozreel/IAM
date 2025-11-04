require('dotenv').config();
const { add_user } = require("../UseCases/User")

const CreateDefaultAdmin = () => {
    try {
        console.log(process.envDBURL);
    const userUc =  add_user({data: {
        "username": "admin",
        "password" : "P8ssw0rd!@",
        "email": "admin@kwapodev.com"
    }});
} catch(ex) {
    console.log(ex);
}
}


CreateDefaultAdmin();