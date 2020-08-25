export const limit = function (el, binding, vnode) {
    // vnode.context = vue
    el.oninput = function () {
        // 先把自己的空格值去掉
        el.value = trim(el.value)
        let size = binding.value;
        let curSize = chekStrLen(trim(el.value)); //检测字符长度+去除空格后的长度计算
        let reSize = size - curSize;
        if (curSize > size) {
            el.nextElementSibling.innerHTML = "不允许输入太多字符";
            el.nextElementSibling.style.color = "red";
            el.value = el.value.substring(0, 140);
        } else {
            el.nextElementSibling.innerHTML = reSize;
            el.nextElementSibling.style.color = "green";
        }
    };
};

// 禁止输入空输入空格
export const trim1 = function (el, binding, vnode) {
    // vnode.context = vue
    var input = el.children[0]
    input.oninput = function () {
        input.value = trim(input.value)
    };
};

//检测字符长度
function chekStrLen(str) {
    var strlen = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) >= '0x4e00' && str.charCodeAt(i) <= '0X9fa5') {
            strlen += 3;
        } else {
            strlen++;
        }
    }
    return strlen;
}
//不允许输入空格
function trim(str) {
    var re = /(^\s*)|(\s*$)/g;
    str = str.replace(re, "");
    return str;
}

// 模拟权限数据
var authData = {
    routesAuth: ['user', 'userList'],
    pageAuth: {
        userList: {
            a4: false, a1: false, a2: false, a3: false
        },
        userDetail: {
            a1: true, a2: false, a3: true, a4: false
        }
    }
}
// 权限指令
export const auth = {
    bind: function (el, binding, vnode) {},
    inserted(el, binding, vnode){
        var name = binding.value.name
        var fn = binding.value.fn
        var code = binding.value.code
        var data = authData.pageAuth[name]
        console.log(data[code]);
        el.setAttribute('isShow', data[code])
        el.setAttribute('name', code)
        if (el.getAttribute('isShow') == 'false') {
            el.classList.add('notAuth')
        } else {
            el.classList.remove('notAuth')
        }
        el.onclick = () => {
            if (el.getAttribute('isShow') == 'true') {
                fn && fn()
            } else {
                alert('暂无权限')
            }
        }
    },
    componentUpdated(){},
    update: function () {},
    unbind: function () {}
}
