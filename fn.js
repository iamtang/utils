// 计算运行时间
const timeTaken = callback => {
    console.time('timeTaken');
    const r = callback();
    console.timeEnd('timeTaken');
    return r;
};

function compareVersion(v1, v2) {
    var s1 = v1.split(".").map(v => parseInt(v));
    var s2 = v2.split(".").map(v => parseInt(v));

    var len1 = s1.length, len2 = s2.length, commonLen = Math.min(len1, len2);
    for (var i = 0; i < commonLen; ++i) {
        if (s1[i] != s2[i])
            return s1[i] < s2[i] ? -1 : 1;
    }

    return len1 === len2 ? 0 : (len1 < len2 ? -1 : 1);
}