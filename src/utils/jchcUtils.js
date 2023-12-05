import { createApp } from 'vue'
import Iframe from '@/components/MIframe.vue'
import { Modal } from 'ant-design-vue'
import { baseURL, publicPath } from '@/config'

/**
 * 文件预览
 * @param viewid 预览ID
 * @param redirectUrl 直接预览地址
 */
export function preview(viewid, redirectUrl) {
  createApp(Modal, {
    title: '文件预览',
    left: 0,
    width: '50%',
    height: '100%',
    content: {
      component: Iframe,
      props: { src: redirectUrl ?? `https://sjkwd.jchc.cn/view/${viewid}` }
    }
  }).mount(document.createElement('div'))
}

/** 重写请求地址，方便测试 */
export function rewrite(url) {
  if (process.env.NODE_ENV === 'development') {
    return publicPath + baseURL + url + (url.indexOf('?') === -1 ? '?' : '&') + 'wx_user_id=' + getQueryUrl('wx_user_id')
  } else {
    const userId = getQueryUrl('wx_user_id')
    let _url = publicPath + baseURL
    if (_url[_url.length - 1] === '/') {
      _url = _url.substring(0, _url.length - 1)
    }
    if (userId) {
      return _url + url + (url.indexOf('?') === -1 ? '?' : '&') + 'wx_user_id=' + userId
    } else {
      return _url + url
    }
  }
}

/**
 * 获取地址栏参数
 * @param key 参数名
 */
export function getQueryUrl(key) {
  let winObj = arguments.length > 1 ? arguments[1] : window
  const reg = new RegExp('(^|\\?|&)' + key + '=([^&]*)(\\s|&|$)', 'i')
  if (typeof winObj.location !== 'object') {
    winObj = window
  }
  if (reg.test(winObj.location.href)) {
    return decodeURIComponent(RegExp.$2.replace(/\+/g, ' '))
  }
  return ''
}

export function uuid(len, radix) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  let i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

/**
 * 获取非axios请求地址前缀
 * @param key 参数名
 */
export function getUrlSuffix() {
  if (process.env.NODE_ENV === 'development') {
    return publicPath + '/' + baseURL
  }
  return publicPath
}

/**
 * 阿拉伯数字转中文数字
 * @param num 数字
 */
export function numberToChinese(num) {
  if (!/^\d*(\.\d*)?$/.test(num)) {
    return NaN
  }
  const AA = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const BB = ['', '十', '百', '千', '万', '亿', '点', '']
  const a = ('' + num).replace(/(^0*)/g, '').split('.')
  let k = 0
  let re = ''
  for (let i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re
        break
      case 4:
        if (!new RegExp('0{4}\\d{' + (a[0].length - i - 1) + '}$').test(a[0])) {
          re = BB[4] + re
        }
        break
      case 8:
        re = BB[5] + re
        BB[7] = BB[5]
        k = 0
        break
    }
    if (k % 4 === 2 && a[0].charAt(i + 2) !== 0 && a[0].charAt(i + 1) === 0) {
      re = AA[0] + re
    }
    if (a[0].charAt(i) !== 0) {
      re = AA[a[0].charAt(i)] + BB[k % 4] + re
    }
    k++
  }
  if (a.length > 1) {
    //	加上小数部分(如果有小数部分)
    re += BB[6]
    for (let i = 0; i < a[1].length; i++) {
      re += AA[a[1].charAt(i)]
    }
  }
  return re
}
