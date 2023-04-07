import Taro from '@tarojs/taro'
import { Component } from 'react'
import { Provider } from 'mobx-react'
import 'taro-ui/dist/style/index.scss'
import counterStore from './store/counter'
import userInfoStore from './store/userInfoStore'



import './app.scss'

const store = {
  counterStore,
  userInfoStore,
}

class App extends Component {

  onLaunch() {
    const isLogin = Taro.getStorageSync('isLogin')
    const wxUserMsg = Taro.getStorageSync('wxUserMsg')

    if (isLogin) {
      store.userInfoStore.setIsLogin(true);
      store.userInfoStore.setWxuserMsg(wxUserMsg)
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App

