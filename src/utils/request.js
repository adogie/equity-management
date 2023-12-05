import axios from 'axios'
import vm from '../main'
import { baseURL, publicPath, contentType, debounce, requestTimeout, successCode } from '@/config'
import qs from 'qs'
import { isArray } from '@/utils/validate'
import { getAccessToken } from '@/utils/accessToken'
import { message } from 'ant-design-vue'
import { tokenName } from '@/config'

let loadingInstance

/**
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, data, msg) => {
  switch (code) {
    case 401:
      message.error('登录失效')
      location.href = msg
      break
    case 403:
      message.error(msg || '无访问权限')
      break
    default:
      message.error(msg || `后端接口${code}异常`)
      break
  }
}

/**
 * @description axios初始化
 */
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType
  }
})

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    if (!config.baseURL) {
      config.url = publicPath + config.url
    }
    if (config.rewriteBaseUrl) {
      config.baseURL = config.rewriteBaseUrl
    }
    if (getAccessToken()) {
      config.headers[tokenName] = getAccessToken()
    }
    config.headers['redirectUrl'] = location.origin + location.pathname
    if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
      config.data = qs.stringify(config.data)
    }
    if (debounce.some((item) => !config.url.includes(item))) {
      // 这里写加载动画
      vm.config.globalProperties.$logo(true)
    }
    return config
  },
  (error) => {
    vm.config.globalProperties.$logo(false)
    return Promise.reject(error)
  }
)

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response) => {
    vm.config.globalProperties.$logo(false)
    if (loadingInstance) {
      loadingInstance.close()
    }
    const { data, config } = response
    const { code, msg } = data
    // 操作正常Code数组
    const codeVerificationArray = isArray(successCode) ? [...successCode] : [...[successCode]]
    // 是否操作正常
    if (codeVerificationArray.includes(code) || config?.responseType === 'arraybuffer') {
      return data
    } else {
      handleCode(code, data, msg)
      return Promise.reject('请求异常拦截:' + JSON.stringify({ url: config.url, code, msg }) || 'Error')
    }
  },
  (error) => {
    vm.config.globalProperties.$logo(false)
    if (loadingInstance) loadingInstance.close()
    if (error.response && error.response.data) {
      const { status, data } = error.response
      handleCode(status, data, data.msg || error.message)
      return Promise.reject(error)
    } else {
      let errorMsg = ''
      if (error.message === 'Network Error') {
        errorMsg = '后端接口连接异常'
      }
      if (error.message.includes('timeout')) {
        errorMsg = '后端接口请求超时'
      }
      if (error.message.includes('Request failed with status code')) {
        const code = error.message.substr(message.length - 3)
        errorMsg = `后端接口${code}异常`
      }
      message.error(errorMsg || `网络错误`)
      return Promise.reject(error)
    }
  }
)

export default instance
