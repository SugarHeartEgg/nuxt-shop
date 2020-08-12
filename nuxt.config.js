
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },

      // 默认的meta
      // { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // 禁止用户缩放屏幕
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      // 禁止用户调起电话
      { name: 'format-detection', content: 'telephone=no' },
      // vant 底部安全区适配 Doc:https://youzan.github.io/vant/#/zh-CN/quickstart#di-bu-an-quan-qu-gua-pei
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
      },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      // px 转 rem 所需的静态js
      {
        src: '/flexible.js',
        type: 'text/javascript',
        charset: 'utf-8'
      },
      // 浏览器端,阻止用户, 双击 | 双指放大
      {
        src: '/userPageNo.js',
        type: 'text/javascript',
        charset: 'utf-8'
      },
      // symbol iconfont icon
      {
        src: '/candeeIconfont.js',
        type: 'text/javascript',
        charset: 'utf-8'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: false,
  /*
  ** Global CSS
  */
  css: [
    // iconfont 
    '~/assets/css/candeeIcon.css',
    // 项目里要用的 CSS 文件
    '~/assets/css/main.css',
    // 项目里要使用的 SCSS 文件
    '~/assets/css/main.scss'
  ],

  /**
   * Doc: https://zh.nuxtjs.org/api/pages-watchquery/
   * 监听参数字符串更改并在更改时执行组件方法
  */
  watchQuery: true,

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/axios',
    '~plugins/vant',
    '~plugins/filter'
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',

    // '@nuxtjs/proxy',  // 添加proxy模块

    // Simple usage
    // Doc: https://www.npmjs.com/package/cookie-universal-nuxt
    'cookie-universal-nuxt',

    // Doc: https://nuxt-community.github.io/nuxt-i18n/setup.html
    'nuxt-i18n'
  ],

  /*
   ** i18n config
   *  新建国际话语言，需要在locales，添加对应的code、iso、name
   *  并导入转义语言json文件到message。
   */
  i18n: {
    seo: true,
    locales: [
      {
        code: 'en',
        iso: 'en-AU',
        name: 'English'
      },
      {
        code: 'zh',
        iso: 'zh-ZH',
        name: '简体中文'
      }
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./locales/en.json'),
        zh: require('./locales/zh.json'),
      },
      dateTimeFormats: {
        en: {
          long: { year: 'numeric', month: 'long', day: 'numeric' }
        },
        zh: {
          long: { year: 'numeric', month: 'long', day: 'numeric' }
        }
      },
      // See https://nuxt-community.github.io/nuxt-i18n/browser-language-detection.html
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirect',
        alwaysRedirect: true
      }
    }
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // proxy: true  // 开启proxy
  },


  /*
  ** router module configuration
  ** See https://www.nuxtjs.cn/api/configuration-router
  */
  router: {
    // 路由根目录 重定向到home
    extendRoutes(routes, resolve) {
      routes.unshift({
        path: '/',
        redirect: '/home'
      })
    }
  },

  proxy: {
    // '/api': {
    //   target: '192.168.103.121:8083',  // api请求路径
    //   pathRewrite: { '^/api': '/' }  // 重定向请求路径，防止路由、api路径的冲突
    // }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    postcss: {
      plugins: [
        require('postcss-px2rem')({ remUnit: 37.5 }), // 换算的基数
      ]
    },
  }
}
