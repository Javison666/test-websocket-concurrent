import app from "./express";
import { getConf, setConf, readConf } from "../conf";
import { broadMsg as WsPageBroadMsg } from "./wsPage";
import WsClient from "./wsClient";

export default {
    run: () => {
        setConf({
            isRunning: false
        });
        // 获取当前配置
        app.all("/api/getConf", (req, res) => {
            readConf().then(() => {
                res.send(getConf());
            });
        });

        // 获取游戏数据
        app.all("/api/getInfo", (req, res) => {
            res.send({
                ...WsClient.getAllTestInfo(),
                clientList: WsClient.getClientWsClients(),
            });
        });

        // 启动测试
        app.all("/api/runTest", (req, res) => {
            readConf().then(() => {
                setConf({
                    isRunning: true
                });
                WsClient.startTest();
                WsPageBroadMsg({
                    type: "updateConf",
                    data: getConf()
                });
                res.send({
                    code: 200
                });
            });
        });
        // 关闭测试
        app.all("/api/stopTest", (req, res) => {
            WsClient.stopTest();
            setConf({
                isRunning: false
            });
            WsPageBroadMsg({
                type: "updateConf",
                data: getConf()
            });
            res.send({
                code: 200
            });
        });
    }
};
