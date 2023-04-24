const moment =  require('moment-timezone');
const date_utils_factory = () => {
    const createUTCDate = (date=moment().valueOf()) => {
        return moment(date).utc().toDate();
    }

    const dateDiff = (date1, date2, interval='seconds') => {
        const mom1 = moment(date1);
        const mom2 = moment(date2);
        const ans = mom2.diff(mom1, interval);
        return ans;

    }

    return Object.freeze({
        createUTCDate,
        dateDiff
    });
}

module.exports =  date_utils_factory;