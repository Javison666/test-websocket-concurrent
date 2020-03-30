// node服务配置
import ClientApp from "./client/client"
import { readConf } from "./conf"
import * as cluster from "cluster"
import * as os from "os";
const numCPUs = os.cpus().length;
console.log("cpus:"+numCPUs)

readConf().then(()=>{
    if(cluster.isMaster){
        for(let i = 0; i<numCPUs; i++){
            cluster.fork()
        }
        cluster.on('listening',function(worker,address){
            console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);
        });
    
        cluster.on('exit', function(worker, code, signal) {
            console.log('worker ' + worker.process.pid + ' died');
        });
    }else{
        ClientApp.run()
    }
})
