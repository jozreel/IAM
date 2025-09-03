//set ENV VARS.. USE ENV file
require('dotenv').config();
const routers =  require('./Routers');
const express = require('express');
const access_utils =  require('./FD').access_utils;
const app = express();
app.use(access_utils.cross_origin);
app.use(access_utils.app_api_auth_midleware);
app.use(access_utils.auth_midleware);
routers.forEach(route => app.use(route.path, route.module));

app.listen(3992);
console.log('APP is running on port 3992');

module.exports = app;
