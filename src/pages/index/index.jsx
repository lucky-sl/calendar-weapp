import React from 'react'
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import {  AtMessage } from 'taro-ui'
import {  wxlogin,userInfo } from '@/api/user'

import './index.scss'

@inject('store')
@observer

class Index extends React.Component {

  state = {
  }

  componentWillMount () {
    Taro.login({
      success: async (res) => {
        try {
          const resultData = await wxlogin({
            code: res.code,
          });
          const { userInfoStore } = this.props.store
          userInfoStore.setWeixinOpenId(resultData);
          await this.wxProfile(resultData);
        } catch (err) {
          console.log(113)
          Taro.atMessage({
            'message': err.msg,
            'type': 'error',
          })
        } finally {
          Taro.hideLoading();
        }
      }
    })
   }

  componentDidShow () { 
    Taro.showLoading({
      title: '加载中',
    })
  }

  componentDidHide () { }


  wxProfile= async(openid) => {
    try {
      const resultData = await userInfo({
        openId: openid,
      });
      if(resultData){
        Taro.switchTab({ url: '/pages/home/index' });
      }else{
        Taro.navigateTo({ url: '/pages/register/index' });
      }
      
    } catch (err) {
      Taro.atMessage({
        'message': err.msg,
        'type': 'error',
      })
    }
  }


  render () {
    return (
      <View className='index-container'>
        <AtMessage />
        
      </View>
    )
  }
}

export default Index
