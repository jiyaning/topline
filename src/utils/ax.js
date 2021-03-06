import axios from 'axios'
import Vue from 'vue'
import router from '@/router'
import JSONbig from 'json-bigint'
// 配置公共根地址(线上地址)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
// 配置为Vue的继承成员
Vue.prototype.$http = axios
// 配置请求拦截器
axios.interceptors.request.use(function (config) {
  // config:对象  与 axios.defaults 相当
  // 借助config配置token
  let userInfo = window.sessionStorage.getItem('userInfo')
  if (userInfo) {
    let token = JSON.parse(userInfo).token
    // 给axios请求头配置token
    // 注意：token前边有 'Bearer ' 的信息前缀
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 配置响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  if (error.response.status === 401) {
    router.push('/login')
    return new Promise(function () {})
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
// 服务器端返回，数据转换器，应用
axios.defaults.transformResponse = [function (data) {
  if (data) {
    return JSONbig.parse(data)
  }
  return data
}]
