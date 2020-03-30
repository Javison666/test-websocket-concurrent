import * as regedit from "regedit"

// 该方案不能用于pkg打包

const path1 = 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters'

let valuesToPut = {}
valuesToPut[path1] = {
    'MaxUserPort': {
        value: 65534,
        type: 'REG_QWORD'
    }
}

export default () => {
    return new Promise(resolve=>{
        regedit.list(path1, function(err, result) {
            if(err){
                return console.log(err)
            }
            if(!result[path1].values.MaxUserPort || result[path1].values.MaxUserPort.value !== 65534){
                // 可添加以及修改该值
                regedit.putValue(valuesToPut, function(err) {
                    if(err){
                        return console.log(err)
                    }
                    resolve()
                })
            }else{
                resolve()
            }
        })
    })
}
