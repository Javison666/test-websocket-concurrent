
import * as path from "path";
// 业务测试
import app from "./express"
import WsPage from "./wsPage"
import WsClient from "./wsClient"
import HttpPage from "./httpPage"
import {
    getConf
} from "../conf"

import {
    exec
} from "child_process"

export const ServerApp = {
    run: () => {
        // 注入页面ws服务
        WsPage.run()
        // 注入页面http服务
        HttpPage.run()
        // 注入客户端ws服务
        WsClient.run()

        app.get("/*", function(req, res) {
            res.sendFile(path.join(__dirname, "../page", "index.html"));
        });

        const server = app.listen(Number(getConf().port), function() {
            var port = server.address().port;
            const addr = `http://localhost:${port}`
            console.log(`浏览器请打开 ${addr}`);
            exec(`start ${addr}`)
        });
    }
}

export default ServerApp;
