import React from 'react'
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { AtButton, AtMessage } from 'taro-ui'
import {  wxlogin,userInfo } from '@/api/user'

import './index.scss'

@inject('store')
@observer

class Index extends React.Component {

  state = {
  }

  componentWillMount () {
    
   }

  componentDidShow () { }

  componentDidHide () { }

  handleClickNext = () => {
   
    Taro.navigateTo({ url: '/pages/login/index' });
 
  }



  render () {
    return (
      <View className='index-container'>
        <AtMessage />
        <Image className='bg' src={require('@/assets/image/bg.png')} />
        <Image className='logo' src={require('@/assets/image/image.png')} />
        <View className='text' >定制专属于你的私人日历</View>
        <View className='text' >让好运天天相伴</View>
        <AtButton className='next-button' type='primary' onClick={this.handleClickNext}>下一步</AtButton>
        
      </View>
    )
  }
}

export default Index
