import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '工作燃料商户对接文档',
  description: '工作燃料系统第三方商户对接API文档',
  
  base: '/',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '接口文档', link: '/api/' }
    ],
    
    sidebar: [
      {
        text: '接口文档',
        items: [
          { text: '概述', link: '/api/' },
          { text: '身份认证', link: '/api/authentication' },
          { text: '发起消费请求', link: '/api/request-trade' },
          { text: '支付回调通知', link: '/api/callback' },
          { text: '错误码说明', link: '/api/error-codes' },
          { text: '注意事项', link: '/api/notes' }
        ]
      }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tomseanmy/workerfuel-api-docs' }
    ]
  }
})