class Utils {
    static formatDate(date) {
        if (typeof date === 'undefined') {
            return date;
        }
        if (date == null) {
            return null
        }
        var dd = date.getDate();
        var mmm = date.getMonth() + 1; //January is 0!
        var hh = date.getHours();
        var mm = date.getMinutes();
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mmm < 10) {
            mmm = '0' + mmm;
        }
        var result = `${dd}/${mmm}/${yyyy} ${hh}:${mm}` 
        return result
    }
}

module.exports = Utils;
