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


module.exports = {
    CreateJsonResponse,
    GetErrorBody
};