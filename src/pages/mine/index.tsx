import { Component } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './index.scss'


@inject('store')
@observer
class Index extends Component {
  componentDidMount () {

   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

	handleLogin(){
    Taro.navigateTo({url: '/pages/login/index'});
  }

  render () {
    return (
      <View className='mine-wrap'>
        我的
      </View>
    )
  }
}

export default Index
