import app from "./express"
import * as uuidFn from "uuid";

let clients = []
// 获取页面ws服务所有用户
export const getPageWsClients = () => {
    return clients
}
// 页面ws服务
export const WsPage = {
    run: () => {
        app.ws("/ws", (ws, req) => {
            console.log("page connect to server successful!");
            let uuid = uuidFn.v4();
            clients.push({
                uuid,
                ws
            });
            ws.on("message", msg => {
                try {
                    msg = JSON.parse(msg);
                } catch (err) {
                    console.log("msg is not json");
                }
            });
            ws.on("close", () => {
                clients = clients.filter(client => client.uuid !== uuid);
            });
        });
    }
}

export const broadMsg = (msg) => {
    clients.forEach(client => {
        client.ws.send(JSON.stringify(msg));
    });
}

export default WsPage