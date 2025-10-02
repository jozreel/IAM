const CreateJsonResponse = ({body, statusCode=200} ={}) => {
    return {
        headers: {"Content-Type": "application/json"},
        body,
        statusCode
    }
};


const GetErrorBody = (ex) => {
    return {message: ex.message}
}

const GetErrorResponse = (err) => {
    return {
        headers: {"Content-Type": "application/json"},
        body: {message: err.message},
        statusCode: err instanceof RangeError ?  404 : 400
    }
}

const GetFullJsonResponse = (body, statusCode=200) => {
    return {
        headers: {"Content-Type": "application/json"},
        body,
        statusCode
    }
};


module.exports = {
    CreateJsonResponse,
    GetErrorBody,
    GetErrorResponse,
    GetFullJsonResponse
};