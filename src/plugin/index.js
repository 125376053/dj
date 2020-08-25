exports.install = function (Vue, options) {

    Vue.prototype.setCookie=function(name,value,day){
        let date=new Date();//获取时间对象
        date.setDate(date.getDate()+day);//设置过期时间
        document.cookie=name+"="+value+";expires="+date;//设置cookie
    };
    Vue.prototype.getCookie=function(name){
        let arr=document.cookie.split('; ');
        for(let i=0;i<arr.length;i++){
            let arr2=arr[i].split('=');
            if(arr2[0]===name){
                return arr2[1];
            }
        }
        return '';
    };
    Vue.prototype.removeCookie=function(name){
        this.setCookie(name, '1', -1);
    };

    //倒计时不重置  ref visudom cookie value
    Vue.prototype.noResetTime=function(ref,cookieValue,initColor){
        let dom=this.$refs[ref].$el;//这样写的目的是防止传入的字符串获取不到元素 而不加引号又不存在变量
        let that=this;
        let count=this.getCookie(cookieValue)||60;
        dom.innerHTML=count+"s重新获取";
        //dom.setAttribute('disabled',true);
        dom.style.pointerEvents = 'none'
        dom.style.background="#ccc";
        dom.style.border="none";
        let resend = setInterval(function () {
            count--;
            if (count > 0) {
                dom.innerHTML=count+"s重新获取";
                //dom.setAttribute('disabled',true);
                dom.style.pointerEvents = 'none'
                dom.style.background="#ccc";
                dom.style.border="none";
                that.setCookie(cookieValue, count, (1 / 86400) * count);
            } else {
                clearInterval(resend);
                dom.innerHTML="获取验证码";
                //dom.removeAttribute('disabled');
                dom.style.pointerEvents = 'auto'
                dom.style.background=initColor;
                that.removeCookie(cookieValue);
            }
        }, 1000);
    }

    Vue.prototype.timeAgo=function(ago){
        var curDate = (new Date()).getTime();// 先获取当前时间
        var halfYear = ago * 24 * 3600 * 1000;//将半年的时间单位换算成毫秒
        var pastResult = (curDate - halfYear)/1000;  // 半年前的时间（毫秒单位）
        /*console.log('1年前是：' + timeAgo(365));
         console.log('半年前是：' + timeAgo(365/2));
         console.log('三个月前：' + timeAgo(365/2/2));
         console.log('1个月前：' + timeAgo(365/2/2/3));
         console.log(new Date(parseInt(timeAgo(365))*1000).toLocaleDateString())*/
        return pastResult;
    }
};
