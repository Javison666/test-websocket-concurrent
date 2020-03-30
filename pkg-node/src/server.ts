// node服务配置
import ServerApp from "./server/server"
import { readConf } from "./conf"

readConf().then((gConf: any)=>{
    ServerApp.run()
})
