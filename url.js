// 获取URL参数
export const getUrlParam = (name, origin = null) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = null;
    if (origin == null) {
        r = window.location.search.substr(1).match(reg);
    } else {
        r = origin.substr(1).match(reg);
    }
    if (r != null) return decodeURIComponent(r[2]);
    return null;
};

// 修改url参数
export const changeURLArg = (arg, arg_val) => {
    const url = window.location.href;
    const pattern = arg + "=([^&]*)";
    const replaceText = arg + "=" + arg_val;
    if (url.match(pattern)) {
        let tmp = "/(" + arg + "=)([^&]*)/gi";
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match("[?]")) {
            return url + "&" + replaceText;
        } else {
            return url + "?" + replaceText;
        }
    }
};

// 删除url参数
export const funcUrlDel = (name) => {
    var loca =location;
    var baseUrl = loca.origin + loca.pathname + "?";
    var query = loca.search.substr(1);
    if (query.indexOf(name)>-1) {
        var obj = {};
        var arr = query.split("&");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
        }
        delete obj[name];
        var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
        return url
    }
}
