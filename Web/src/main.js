import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AuthPlugin from '@/utils/auth';
import tools  from './utils/tools';
Vue.config.productionTip = false

import request from '@/utils/request'
Vue.prototype.$request = request.service

import yangUtils from './utils/yangUtils.js'
Vue.prototype.$confirm = yangUtils.confirm;
Vue.prototype.$getFiles = yangUtils.getFiles;
Vue.prototype.$setUserInfo = yangUtils.setUserInfo;
Vue.prototype.$getUserInfo = yangUtils.getUserInfo;
Vue.prototype.$setToken = yangUtils.setToken;
Vue.prototype.$getToken = yangUtils.getToken;
Vue.prototype.$removeToken = yangUtils.removeToken;
Vue.prototype.$setUserPermission = yangUtils.setUserPermission;
Vue.prototype.$getUserPermission = yangUtils.getUserPermission;
Vue.prototype.$removeUserPermission = yangUtils.removeUserPermission;
Vue.prototype.$setUserRole = yangUtils.setUserRole;
Vue.prototype.$getUserRole = yangUtils.getUserRole;
Vue.prototype.$removeUserRole = yangUtils.removeUserRole;
Vue.prototype.$setChatInfo = yangUtils.setChatInfo;
Vue.prototype.$getChatInfo = yangUtils.getChatInfo;
Vue.use(VueAxios, axios)
Vue.use(ElementUI);
Vue.use(AuthPlugin); // 注册插件
Vue.prototype.$tools = tools;
// import websocketPlugin from './utils/websocketPlugin';
// 使用WebSocket插件
// Vue.use(websocketPlugin);
new Vue({
    el: '#app',
    router,
    render: h => h(App),
})

// window.webSocketMessage = []

Date.prototype.format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                      //日
        "h+": this.getHours(),                     //小时
        "m+": this.getMinutes(),                   //分
        "s+": this.getSeconds(),                   //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()                //毫秒
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

Vue.directive('hasPermi', {
    inserted(el, binding) {
        const permissions = binding.value; // 获取权限数组
        const userPermissions = sessionStorage.getItem('userInfo').split(",") || []; // 假设权限存储在 localStorage 中
        // 检查是否有权限
        const hasPermission = permissions.some(permission => userPermissions.includes(permission));
        console.log(hasPermission)
        if (!hasPermission) {
            el.parentNode && el.parentNode.removeChild(el); // 如果没有权限，移除元素
        }
    }
});
