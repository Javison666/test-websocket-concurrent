import {exec} from "child_process"

const path1 = 'HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters'

// let valuesToPut = {}
// valuesToPut[path1] = {
//     'MaxUserPort': {
//         value: 65534,
//         type: 'REG_QWORD'
//     }
// }
// const decodeReg = (stdout, path) => {
//     let keyArr = stdout.split("\r\n")
//     keyArr = keyArr.filter(i=>{
//         if(!i){
//             return false
//         }
//         if(i.indexOf(path)>-1){
//             return false;
//         }
//         return true;
//     })
//     console.log(keyArr)
// }

export default () => {
    return new Promise((resolve,reject)=>{
        exec(`REG ADD ${path1} /v MaxUserPort /t REG_QWORD /d 0xfffe /f`, (error,stdout,stderr) => {
            if(error){
                reject(error)
            }
            if(stderr){
                reject(stderr)
            }
            resolve()
        })
    })
}
