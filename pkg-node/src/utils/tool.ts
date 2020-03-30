import * as os from "os";

export default class Tool {
    // 跨平台获取本地ip列表
    public static getClientInfo() {
        const ifaces = os.networkInterfaces();
        let ipList = [];
        let macList = [];
        for (let dev in ifaces) {
            for (let i = 0; i < ifaces[dev].length; i++) {
                if (
                    !ifaces[dev][i].internal &&
                    ifaces[dev][i].family === "IPv4" &&
                    !ifaces[dev][i].address.includes("::") &&
                    ifaces[dev][i].address !== "127.0.0.1"
                ) {
                    ipList.push(ifaces[dev][i].address);
                    macList.push(ifaces[dev][i].mac)
                    // break;
                }
            }
        }
        return {
            mac:macList[0],
            ipList
        };
    }
    constructor() {}
}
