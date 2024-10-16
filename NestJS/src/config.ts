export const config = {
  mysql: {
    // 数据库链接
    host: "localhost",
    // 数据库端口
    port: 3306,
    // 数据库账号
    username: "root",
    // 数据库密码
    password: "123456",
    // 数据库名称
    database: "zyct"
  },
  setting: {
    email: "2655906529@qq.com",
    password: "123456",
    // 文件前缀
    baseUrl: "http://localhost:3000",
    // 文件存储位置
    filePath: "uploadDefault",
  },
  jwt: {
    // token秘钥
    secret: "yang",
    // token到期时间
    expiresIn: "360d"
  }
};