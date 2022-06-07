// 防抖
export const debounce = (fn, delay = 200) => {
    let timer = 0;
    return function (...args) {
        // 如果这个函数已经被触发了
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.call(this, ...args); // 透传 this和参数
            timer = 0;
        }, delay);
    };
};

// 节流
export const throttle = (fn, delay = 200) => {
    let timer = 0;
    return function (...args) {
        if (timer) {
            return;
        }
        timer.setTimeout(() => {
            fn.call(this, ...args); // 透传 this和参数
            timer = 0;
        }, delay);
    };
};

// 动态插入js
export const injectScript = (src) => {
    const s = document.createElement("script");
    s.type = "text/JavaScript";
    s.async = true;
    s.src = src;
    const t = document.getElentsByTagName("script")[0];
    t.parentNode.insertBefore(s, t);
};


// 下载资源
export const download = (url) => {
    var isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
    var isSafari = navigator.userAgent.toLowerCase().indexOf("safari") > -1;
    if (isChrome || isSafari) {
        var link = document.createElement("a");
        link.href = url;
        if (link.download !== undefined) {
            var fileName = url.substring(url.lastIndexOf("/") + 1, url.length);
            link.download = fileName;
        }
    }
    if (url.indexOf("?") === -1) {
        url += "?download";
    }
    window.open(url, "_self");
    return true;
};
