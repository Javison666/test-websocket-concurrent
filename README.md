# websocket分布式并发测试

程序目录 pkg-node/server.exe pkg-node/client.exe

配置文件 pkg-node/conf.json

websocket集群并发测试，单客户端win系统下，并发可达6万

server.exe同级目录放置文件conf.json
```
{
    "maxClient": 3000, // 单个客户端最大连接数 - 服务端需要 
    "space": 0, // 每次连接间隔ms - 服务端需要
    "ws": "ws://192.168.96.75:12102" // websocket测试并发地址 - 服务端需要
}
```

client.exe同级目录下需要放置配置文件conf.json
```
{
    "serverWsAddr": "ws://192.168.103.242:9091/client", //client.exe使用该参数连接服务端 地址格式"ws://{服务端ip}:{服务端配置文件设置的port}/client"
}
```


