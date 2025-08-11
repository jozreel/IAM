const AddRoleController = ({add_role}) => {
     const headers = {"Content-Type": "application/json"};
    return async (req) => {
        try {
            const res =  await add_role(req);
            return {
                headers,
                body: res 
            }

        } catch(ex) {
            return {
                headers,
                statusCode: 400,
                body: {
                     message: ex.message
                }
            }
        }
    }
} 
module.exports = AddRoleController;