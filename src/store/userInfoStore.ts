import { observable } from 'mobx'

const userInfoStore = observable({
  token: '',
  weixinOpenId: '',
  isLogin: false,
  birthday: false,
  wxUserMsg: {},

  setWeixinOpenId(value) {
    this.weixinOpenId = value
  },

  setIsLogin(value) {
    this.isLogin = value
  },

  setBirthday(value) {
    this.birthday = value
  },

  setWxuserMsg(value) {
    this.wxUserMsg = value
  },
})

export default userInfoStore