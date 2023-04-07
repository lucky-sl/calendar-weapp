import { observable, action, computed, autorun } from 'mobx'
import Taro from '@tarojs/taro'

class userInfoStore {

  constructor() {
    autorun(() => {
      // console.log(this.token, '登录的token')
      // console.log(this.wxUserMsg, '用户信息')
      // console.log(this.weixinOpenId, '第一次登录吗')
    })
  }

  @observable
  token = ''

  @observable
  wxUserMsg = {}

  @observable
  isFirstTimeLogin = true

  @observable
  weixinOpenId = ''

  @computed
  get isLogin() {
    return !!this.token;
  }

  @action
  setToken(token: string) {
    this.token = token
    Taro.setStorageSync('token', token)
    // userInfo.setToken(safeToken)
  }

  @action
  setWeixinOpenId(weixinOpenId: string) {
    this.weixinOpenId = weixinOpenId
  }

  @action
  setLoginTime(isFirstTimeLogin: boolean) {
    this.isFirstTimeLogin = isFirstTimeLogin
  }

  @action
  setWxuserMsg(msg: any) {
    this.wxUserMsg = msg
    Taro.setStorage({
      key:"wxUserMsg",
      data:msg
    })
  }

  @action
  resetUserInfo(){
    this.wxUserMsg = {};
    this.isFirstTimeLogin= true;
    this.token = "";
    // this.weixinOpenId = "";
    Taro.clearStorage()
  }


}

export default userInfoStore
