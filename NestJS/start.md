# sh

```shell
nest g resource uploadFile
```

```shell
# 查询当前使用的镜像源
pnpm get registry

# 设置为淘宝镜像源
pnpm config set registry https://registry.npmmirror.com/

# 还原为官方镜像源
pnpm config set registry https://registry.npmjs.org/

# 查询当前使用的镜像源
yarn config get registry

# 设置为淘宝镜像源
yarn config set registry https://registry.npmmirror.com/

# 还原为官方镜像源
yarn config set registry https://registry.yarnpkg.com/
```

### excel导入导出
* 服务器端生成复杂Excel文件：推荐使用 exceljs。它功能丰富，不仅适用于基本数据导出，也能处理复杂的表格需求。
* 简单的数据导出，无需复杂样式：推荐使用 xlsx。如果在浏览器端使用可结合 file-saver 一同使用。
* 需要在浏览器环境并且有样式需求：可以考虑 xlsx-style 配合 file-saver。
````shell
yarn add exceljs
````
````shell
yarn add xlsx
yarn add file-type
yarn add xlsx-style

yarn add @nestjs/serve-static
````

### Swagger-ui
* ApiTags() controller控制器名称
* ApiBearerAuth() token验证
* ApiOperation() 接口描述
* ApiParam() 动态参数接口参数 /user/:id 的 :id
* ApiQuery() 接口查询参数 /user?page=1&size=10 的page 和 size
* ApiProperty() 实体类
````shell
yarn add @nestjs/swagger swagger-ui-express
````


```javascript
JwtModuleOptions 是在使用 NestJS 框架中集成 JWT（JSON Web Tokens）时配置 JWT 模块的一个选项接口。NestJS 使用 @nestjs/jwt 模块来提供 JWT 支持，而 JwtModuleOptions 用于自定义 JWT 的行为和设置。

以下是对 JwtModuleOptions 中各个属性的解释：

    global (boolean)：如果设置为 true，则整个应用中的所有路由和控制器都将自动解析 JWT 并将用户信息添加到请求上下文中。这可以避免在每个控制器或路由上都需要手动处理 JWT 的情况。

    signOptions (jwt.SignOptions)：用于配置 JWT 签名时的选项，例如算法、过期时间等。

    secret (string | Buffer)：用于签名 JWT 的秘密密钥。JWT 必须使用一个密钥进行签名以确保其安全性和完整性。

    publicKey (string | Buffer)：用于公钥加密的密钥，当使用非对称密钥算法时会使用此选项。

    privateKey (jwt.Secret)：用于私钥加密的密钥，主要用于非对称密钥算法。

    secretOrPrivateKey (jwt.Secret)：可以替代 secret 和 privateKey 的选项，提供了一个更灵活的方式来自定义签名密钥。

    secretOrKeyProvider：这是一个函数，允许动态生成密钥或根据不同的请求类型和/或令牌内容来选择不同的密钥。

    verifyOptions (jwt.VerifyOptions)：用于配置 JWT 验证时的选项，如指定使用的验证算法、密钥等。

通过在你的 NestJS 应用程序中导入并配置 JwtModule，你可以利用这些选项来实现身份验证、授权和会话管理等功能。例如，你可以指定 JWT 的有效期、使用的密钥，以及是否全局启用 JWT 解析等。
```