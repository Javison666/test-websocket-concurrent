import FileTool from "./lib/fileTool"

// 默认配置
let gConf = {
    "port":"9089",
    "maxClient": 1000,
    "space": 1000,
    "ws": "ws://192.168.97.173:12002",
}

export const readConf = () => {
    return new Promise((resolve) => {
        FileTool.readConf("./conf.json").then(conf=>{
            if(conf.data){
                gConf = {
                    ...gConf,
                    ...conf.data
                }
                resolve(gConf)
            }
        });
    })
}

export const getConf = (): any => {
    return gConf
}

export const setConf = (obj) => {
    gConf = {
        ...gConf,
        ...obj
    }
}

export default gConf


