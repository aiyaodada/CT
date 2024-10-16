// auth.js

// 存储 token 到 localStorage
export function setToken(token) {
    localStorage.setItem('Authorization', token);

    // 设置一个定时器，在 24 小时后删除 token
    setTimeout(() => {
        removeToken();
    }, 24 * 60 * 60 * 1000); // 24 小时的毫秒数
}

// 获取 token
export function getToken() {
    return localStorage.getItem('Authorization');
}

// 删除 token
export function removeToken() {
    localStorage.removeItem('Authorization');
}

// 插件定义
const AuthPlugin = {
    install(Vue) {
        // 将函数添加到 Vue 原型中，使其在每个 Vue 实例中可用
        Vue.prototype.$setToken = setToken;
        Vue.prototype.$getToken = getToken;
        Vue.prototype.$removeToken = removeToken;
    },
};

export default AuthPlugin;