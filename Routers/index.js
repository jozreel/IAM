module.exports = [
    {path: '/api/app', module: require('./application-router')},
    {path: '/api/user', module: require('./user-router')},
    {path: '/api/login', module: require('./login-router')},
    {path: '/api/auth', module: require('./auth-route')},
  //  {path: '/api/oauth', module: require('./oauth-router')},
    {path: '/api/authorize', module: require('./authorize-router')},
    {path: '/api/role', module: require('./role-router')},
    {path: '/api/access', module: require('./access-router')},
    {path: '/api/authorize', module: require('./authorize-router')},
    {path: '/api/token', module: require('./token-router')}
]