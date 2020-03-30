import * as express from "express";
import * as expressWs from "express-ws";
import * as bodyParser from "body-parser";
import * as path from "path";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
expressWs(app);

app.on("ready", function() {
    console.log("进入页面了");
});

// 注意这里使用path.join(__dirname, 'dist')而不是'dist'
// 虽然在命令行中执行起来效果是一样的，不过pkg打包会无法识别到dist目录
app.use(express.static(path.join(__dirname, "../../page")));


export default app;
