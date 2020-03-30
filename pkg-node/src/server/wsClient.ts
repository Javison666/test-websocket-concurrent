import app from "./express";
import * as uuidFn from "uuid";
import { getConf } from "../conf";

let clients = [];
// 页面ws服务
export const WsClient = {
    run: () => {
        app.ws("/client", (ws, req) => {
            console.log("client connect to server successful!");
            let uuid = uuidFn.v4();
            clients.push({
                uuid,
                ws
            });
            if(getConf().isRunning){
                ws.send(JSON.stringify({
                    type: "startTest",
                    data: {
                        gConf: getConf()
                    }
                }));
            }
            ws.on("message", msg => {
                try {
                    msg = JSON.parse(msg);
                    WsClient.handleMessage(msg, uuid);
                } catch (err) {
                    console.log("msg is not json");
                }
            });
            ws.on("close", () => {
                clients = clients.filter(client => client.uuid !== uuid);
            });
        });
    },
    getClientWsClients: () => {
        return clients.map(client => {
            return client.clientInfo;
        });
    },
    broadMsg: msg => {
        clients.forEach(client => {
            client.ws.send(JSON.stringify(msg));
        });
    },
    handleMessage: (msg, uuid) => {
        const len = clients.length;
        switch (msg.type) {
            case "clientInfo":
                for (let i = 0; i < len; i++) {
                    if (clients[i].uuid === uuid) {
                        clients[i].clientInfo = msg.data;
                        break;
                    }
                }
                break;
            case "heartTest":
                for (let i = 0; i < len; i++) {
                    if (clients[i].uuid === uuid) {
                        clients[i].testInfo = msg.data;
                        break;
                    }
                }
                break;
            default:
                break;
        }
    },
    getAllTestInfo: () => {
        let connectedNum = 0;
        clients.forEach(client => {
            if (client.testInfo) {
                connectedNum += client.testInfo.connectedNum;
            }
        });
        return {
            connectedNum,
        };
    },
    // 发出开始测试
    startTest: () => {
        WsClient.broadMsg({
            type: "startTest",
            data: {
                gConf: getConf()
            }
        });
    },
    // 发出开始测试
    stopTest: () => {
        WsClient.broadMsg({
            type: "stopTest"
        });
    }
};

export default WsClient;
