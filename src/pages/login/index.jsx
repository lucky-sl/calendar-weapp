import { Component } from 'react'
import Taro from '@tarojs/taro';
import { View, Picker,Input,Image,Button } from '@tarojs/components'
import { AtList, AtListItem, AtButton, AtMessage, } from 'taro-ui'
import { observer, inject } from 'mobx-react'
import {  profile } from '@/api/user'

import './index.scss'

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

@inject('store')
@observer
class Index extends Component {
  state = {
    dateSel: '请选择',
    nickName: '',
    // eslint-disable-next-line react/no-unused-state
    avatarUrl: defaultAvatarUrl,

  }
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onDateChange = e => {
    console.log(this.state)
    this.setState({
      dateSel: e.detail.value
    })
  }

  handleLogin = () => {

    if(!this.state.nickName){
      Taro.atMessage({
        'message': '请输入昵称',
        'type': 'error',
      })
      return
    }
    if(this.state.dateSel.includes('请选择')){
      Taro.atMessage({
        'message': '请选择出生年月',
        'type': 'error',
      })
      return
    }

    this.saveUser();
    // Taro.getUserProfile({
    //   desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //   success: (res) => {
    //     // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    //     console.log(res.userInfo,'ddddd')
    //     const {userInfo} = res
    //     const { userInfoStore } = this.props.store
    //     userInfoStore.setWxuserMsg(userInfo);
    //     Taro.setStorageSync('wxUserMsg', userInfo)
    //     // this.saveUser();
    //   },
    //   fail: () => {
    //     Taro.atMessage({
    //       'message': '授权成功后才可以继续登录',
    //       'type': 'warning',
    //     })
    //   }
    // })
  }

  saveUser= async() => {
    const { userInfoStore } = this.props.store
    const {dateSel,nickName,avatarUrl} = this.state
    const params = {
      openId: userInfoStore.weixinOpenId,
      birthday: dateSel,
      avatarUrl,
      nickName
    }

    userInfoStore.setWxuserMsg(params);
    Taro.setStorageSync('wxUserMsg', params)
    try {
      await profile(params);
      userInfoStore.setIsLogin(true)
      Taro.setStorageSync('isLogin', true)
      Taro.switchTab({ url: '/pages/home/index' });
      
    } catch (error) {
      Taro.atMessage({
        'message': error,
        'type': 'error',
      })
    }
  }

  handleChange=(e)=>{
    this.setState({
      nickName: e.detail.value
    })
  }

  render () {
    return (
      <View className='login-container'>
        <AtMessage />
        <View className='top-container'>
          <View className='title'>注 册</View>
          <View className='special'>欢迎定制专属于你的私人日历！</View>
          
        </View>
       
        <View className='content'>
          <View className='page-section'>
            {/* <Text>日期选择器</Text> */}
            <View>
              <View className='avatar-container'>
                <View className='name'>头像</View>
                <Button class='avatar-wrapper' open-type='chooseAvatar'  onChooseAvatar={async(e) => {
                  this.setState(
                    {
                      avatarUrl: e.detail.avatarUrl
                    }
                  )
                }}
                >
                  <Image className='avatar' src={this.state.avatarUrl} />
                </Button>
              </View>
              <View className='nick-name'>
                <View className='name'>昵称</View>
                <Input
                  class='input'
                  name='nickName'
                  type='nickname'
                  placeholder='请输入'
                  value={this.state.nickName}
                  onInput={this.handleChange}
                />
              </View>
              
              <Picker mode='date' onChange={this.onDateChange}>
                <AtList>
                  <AtListItem title='出生年月'  extraText={this.state.dateSel} />
                </AtList>
              </Picker>
            </View>
            

          </View>
          <AtButton className='next-button' type='primary' onClick={this.handleLogin}>注册</AtButton>
        </View>
        
      </View>
    )
  }
}

export default Index
