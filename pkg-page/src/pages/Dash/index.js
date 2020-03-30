import React, { Component } from "react";
import {
    Button,
    Input,
    Row,
    Col,
    Divider,
    Statistic,
    Progress
} from "antd";
import "../../assets/css/Dash.css";
import $fn from "jj-browser-fn";

export default class Dash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            ws: "",
            maxClient: 0,
            space: 0,
            buttonLoading: false,
            connectedNum: 0,
        };
        this.getConf();
        this.listenWs();
        this.getInfo();
    }
    async getInfo() {
        const data = await $fn.httpPost({
            url: "/api/getInfo"
        });
        // console.log(data);
        this.setState(() => data);
        setTimeout(() => {
            this.getInfo();
        }, 600);
    }
    listenWs() {
        const ws = new WebSocket("ws://" + window.location.host + "/ws");
        // const ws = new WebSocket("ws://192.168.103.242:9089/ws")
        ws.onopen = () => {
            console.log("Test_ws connection success.");
        };
        ws.onmessage = event => {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case "updateConf":
                    this.setState(() => ({
                        ...data.data,
                        buttonLoading: false
                    }));
                    break;
                case "updateSwitchFire":
                    this.setState(() => ({
                        ...data.data
                    }));
                    break;
                default:
                    break;
            }
        };
        ws.onclose = function(evt) {
            console.log("Test_ws connection closed.");
        };
    }
    async getConf() {
        const data = await $fn.httpPost({
            url: "/api/getConf"
        });
        this.setState({
            ws: data.ws,
            maxClient: data.maxClient,
            space: data.space,
            isRunning: data.isRunning,
        });
    }
    async launch() {
        this.setState({
            buttonLoading: true
        });
        await $fn.httpPost({
            url: "/api/runTest",
            json: {
                // ws: this.state.ws,
                // maxClient: this.state.maxClient,
                // space: this.state.space,
                // switchFire: this.state.switchFire
            }
        });
        // this.setState({
        //     isRunning: true
        // });
    }
    async shutdown() {
        this.setState({
            buttonLoading: true
        });
        await $fn.httpPost({
            url: "/api/stopTest"
        });
    }
    handleChangeInput(event, type) {
        if (event && event.target && event.target.value) {
            let value = event.target.value;
            const obj = {};
            obj[type] = value;
            this.setState(() => obj);
        }
    }
    getPercent(num) {
        return (
            (num * 100) /
            (this.state.maxClient *
                (this.state.clientList ? this.state.clientList.length : 1))
        ).toFixed(2);
    }
    render() {
        const siteElements = [];
        if (this.state.clientList) {
            this.state.clientList.forEach(item => {
                siteElements.push(
                    <div key={item.mac}>
                        <p>
                            mac：{item.mac} - ip：{item.ipList.join(",")}
                        </p>
                        <hr />
                    </div>
                );
            });
        }

        const reqElements = [];
        const resElements = [];
        if (this.state.clientStatis) {
            if (this.state.clientStatis.req) {
                for (let typename in this.state.clientStatis.req) {
                    reqElements.push(
                        <div>
                            <span className="type-name">{typename}</span> :{" "}
                            {this.state.clientStatis.req[typename]}
                        </div>
                    );
                }
            }
            if (this.state.clientStatis.req) {
                for (let typename in this.state.clientStatis.res) {
                    resElements.push(
                        <div>
                            <span className="type-name">{typename}</span> :{" "}
                            {this.state.clientStatis.res[typename]}
                        </div>
                    );
                }
            }
        }

        return (
            <div className="dash-page">
                <h2>websocket连接数测试</h2>
                <Row gutter={16} align="middle">
                    <Col className="gutter-row" span={9}>
                        <Input
                            addonBefore="连接地址"
                            value={this.state.ws}
                            onChange={event =>
                                this.handleChangeInput(event, "ws")
                            }
                            disabled={true}
                        />
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <Input
                            addonBefore="单机连接数量"
                            value={this.state.maxClient}
                            placeholder="500"
                            disabled={true}
                            onChange={event =>
                                this.handleChangeInput(event, "maxClient")
                            }
                        />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Input
                            addonBefore="间隔时间(ms)"
                            value={this.state.space}
                            placeholder="0"
                            disabled={true}
                            onChange={event =>
                                this.handleChangeInput(event, "space")
                            }
                        />
                    </Col>
                    <Col className="gutter-row" span={4}>
                        {this.state.isRunning ? (
                            <Button
                                type="primary"
                                loading={this.state.buttonLoading}
                                onClick={() => this.shutdown()}
                                danger
                                block
                            >
                                停止
                            </Button>
                        ) : (
                            <Button
                                loading={this.state.buttonLoading}
                                type="primary"
                                onClick={() => this.launch()}
                                block
                            >
                                启动
                            </Button>
                        )}
                    </Col>
                </Row>
                <Divider />
                <div>
                    <span>
                        客户端总连接数 ：
                        {this.state.clientList
                            ? (Number(this.state.clientList.length) * Number(this.state.maxClient)) 
                            : 0}
                    </span>
                </div>
                <Divider />
                <div className="dash-body">
                    <Row
                        gutter={[16, 16]}
                        justify="space-around"
                        align="middle"
                    >
                        <Col span={10}>
                            <div>
                                <Statistic
                                    title="Connecting"
                                    value={this.state.connectedNum}
                                />
                                <Progress
                                    strokeColor={{
                                        "0%": "#87d068",
                                        "100%": "#87d068"
                                    }}
                                    trailColor="#096dd9"
                                    type="circle"
                                    percent={this.getPercent(
                                        this.state.connectedNum
                                    )}
                                    width={80}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
                <Divider />
                <div className="dash-log">
                    客户端数量 ：
                    {this.state.clientList ? this.state.clientList.length : 0}
                    {siteElements}
                </div>
            </div>
        );
    }
}
