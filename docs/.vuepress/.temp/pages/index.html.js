import comp from "C:/codes/rust/waf-rust/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"首页\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"title\":\"首页\",\"heroImage\":\"./assets/logo.png\",\"actions\":[{\"text\":\"快速开始\",\"link\":\"/get-started.html\",\"type\":\"primary\"},{\"text\":\"文档\",\"link\":\"https://vuejs.press/guide/introduction.html\",\"type\":\"secondary\"}],\"features\":[{\"title\":\"快速轻量\",\"details\":\"依赖少，消耗低，能高速的防御恶意访问。\"},{\"title\":\"防御矩阵\",\"details\":\"内置防御矩阵，包含黑名单、白名单、CC防御、伪爬虫防御、POW工作量证明防御\"},{\"title\":\"高自定义\",\"details\":\"用户可修改矩阵内的防御顺序和细节，大部分防御功能都暴露入口给LUA脚本，方便用户进行个性化调节。\"},{\"title\":\"SSL证书自动续签\",\"details\":\"内置ACME+Let's Encrypt证书自动续签，无痛管理站点；甚至还内置了自签证书，方便内部站点管理；\"},{\"title\":\"静态资源豁免\",\"details\":\"可以配置一些静态资源路径进行防御豁免，避免浪费资源；也可以针对pow单独进行一些接口的豁免，比如支付回调接口；\"},{\"title\":\"兼容多层代理\",\"details\":\"对于小型的网站防御，可以替代nginx作为入口；对于大型站点和需要更复杂的前置代理的，可以部署到nginx等代理之后，配置好可信ip来源和X-Forwarded-For就可以正常使用了。\"}],\"footer\":\"GNU Licensed | Copyright © 2025-present qingruan.tech\"},\"headers\":[],\"git\":{},\"filePathRelative\":\"README.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
