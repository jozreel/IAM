const get_profilepic_usecase = ({user_db, read_file}) => {

    return async id => {

    try {
        console.log('get profile pic');
        const user = await user_db.get_user(id, false);
        if(!user) {
            throw new Error('This user does not exist');
        }
        

        const path =  `${process.env.UPLOADPATH}/${user.photo.file}`;
        
        const rfile = await read_file(path);
        return {file: rfile, type: user.photo.type};


    } catch (Ex) {
        throw Ex;
    }

}

}

module.exports =  get_profilepic_usecase;