// 千位逗号分割
export const toThousands = (num) => {
    return num && num.toString()
        .replace(/\d+/, (s) => s.replace(/(\d)(?=(\d{3})+$)/g, '$1,'))
}
