module.exports = [
    {path: '/api/app', module: require('./application-router')},
    {path: '/api/user', module: require('./user-router')},
    {path: '/api/login', module: require('./login-router')},
    {path: '/api/auth', module: require('./auth-route')},
    {path: '/api/oauth', module: require('./oauth-router')},
    {path: '/api/authorize', module: require('./authorize-router')}


]