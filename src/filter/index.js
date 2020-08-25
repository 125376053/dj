export let getDateFn=function(timeStamp){
    function add0(m){
        return m<10?'0'+m:m
    }
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(timeStamp*1000);
    //console.log(time)
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return add0(h)+':'+add0(mm);
};
// 第一个参数 是对什么过滤，后面参数是过滤器参数
// str | changeHanzi('1','2')
export let changeHanZi=function(str,p1,p2){
    console.log(str,p1,p2);
    if(str){
        var num1=str.split(',')[0];
        var num2=str.split(',')[1];
        console.log(num1,num2)

        var hanziArr=[
            '零','一','二','三','四','五','六','七','八','九',
        ]

        return p1+p2+'买'+hanziArr[num1]+'赠'+hanziArr[num2];
    }else{
        return '';
    }
}
