const CheckPasswordLinkUsecase = ({user_db, dateDiff}) => {
    return async (id, code) => {
        try {
            const exist = await user_db.get_user(id);
            if (!exist) {
                throw new RangeError('User does not exist');
            }
            console.log(exist.resetcode);
            if(!exist.resetcode || (code === exist.resetcode && dateDiff(exist.resetcodecreationtime, Date.now(), 'minutes') > 5)) {
                throw new Error('Invalid reset code');
            }
            return {
                valid: true,
                _id: exist._id
            }

        } catch (ex) {
            throw ex;
        }
    }
}

module.exports = CheckPasswordLinkUsecase;