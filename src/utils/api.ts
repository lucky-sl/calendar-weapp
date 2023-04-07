import Taro from '@tarojs/taro'
import { HTTP_STATUS, BIZ_STATUS } from '../constants/status'
import { logError } from '../utils/error'

export default {
  async baseOptions(params, method = 'GET', prefixType) {
    let { url, data } = params
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    type OptionType = {
      url: string,
      data?: object | string,
      method?: any,
      header: object,
      // mode: string,
      // success: any,
      // error: any,
      xhrFields: object,
    }

    const setCookie = (res: {
      cookies: Array<{
        name: string,
        value: string,
        expires: string,
        path: string,
      }>,
      header: {
        'Set-Cookie': string,
        token: string,
      }
    }) => {
      if (res.cookies && res.cookies.length > 0) {
        let cookies = ''
        res.cookies.forEach((cookie, index) => {
          // windows的微信开发者工具返回的是cookie格式是有name和value的,在mac上是只是字符串的
          if (cookie.name && cookie.value) {
            cookies += index === res.cookies.length - 1 ? `${cookie.name}=${cookie.value};expires=${cookie.expires};path=${cookie.path}` : `${cookie.name}=${cookie.value};`
          } else {
            cookies += `${cookie};`
          }
        });
        Taro.setStorageSync('cookies', cookies)
      }
      if (res.header && res.header['Set-Cookie']) {
        Taro.setStorageSync('cookies', res.header['Set-Cookie'])
      }
    }
    let baseUrl = BASE_URL;
    // console.log(Taro.ENV_TYPE)
    const option: OptionType = {
      // eslint-disable-next-line
      url: url.indexOf('http') !== -1 ? url : baseUrl + url,
      data: data,
      method: method,
      header: {
        'Cookie': Taro.getStorageSync('token'),
        'token': Taro.getStorageSync('token'),
        'Content-type': contentType,
      },
      // mode: 'cors',
      xhrFields: { withCredentials: true },
    }

    const res = await Taro.request(option);
    // setCookie(res as any)
    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
      logError('api', '请求资源不存在');

    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
      logError('api', '服务端出现了问题')

    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {

      logError('api', '没有权限访问')
    } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE || res.statusCode === HTTP_STATUS.TOKEN_OVERDUE) {
      Taro.clearStorage()
      Taro.navigateTo({
        url: '/subpackPassport/pages/login/index'
      })
      logError('api', '请先登录')
    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      const resData = res.data;
      if (resData.code === BIZ_STATUS.SUCCESS) {
        return resData.data
      } else {
        logError('api', resData.msg)
        throw {
          code: resData.code,
          data: resData.data,
          msg: resData.msg
        }
      }
    }else{
      throw {
        code: res?.data?.code,
        data: res?.data,
        msg: res?.data?.msg,
      }
    }
  },
  get(url: string, data?: object | string, prefixType?: string) {
    let option = { url, data }
    return this.baseOptions(option, 'GET', prefixType)
  },
  post: function (url, data?: object, contentType?: string,prefixType?: string) {
    let params = { url, data, contentType, }
    return this.baseOptions(params, 'POST',prefixType)
  },
  put(url, data?: object) {
    let option = { url, data }
    return this.baseOptions(option, 'PUT')
  },
  delete(url, data?: object) {
    let option = { url, data }
    return this.baseOptions(option, 'DELETE')
  }
}
