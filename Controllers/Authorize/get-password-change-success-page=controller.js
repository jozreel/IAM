const { CreateJsonResponse, GetErrorBody } = require("../helpers");

const GetPasswordSuccessPageController = ({GetPasswordChangeSuccessPage})  =>{
    return  async (req) => {
        try {
            
        const res =  await GetPasswordChangeSuccessPage(req);
        return {
            type: 'page',
            body: res,
            statusCode: 200,
            clearcookies: [{name: 'passwordchangesessioncookie', options: {
                    path: '/'
                }}, {
                    name: 'sessionholdercookie',
                    options: {path: '/'}
            }]
        }
    } catch (ex) {
        CreateJsonResponse(({body: GetErrorBody(ex), statusCode: ex.name === 'RangeError'? 404: 400}))
    }

    }
}

module.exports =  GetPasswordSuccessPageController;