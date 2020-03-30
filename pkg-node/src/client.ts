// node服务配置
import ClientApp from "./client/client"
import { readConf } from "./conf"
import regeditFn from "./utils/regedit_exec"

regeditFn().then(() => {
    console.log("可以进行6万并发测试")
    readConf().then(()=>{
        ClientApp.run()
    })
}).catch(err=>{
    console.log(err)
    readConf().then(()=>{
        ClientApp.run()
    })
})

