import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',

  title: 'vigie-waf-rust',
  description: '一个基于Rust的高性能Web应用防火墙',

  theme: defaultTheme({
    logo: '../../../assets/logo.png',

    navbar: ['/', '/get-started'],
  }),

  bundler: viteBundler(),
})
