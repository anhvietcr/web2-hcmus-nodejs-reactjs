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

    static dateParse(str) {
        if (typeof str === 'undefined') {
            return str;
        }
        if (str == null) {
            return null
        }
        var items = str.split("/");
        if (items < 3) {
            return null;
        }
        var dd = items[0];
        var mmm = items[1]; 
        var remain = items[2];
        var result = `${mmm}/${dd}/${remain}` 
        return Date.parse(result);
    }
}

module.exports = Utils;
