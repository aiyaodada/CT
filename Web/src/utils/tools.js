import {Message, MessageBox} from 'element-ui';

// type: success / info / warning / error
// 消息提示
export function message(type, message) {
    return Message({
        type: type || 'success',
        message: message,
    });
}

// 消息弹窗
export function confirm(title, message, type, center) {
    return MessageBox.confirm(message, title, {
        type: type || 'warning',
        center: center || true,
        confirmButtonText: '确认操作',
        cancelButtonText: '取消操作',
    });
}

// 消息弹窗提交内容
export function prompt(title, message, options) {
    return MessageBox.prompt(message, title, options)
}

// 睡眠
export function sleep(time = 0) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export default {
    message,
    confirm,
    prompt,
    sleep
}