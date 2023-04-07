import api from '../utils/api'

// 登录
export function wxlogin(params) {
  return api.post('/api/user/login', params)
}

// 保存用户信息
export function profile(params) {
  return api.post('/api/user/info', params)
}

// 当前用户信息
export function userInfo(params) {
  return api.get('/api/user/info', params)
}
