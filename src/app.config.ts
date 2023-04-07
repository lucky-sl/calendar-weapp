export default defineAppConfig({
  pages: [
    'pages/index/index', //首页
    'pages/home/index', //首页
    'pages/login/index', //登录
    'pages/register/index', //注册
    'pages/mine/index', //我的
  ],
  tabBar: {
    color: '#777E99',
    selectedColor: '#3f506b',
    backgroundColor: '#fff',
    borderStyle: 'white',
    // custom: true,
    list: [{
      iconPath: './assets/image/tabbar/tab_home.png',
      selectedIconPath: './assets/image/tabbar/tab_home_a.png',
      pagePath: 'pages/home/index',
      text: '首页'
    }, 
    {
      iconPath: './assets/image/tabbar/tab_me.png',
      selectedIconPath: './assets/image/tabbar/tab_me_a.png',
      pagePath: 'pages/mine/index',
      text: '我的'
    }],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
