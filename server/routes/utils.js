class Utils {
    static formatDate(date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var result = dd + '/' + mm + '/' + yyyy
        return result;
    }
}

module.exports = utils;
