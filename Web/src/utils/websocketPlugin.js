// websocketPlugin.js
import request from "./request";
import yangUtils from "./yangUtils";

let ws = null;

const initWebSocket = (token, userId, receiverId, vm) => {
    ws = new WebSocket(`ws://127.0.0.1:8000/api/chat?token=${token}&senderId=${userId}&receiverId=${receiverId}`);

    ws.onopen = () => {
        console.log("链接成功");
    };

    ws.onmessage = (e) => {
        // console.log('收到消息:', e.data);
        // 触发 Vue 实例上的消息事件
        window.webSocketMessage.push(e.data)
        // vm.$emit('websocket-message', e.data);
    };

    ws.onerror = (error) => {
        console.log("发生错误", error);
    };

    ws.onclose = () => {
        console.log("断开连接");
    };
};

const websocketPlugin = {
    install(Vue) {
        Vue.prototype.$websocket = {
            init(receiverId = yangUtils.getUserInfo().id) {
                const token = yangUtils.getToken();
                const userId = yangUtils.getUserInfo().id;
                initWebSocket(token, userId, receiverId);
            },
            send(message) {
                if (ws && ws.readyState === WebSocket.OPEN) {
                    ws.send(message);
                } else {
                    console.error("WebSocket 未连接或已关闭");
                }
            },
            close() {
                if (ws) {
                    ws.close();
                }
            }
        };
    }
};

export default websocketPlugin;