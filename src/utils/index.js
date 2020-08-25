/*域名或IP*/
export function check_ipDomian(ipDomian) {
    var strRegex = "^((https|http):\/\/)?"
        + "(((([0-9]|1[0-9]{2}|[1-9][0-9]|2[0-4][0-9]|25[0-5])[.]{1}){3}([0-9]|1[0-9]{2}|[1-9][0-9]|2[0-4][0-9]|25[0-5]))" // IP>形式的URL- 199.194.52.184
        + "|"
        + "([0-9a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D-]+[.]{1})+[a-zA-Z-]+)" // DOMAIN（域名）形式的URL
    var re = new RegExp(strRegex);
    if (!re.test(ipDomian)) {
        return false;
    } else {
        return true;
    }
    ;
}

/*IP*/
export function check_ip(ip) {
    var regIP = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (!regIP.test(ip)) {
        return false;
    } else {
        return true;
    }
    ;
}

// 检测输入的是否是域名 完整域名,二级域名,通配符域名,不支持http,https
export function check_domain(domain) {
    var reg = /^(?=^.{3,255}$)(\*|[a-zA-Z0-9][-a-zA-Z0-9]{0,62})(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
    var re = new RegExp(reg);
    if (!re.test(domain)) {
        return false;
    } else {
        return true;
    }
    ;
}
// 检测输入的是否为中文域名
export function check_domain2(domain) {
    var reg = /^(?=^.{3,255}$)([a-zA-Z0-9\u4E00-\u9FA5\uF900-\uFA2D][-a-zA-Z0-9\u4E00-\u9FA5\uF900-\uFA2D]{0,62})(\.[a-zA-Z0-9\u4E00-\u9FA5\uF900-\uFA2D][-a-zA-Z0-9\u4E00-\u9FA5\uF900-\uFA2D]{0,62})+$/
    var re = new RegExp(reg);
    if (!re.test(domain)) {
        return false;
    } else {
        return true;
    }
    ;
}

// 检测输入框输入的是否是数字
export function isNumber(value) {
    var patrn = /^(-)?\d+(\.\d+)?$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}
export function check_port(value) {
    // 0-65535
    var patrn = /^(-)?\d+(\.\d+)?$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else if(parseInt(value)<0 || parseInt(value)>65535){
        return false
    } else{
        return true
    }
}

/*
 var date=this.dataformat(new Date('Sep 6, 2019 2:51:25 PM').getTime(),"yyyy-MM-dd HH:mm:ss");
 console.log(date);
 * */
export function dataformat(time, format) {
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}

//取地址栏参数
export function getSearchString(key) {
    var url = decodeURIComponent(location.href)
    var str = url.split('?')[1];
    if(!str){return}
    //console.log('---------原始url-------'+str);
    if(str.search('&amp;')>0){
        str = str.replace(/&amp;/g, '&')
    }
    //console.log('----------替换后url---------'+str)
    // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
    var arr = str.split("&");
    var obj = new Object();

    // 将每一个数组元素以=分隔并赋给obj对象
    for (var i = 0; i < arr.length; i++) {
        var tmp_arr = arr[i].split("=");
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
    }
    return obj[key];
}

// 获取本地系统时间
export function getLocalDate() {
    var now = new Date()
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth();//得到月份
    var date = now.getDate();//得到日期
    var day = now.getDay();//得到周几
    var hour = now.getHours();//得到小时
    var minu = now.getMinutes();//得到分钟
    var sec = now.getSeconds();//得到秒
    var MS = now.getMilliseconds();//获取毫秒
    var week;
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    if (MS < 100) MS = "0" + MS;

    var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    week = arr_week[day];
    return{
        year:year,
        month:month,
        date:date,
        day:day,
        hour:hour,
        minu:minu,
        sec:sec,
        ms:MS,
        week:week
    }
}

// 判断数组内元素是否全相同
export function isAllEqual(array) {
    if (array.length > 0) {
        return !array.some(function (value, index) {
            return value !== array[0];
        });
    } else {
        return true;
    }
}

// 检测是否是移动设备访问
export function browserRedirect() {
    var sUserAgent= navigator.userAgent.toLowerCase();
    var bIsIpad= sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp= sUserAgent.match(/midp/i) == "midp";
    var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid= sUserAgent.match(/android/i) == "android";
    var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return true
    } else {
        return false
    }
}

