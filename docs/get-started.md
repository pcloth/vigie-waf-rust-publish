# 快速开始


## 下载和部署

### windows

1、下载[最新releases版本](https://github.com/pcloth/vigie-waf-rust/releases)

2、在项目根目录直接运行./bin/vigie-waf-rust.exe

### linux
1、下载[最新releases版本](https://github.com/pcloth/vigie-waf-rust/releases)

2、在项目根目录直接运行./bin/vigie-waf-rust

### docker运行(推荐)

由于vigie-waf是支持ota升级的，所以如果想使用ota升级，不要直接用容器内的项目运行。
推荐用宿主机映射代码目录的方式；

```sh
docker run -it -p 80:80 -p 443:443 \
  -v your_path:/app \
  pcloth/vigie-waf-rust:latest \
  -e ADMIN_USERNAME=admin \
  -e ADMIN_PASSWORD=admin123 \
  -e JWT_SECRET=298347sjfi#2212 \ 
  bash -c "export RUST_LOG=debug && /app/bin/vigie-waf-rust & while true; do echo hello world; sleep 60; done"
```
> 其中`& while true; do echo hello world; sleep 60; done`是为了让ota升级的时候容器不会停止而设立的，你如果想要手动升级，可以不需要这个
`ADMIN_USERNAME`、`ADMIN_PASSWORD`、`JWT_SECRET`三个参数一定要自己修改


## 如何开始

### 第一步

当运行好项目之后，直接在浏览器中访问http://localhost，会看到欢迎页面

![welcome](./assets/welcome.png)

### 第二步

点击进入后可以看到管理端登录页面
![login](./assets/login.png)

点击页面上`黄色的按钮`进行证书下载，然后输入你之前在环境变量中配置的账号和密码

> 默认账号为`admin`，密码为`admin123`

:::tip 为什么要下载证书？
因为防火墙的所有接口数据都进行了加密传输，提高安全性。
:::

## 如何配置

### 配置你的站点
![configSite](./assets/configSite.png)

配置站点域名支持`;`分割多个，一般来说推荐这样配置：
```txt
www.abc.com;
abc.com;
```

#### 配置https

- 建议开启https后开启强制调整https，这样所有的访问都会跳转给https端口了。
- 监听地址推荐填写：`0.0.0.0:443`
- 上游服务器如果还有https，并且证书是自签证书，建议跳过`上游证书校验`或者指定上游CA证书
- 手动管理证书的话，有字符串模式和文件模式两种

##### 自签证书
:::tip
我们强烈建立开启自动证书续签
:::

#### 配置头部和转发

- 建议开启保留`host头`和`设置X-Real-IP`以及`追加 X-Forwarded-For`，方便上游业务服务器采集用户的信息
- 如果防火墙部署在nginx之后，需要配置`可信ip来源`

## 配置防御
### 静态资源豁免
在站点设置页面，有`静态资源豁免`相关配置，路径配置支持`;`+换行分割
### POW防御
在站点设置页面，有`POW防御`相关配置，豁免路径配置支持`;`+换行分割，并可以定义pow会话有效期，建议不要超过86400，时间越长，消耗的服务器内存越多，也越不安全。太少又影响用户体验；一天或者半天的时间是比较合适的

### CC防御
在站点设置页面，有`CC防御`相关配置，可以配置每个ip的CC防御窗口时间和请求上限，超出的请求将会被拒绝

### IP黑名单
在左侧菜单`防御策略`里，可以找到`IP黑名单`功能，可以配置一些IP或者IP段到黑名单，并定义`过期时间`，不限制过期时间就是永久生效，黑名单里的请求来源将会被拒绝。

### IP白名单
在左侧菜单`防御策略`里，可以找到`IP白名单`功能，可以配置一些IP或者IP段到白名单，并定义`过期时间`，不限制过期时间就是永久生效，白名单里的请求来源将跳过后续的防御

### 爬虫管理
在左侧菜单`防御策略`里，可以找到`爬虫管理`功能：
这里可以看到近期访问的真实爬虫ip地址和常见爬虫的规则配置，默认启用所有的爬虫允许访问

- 你可以单独对某个爬虫进行限速管理；
- 也可以单独屏蔽某个爬虫

## 定义内置防御顺序和自定义防御
在左侧菜单`防御策略`里，可以找到`防御规则`功能：
在这里你可以看到内置的4个防御功能的脚本入口，你可以控制他们的排序和具体脚本内容。

也可以使用lua脚本自定义防御，一个防御脚本内容如下：
```lua
-- 4.2: 返回值说明：0=不拦截继续, 1=拦截阻断, -1=不拦截且跳过后续规则

function should_block()
    local req = request
    local user_agent = req.headers["user-agent"] or req.headers["User-Agent"] or ""
    if user_agent == "" then return 1 end

    local client_ip = req.client_ip or req.peer_ip or ""

    -- 直接交给 is_verified_crawler（内部已处理 UA 大小写与规则匹配）
    local value = is_verified_crawler(client_ip, user_agent, nil, 0)
    return value
end
```

## 访问日志
