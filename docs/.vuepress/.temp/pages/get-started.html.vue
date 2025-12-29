<template><div><h1 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始"><span>快速开始</span></a></h1>
<h2 id="下载和部署" tabindex="-1"><a class="header-anchor" href="#下载和部署"><span>下载和部署</span></a></h2>
<h3 id="windows" tabindex="-1"><a class="header-anchor" href="#windows"><span>windows</span></a></h3>
<p>1、下载<a href="https://github.com/pcloth/vigie-waf-rust/releases" target="_blank" rel="noopener noreferrer">最新releases版本</a></p>
<p>2、在项目根目录直接运行./bin/vigie-waf-rust.exe</p>
<h3 id="linux" tabindex="-1"><a class="header-anchor" href="#linux"><span>linux</span></a></h3>
<p>1、下载<a href="https://github.com/pcloth/vigie-waf-rust/releases" target="_blank" rel="noopener noreferrer">最新releases版本</a></p>
<p>2、在项目根目录直接运行./bin/vigie-waf-rust</p>
<h3 id="docker运行-推荐" tabindex="-1"><a class="header-anchor" href="#docker运行-推荐"><span>docker运行(推荐)</span></a></h3>
<p>由于vigie-waf是支持ota升级的，所以如果想使用ota升级，不要直接用容器内的项目运行。
推荐用宿主机映射代码目录的方式；</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token parameter variable">-p</span> <span class="token number">443</span>:443 <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> your_path:/app <span class="token punctuation">\</span></span>
<span class="line">  pcloth/vigie-waf-rust:latest <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">ADMIN_USERNAME</span><span class="token operator">=</span>admin <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">ADMIN_PASSWORD</span><span class="token operator">=</span>admin123 <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">JWT_SECRET</span><span class="token operator">=</span>298347sjfi<span class="token comment">#2212 \ </span></span>
<span class="line">  <span class="token function">bash</span> <span class="token parameter variable">-c</span> <span class="token string">"export RUST_LOG=debug &amp;&amp; /app/bin/vigie-waf-rust &amp; while true; do echo hello world; sleep 60; done"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>其中<code v-pre>&amp; while true; do echo hello world; sleep 60; done</code>是为了让ota升级的时候容器不会停止而设立的，你如果想要手动升级，可以不需要这个
<code v-pre>ADMIN_USERNAME</code>、<code v-pre>ADMIN_PASSWORD</code>、<code v-pre>JWT_SECRET</code>三个参数一定要自己修改</p>
</blockquote>
<h2 id="如何开始" tabindex="-1"><a class="header-anchor" href="#如何开始"><span>如何开始</span></a></h2>
<h3 id="第一步" tabindex="-1"><a class="header-anchor" href="#第一步"><span>第一步</span></a></h3>
<p>当运行好项目之后，直接在浏览器中访问http://localhost，会看到欢迎页面</p>
<p><img src="@source/assets/welcome.png" alt="welcome"></p>
<h3 id="第二步" tabindex="-1"><a class="header-anchor" href="#第二步"><span>第二步</span></a></h3>
<p>点击进入后可以看到管理端登录页面
<img src="@source/assets/login.png" alt="login"></p>
<p>点击页面上<code v-pre>黄色的按钮</code>进行证书下载，然后输入你之前在环境变量中配置的账号和密码</p>
<blockquote>
<p>默认账号为<code v-pre>admin</code>，密码为<code v-pre>admin123</code></p>
</blockquote>
<div class="hint-container tip">
<p class="hint-container-title">为什么要下载证书？</p>
<p>因为防火墙的所有接口数据都进行了加密传输，提高安全性。</p>
</div>
<h2 id="如何配置" tabindex="-1"><a class="header-anchor" href="#如何配置"><span>如何配置</span></a></h2>
<h3 id="配置你的站点" tabindex="-1"><a class="header-anchor" href="#配置你的站点"><span>配置你的站点</span></a></h3>
<p><img src="@source/assets/configSite.png" alt="configSite"></p>
<p>配置站点域名支持<code v-pre>;</code>分割多个，一般来说推荐这样配置：</p>
<div class="language-txt line-numbers-mode" data-highlighter="prismjs" data-ext="txt"><pre v-pre><code><span class="line">www.abc.com;</span>
<span class="line">abc.com;</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置https" tabindex="-1"><a class="header-anchor" href="#配置https"><span>配置https</span></a></h4>
<ul>
<li>建议开启https后开启强制调整https，这样所有的访问都会跳转给https端口了。</li>
<li>监听地址推荐填写：<code v-pre>0.0.0.0:443</code></li>
<li>上游服务器如果还有https，并且证书是自签证书，建议跳过<code v-pre>上游证书校验</code>或者指定上游CA证书</li>
<li>手动管理证书的话，有字符串模式和文件模式两种</li>
</ul>
<h5 id="自签证书" tabindex="-1"><a class="header-anchor" href="#自签证书"><span>自签证书</span></a></h5>
<div class="hint-container tip">
<p class="hint-container-title">Tips</p>
<p>我们强烈建立开启自动证书续签</p>
</div>
<h4 id="配置头部和转发" tabindex="-1"><a class="header-anchor" href="#配置头部和转发"><span>配置头部和转发</span></a></h4>
<ul>
<li>建议开启保留<code v-pre>host头</code>和<code v-pre>设置X-Real-IP</code>以及<code v-pre>追加 X-Forwarded-For</code>，方便上游业务服务器采集用户的信息</li>
<li>如果防火墙部署在nginx之后，需要配置<code v-pre>可信ip来源</code></li>
</ul>
<h2 id="配置防御" tabindex="-1"><a class="header-anchor" href="#配置防御"><span>配置防御</span></a></h2>
<h3 id="静态资源豁免" tabindex="-1"><a class="header-anchor" href="#静态资源豁免"><span>静态资源豁免</span></a></h3>
<p>在站点设置页面，有<code v-pre>静态资源豁免</code>相关配置，路径配置支持<code v-pre>;</code>+换行分割</p>
<h3 id="pow防御" tabindex="-1"><a class="header-anchor" href="#pow防御"><span>POW防御</span></a></h3>
<p>在站点设置页面，有<code v-pre>POW防御</code>相关配置，豁免路径配置支持<code v-pre>;</code>+换行分割，并可以定义pow会话有效期，建议不要超过86400，时间越长，消耗的服务器内存越多，也越不安全。太少又影响用户体验；一天或者半天的时间是比较合适的</p>
<h3 id="cc防御" tabindex="-1"><a class="header-anchor" href="#cc防御"><span>CC防御</span></a></h3>
<p>在站点设置页面，有<code v-pre>CC防御</code>相关配置，可以配置每个ip的CC防御窗口时间和请求上限，超出的请求将会被拒绝</p>
<h3 id="ip黑名单" tabindex="-1"><a class="header-anchor" href="#ip黑名单"><span>IP黑名单</span></a></h3>
<p>在左侧菜单<code v-pre>防御策略</code>里，可以找到<code v-pre>IP黑名单</code>功能，可以配置一些IP或者IP段到黑名单，并定义<code v-pre>过期时间</code>，不限制过期时间就是永久生效，黑名单里的请求来源将会被拒绝。</p>
<h3 id="ip白名单" tabindex="-1"><a class="header-anchor" href="#ip白名单"><span>IP白名单</span></a></h3>
<p>在左侧菜单<code v-pre>防御策略</code>里，可以找到<code v-pre>IP白名单</code>功能，可以配置一些IP或者IP段到白名单，并定义<code v-pre>过期时间</code>，不限制过期时间就是永久生效，白名单里的请求来源将跳过后续的防御</p>
<h3 id="爬虫管理" tabindex="-1"><a class="header-anchor" href="#爬虫管理"><span>爬虫管理</span></a></h3>
<p>在左侧菜单<code v-pre>防御策略</code>里，可以找到<code v-pre>爬虫管理</code>功能：
这里可以看到近期访问的真实爬虫ip地址和常见爬虫的规则配置，默认启用所有的爬虫允许访问</p>
<ul>
<li>你可以单独对某个爬虫进行限速管理；</li>
<li>也可以单独屏蔽某个爬虫</li>
</ul>
<h2 id="定义内置防御顺序和自定义防御" tabindex="-1"><a class="header-anchor" href="#定义内置防御顺序和自定义防御"><span>定义内置防御顺序和自定义防御</span></a></h2>
<p>在左侧菜单<code v-pre>防御策略</code>里，可以找到<code v-pre>防御规则</code>功能：
在这里你可以看到内置的4个防御功能的脚本入口，你可以控制他们的排序和具体脚本内容。</p>
<p>也可以使用lua脚本自定义防御，一个防御脚本内容如下：</p>
<div class="language-lua line-numbers-mode" data-highlighter="prismjs" data-ext="lua"><pre v-pre><code><span class="line"><span class="token comment">-- 4.2: 返回值说明：0=不拦截继续, 1=拦截阻断, -1=不拦截且跳过后续规则</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">should_block</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">local</span> req <span class="token operator">=</span> request</span>
<span class="line">    <span class="token keyword">local</span> user_agent <span class="token operator">=</span> req<span class="token punctuation">.</span>headers<span class="token punctuation">[</span><span class="token string">"user-agent"</span><span class="token punctuation">]</span> <span class="token keyword">or</span> req<span class="token punctuation">.</span>headers<span class="token punctuation">[</span><span class="token string">"User-Agent"</span><span class="token punctuation">]</span> <span class="token keyword">or</span> <span class="token string">""</span></span>
<span class="line">    <span class="token keyword">if</span> user_agent <span class="token operator">==</span> <span class="token string">""</span> <span class="token keyword">then</span> <span class="token keyword">return</span> <span class="token number">1</span> <span class="token keyword">end</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">local</span> client_ip <span class="token operator">=</span> req<span class="token punctuation">.</span>client_ip <span class="token keyword">or</span> req<span class="token punctuation">.</span>peer_ip <span class="token keyword">or</span> <span class="token string">""</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">-- 直接交给 is_verified_crawler（内部已处理 UA 大小写与规则匹配）</span></span>
<span class="line">    <span class="token keyword">local</span> value <span class="token operator">=</span> <span class="token function">is_verified_crawler</span><span class="token punctuation">(</span>client_ip<span class="token punctuation">,</span> user_agent<span class="token punctuation">,</span> <span class="token keyword">nil</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> value</span>
<span class="line"><span class="token keyword">end</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="访问日志" tabindex="-1"><a class="header-anchor" href="#访问日志"><span>访问日志</span></a></h2>
</div></template>


