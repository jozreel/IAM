const fs = require('fs');
const file_helpers = ()=> {
    const read_file = async (path) => {

            return new Promise((resolve, reject) => {
                const str = fs.createReadStream(path);
                
                str.on('open', () => {
                    resolve(str);
                });
                str.on('error', err => {
                    
                    reject(err);
                    return;
                    
                });
                });

    }

    return Object.freeze({
        read_file
    })
    
}

module.exports=  file_helpers;