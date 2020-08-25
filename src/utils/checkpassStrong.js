
export function checkStrong(sValue,accno) {
    var modes = 0;
    var hasFlag = false;
    var msgNum = 0
    //正则表达式验证符合要求的
    if (sValue.length < 1) return modes;
    if (/\d/.test(sValue)) modes++; //数字
    if (/[a-z]/.test(sValue)) modes++; //小写
    if (/[A-Z]/.test(sValue)) modes++; //大写
    if (/\W/.test(sValue)) modes++; //特殊字符
    if(sValue.length >=8 && sValue.length <=16 && sValue !== accno) msgNum = 1 // 8-16位 不能是相同的用户名

    if(sValue.indexOf(" ")>=0){
        //console.log('有空格');
        hasFlag = true
    }else{
        //console.log('没有空格');
        hasFlag = false
    }

    //console.log(modes, hasFlag);
    //逻辑处理
    return {
        modes,   // 处理是否 包含 字母 数字 特殊符合等多种情况
        hasFlag,  // 处理是否含有空格
        msgNum   // 处理是否满足数量要求
    };
}

