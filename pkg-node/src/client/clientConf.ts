// 默认配置
let gClientConf = {}

export const getClientConf = (): any => {
    return gClientConf
}

export const setClientConf = (obj) => {
    gClientConf = {
        ...gClientConf,
        ...obj
    }
}

export default gClientConf


