
import * as Ws from "ws";
import uuid from "./uuid";
import logWrite from "../utils/log"
import {
    getClientConf
} from "../client/clientConf"


const WebsocketObj: any = Ws;
let wsArr = [];
let cacheWsLen = 0;

let isRunning = false;

const sleep = num => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, num);
    });
};

process.on("uncaughtException", function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
    logWrite(err);
});

const logWsArr = () => {
    if ( cacheWsLen !== wsArr.length ) {
        cacheWsLen = wsArr.length;
        const logline = `[${new Date().toLocaleString()}] 连接数：${cacheWsLen}`;
        console.log(logline);
        logWrite(logline);
    }
};

const loopForever = () => {
    setTimeout(() => {
        logWsArr();
        loopForever();
    }, 1000);
};

loopForever();

export default class GameTest {
    public static getInfo() {
        return {
            connectedNum: wsArr.length,
        };
    }
    public static stopTest() {
        isRunning = false;
        wsArr.forEach(ws_item => {
            ws_item.ws.close();
        });
    }
    public static runTest() {
        this.stopTest();
        isRunning = true;
        wsArr = [];

        const openWs = (id) => {
            const ws = new WebsocketObj(getClientConf().ws);
            ws.onopen = e => {
                if (isRunning) {
                    wsArr = wsArr.filter(i => i.id !== id);
                    wsArr.push({
                        id,
                        ws
                    });
                }
            };
            ws.onmessage = (e: any) => {
                logWrite(e.data)
            };
            ws.on("close", () => {
                wsArr = wsArr.filter(i => i.id !== id);
                logWrite(`${id}:ws closed`)
            });
        };

        async function testConnect() {
            let maxClient = getClientConf().maxClient;
            // let wsUrl = res.wsUrl;
            for (let i = 0; i < maxClient; i++) {
                if (isRunning) {
                    await sleep(getClientConf().space);
                    try {
                        openWs(i);
                    } catch (err) {
                        logWrite(err);
                    }
                }
            }
        }
        testConnect();
    }
}
