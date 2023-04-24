require('dotenv').config();
module.exports = {
    DBURL = process.env.DBURL,
    DBNAME =  process.env.DBNAME,
    APP_SECRET = process.env.APP_SECRET
};