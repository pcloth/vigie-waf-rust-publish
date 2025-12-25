import { CodeTabs } from "C:/codes/rust/waf-rust-publish/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.86_vuepress@2.0.0-rc.20/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "C:/codes/rust/waf-rust-publish/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.86_vuepress@2.0.0-rc.20/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "C:/codes/rust/waf-rust-publish/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.86_vuepress@2.0.0-rc.20/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
