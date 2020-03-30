import * as fs from "fs";

class FileTool {
    public static readFile(path) {
        return new Promise(resolve => {
            fs.readFile(path, "utf-8", (err, data) => {
                if (err) {
                    resolve({
                        err
                    });
                }
                resolve({
                    data
                });
            });
        });
    }
    public static async readConf(path) {
        let data: any = await this.readFile(path);
        if (data.err) {
            return {
                err: data.err
            };
        }
        try {
            data = JSON.parse(data.data);
            return {
                data
            };
        } catch (error) {
            return {
                err: data.error
            };
        }
    }
    constructor() {}
}
export default FileTool;
