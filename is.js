export const isEmail = (e) => {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(e)
}

export const isMobile = (e) => {
    return /^1[0-9]{10}$/.test(e)
}

export const isPhone = (e) =>{
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(e)
}

export const isURL = (e) => {
    return /^http[s]?:\/\/.*/.test(e)
}


export const isWeiXin = () =>{
    return ua.match(/microMessenger/i) == 'micromessenger'
}

export const isDeviceMobile =()=>{
    return /android|webos|iphone|ipod|balckberry/i.test(ua)
}