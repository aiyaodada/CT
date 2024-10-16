// date.util.ts
export class DateUtil {
    // 定义一个静态方法来格式化日期
    public static formatToMysqlDate(date: Date | string): string {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error('Invalid date input');
        }
        return date.toISOString().slice(0, 19).replace('T', ' '); // yyyy-MM-dd HH:mm:ss
    }

    static format(date: Date, format: string): string {
        let o = {
            "M+": date.getMonth() + 1,                 //月份
            "d+": date.getDate(),                      //日
            "h+": date.getHours(),                     //小时
            "m+": date.getMinutes(),                   //分
            "s+": date.getSeconds(),                   //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()                //毫秒
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (let k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k].toString()) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return format;
    }
}
function formatDateToMysql(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}