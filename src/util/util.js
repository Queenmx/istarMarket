export const centerTabs = () => {
    var tabs = document.getElementsByClassName("el-tabs__nav")[0]
    tabs.style.left = "50%"
    tabs.style.transform = "translateX(-50%)"
}
export const getItem = (name) => {
    if (!name) return
    return localStorage.getItem(name)
}
export const setItem = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        // console.log("setItem" + content)
        content = JSON.stringify(content)
    }
    localStorage.setItem(name, content)
}
export const delItem = (name) => {
    if (!name) return
    localStorage.removeItem(name)
}
export const phoneMask = (phone) => {
    return mask(phone, 3, 5)
}
export const mask = (string, startIndex, length) => {
    var subString = string.substr(startIndex, length)
    var maskStr = new Array(subString.length + 1).join("*")
    return string.replace(subString, maskStr)
}
export function formateTime(date, fmt) {
    // (x) 匹配 'x' 并且记住匹配项，就像下面的例子展示的那样。括号被称为 捕获括号。
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}
function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}
export function checkSys() {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return 'android'
    } else if (isiOS) {
        return "ios"
    } else {
        return "unknown"
    }
}