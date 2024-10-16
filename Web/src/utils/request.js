import axios from 'axios';
import { Message, Loading } from 'element-ui';
// 引入路由
import router from '../router/index';
import yangUtils from './yangUtils'

//开发环境
let devUrl = '/api';
let devWebSocketUrl = 'ws://127.0.0.1:8000'
// let devUrl = 'http://api.xjlyhj.com';
//生产环境
let proUrl = '/api';
let serverUrl = process.env.NODE_ENV === 'production' ? proUrl : devUrl
let serverWebSocket = process.env.NODE_ENV === 'production' ? proUrl : devWebSocketUrl
const service = axios.create({
    baseURL: serverUrl,
    timeout: 10000,
});
let loading;
// 添加请求拦截器
service.interceptors.request.use(
    async config => {
        // 加载开始
        loading = Loading.service({
            lock: true,
            text: '加载中…',
            background: 'rgba(0, 0, 0, 0.7)'
        })
        if (config.url != "/sysUser/login") {
            config.headers['Authorization'] = "Bearer " + localStorage.getItem("Authorization"); // 这里的token可以从localStorage或Vuex中获取
        }
        //写个正则 匹配后缀路由
        if (config.url == "/file" || /\/importExcel$/.test(config.url)) {
            config.headers['Content-Type'] = 'multipart/form-data'
            //    删除token
            //     config.headers['token'] = null;
        } else {
            config.headers['Content-Type'] = 'application/json'
        }
        // config.headers['Content-Type'] = 'multipart/form-data'
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        // 在请求发送之前做些什么
        //这里设置了就不用在代码设置了如果有多个就写多个文件
        return config;
    },
    error => {
        loading.close()
        Message.error('请求失败,请联系管理员!');
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

let responseTypeList = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'application/pdf', 'image/jpg']
// 添加响应拦截器
service.interceptors.response.use(
    response => {
        loading.close()
        const { data, status, config } = response;
        const { method, responseType, url } = config;
        // console.log(response.headers['content-type'])
        if (status === 200) {
            // if (response.headers['content-type'] == 'image/jpeg') return data
            if (data.code == 401) {
                //未登录跳转到login
                yangUtils.removeToken();
                router.push({ path: '/login' });
            }
            if (responseType === 'blob') {
                // if (responseTypeList.includes(response.headers['content-type'])) {
                //     let blob = new Blob([data], {type: responseType})
                //     return window.URL.createObjectURL(blob)
                // }
                return status === 200 ? response : errorHandle(601, "下载文件出错 : 状态码错误!");
            }
            if (data.code != 200) {
                // errorHandle(data.code,data.msg);
                Message.error(data.msg);
                throw data.msg;
            }
            // 对响应数据做些什么
            return data.data;
        } else {
            Message.error(data.msg);
            throw data.msg;
        }
    },
    error => {
        loading.close()
        // 对响应错误做些什么
        Message.error('响应失败,请联系管理员!');
        return Promise.reject(error);
    }
);
// 错误处理
const errorHandle = (status, errorMsg) => {
    loading.close()
    // 身份验证失败 重新登录
    if (status === 401) {
        Message.error(errorMsg || "身份验证失败！请重新登录！！");
        sessionStorage.clear();
        return window.top.location = "/#/login";
    }
    // 601 错误必须展示给用户看
    if (status != 200) Message.error(errorMsg)
    // 其他信息看需要,可以不显示
    throw errorMsg;
}

export default {
    service,
    serverUrl,
    serverWebSocket
}