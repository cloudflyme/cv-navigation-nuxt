import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: 'CV开发',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { 'http-equiv': 'Content-Security-Policy', content: "upgrade-insecure-requests" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'keywords', content: 'CV开发,CV,CV网站导航，CV网址导航,CV教程' },
      {
        name: 'description',
        content: '帮助前端人员和UI设计快速开发、学习的搜索页'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-39734fbc-b241-4d89-ad87-0befd655e266/a30fb47a-faca-47e6-bfb1-645eb15a02ef.ico' },
    ],
    script: [
      { src: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-39734fbc-b241-4d89-ad87-0befd655e266/9357ad4e-fa79-43df-a680-8a852d1b0447.js', charset: 'utf-8' }
    ]
  },
  vite: {},
  build: {}
})
