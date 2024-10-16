import request from "./request";

// 文件加载
function getFiles(url) {
    if (!url) {
        return "";
    }
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    } else {
        let token = localStorage.getItem("token")
        let arr = []
        url.split(",").forEach(v => {
            arr.push(`${request.serverUrl + v}?token=${token}`)
        })
        return arr;
    }
}

// 设置token
function setToken(token) {
    localStorage.setItem("token", token);
    // 设置多少秒后执行删除token
    setTimeout(() => {
        removeToken()
    }, 24 * 60 * 60 * 1000);
}

// 获取token
function getToken() {
    return localStorage.getItem("token")
}

// 删除token
function removeToken() {
    localStorage.removeItem("token")
}

// 设置用户信息
const setUserInfo = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data));
}

// 获取用户信息
const getUserInfo = () => {
    return JSON.parse(localStorage.getItem("userInfo"))
}

// 删除用户信息
const removeUserInfo = () => {
    localStorage.removeItem("userInfo")
}

// 设置用户角色
const setUserRole = (data) => {
    localStorage.setItem("userRole", data)
}

// 获取用户角色
const getUserRole = () => {
    return localStorage.getItem("userRole")
}

// 删除用户角色
const removeUserRole = () => {
    localStorage.removeItem("userRole")
}

// 设置用户权限
const setUserPermission = (data) => {
    localStorage.setItem("userPermission", data)
}
// 获取用户权限
const getUserrPermission = () => {
    return localStorage.getItem("userPermission")
}

// 删除用户权限
const removeUserPermission = () => {
    localStorage.remove("userPermission")
}

// 设置聊天信息
const setChatInfo = (data) => {
    localStorage.setItem("chatInfo", JSON.stringify(data))
}

// 获取聊天信息
const getChatInfo = () => {
    return JSON.parse(localStorage.getItem("chatInfo"))
}


function confirm(content, title = "平台提示") {
    return new Promise(resolve => {
        uni.showModal({
            title,
            content,
            success: res => res.confirm && resolve()
        });
    });
}

// 根据身份证号解析出来生肖
function getZodiac(idCard) {
    if (!idCard) {
        return "";
    }
    // 获取出生年份（假设idCard是18位）
    const year = parseInt(idCard.slice(6, 10));
    // 生肖列表，按照顺序
    const zodiac = [
        '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'
    ];

    // 计算生肖索引
    const baseYear = 1900; // 1900年是鼠年
    const zodiacIndex = (year - baseYear) % 12;
    return zodiac[zodiacIndex];
}

// 根据身份证号解析出来年龄
function getAge(idCard) {
    if (!idCard) {
        return "";
    }
    const year = idCard.substring(6, 10);
    const month = idCard.substring(10, 12);
    const day = idCard.substring(12, 14);
    const date = new Date(year + "-" + month + "-" + day);
    const now = new Date();
    const age = now.getFullYear() - date.getFullYear();
    return age;
}

// 根据出生年月日解析出来生肖
const getZodiacByBirthday = (birthday) => {
    // 年月日前面的年
    const year = parseInt(birthday.substring(0, 4));
    const baseYear = 1900; // 1900年是鼠年
    const zodiac = [
        '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'
    ];
    const zodiacIndex = (year - baseYear) % 12;
    return zodiac[zodiacIndex];
}

// 根据出生年月日解析出来年龄
const getAgeByBirthday = (birthday) => {
    const now = new Date();
    const data = new Date(birthday)
    const age = now.getFullYear() - data.getFullYear();
    return age;
}

// 把xxxxxxxx转换成xxxx-xx-xx
function formatDate(date) {
    if (!date) {
        return "";
    }
    return date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);
}

//导出excel
async function downloadFile(url, filename) {
    let response = await request.service.get(url, {responseType: 'blob'})
    if (response.data.size == 0) {
        Message.error("下载失败: 服务器出错!");
        return reject();
    }
    if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveOrOpenBlob(response.data, filename)
        return
    }
    const blobUrl = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = blobUrl
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(blobUrl)
}

export default {
    getFiles,
    setToken,
    getToken,
    removeToken,
    confirm,
    setUserInfo,
    getUserInfo,
    removeUserInfo,
    getZodiac,
    getAge,
    formatDate,
    downloadFile,
    getZodiacByBirthday,
    getAgeByBirthday,
    setChatInfo,
    getChatInfo,
    setUserPermission,
    getUserrPermission,
    removeUserPermission,
    setUserRole,
    getUserRole,
    removeUserRole,
}