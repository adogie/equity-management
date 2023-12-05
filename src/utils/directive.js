import { publicPath, baseURL } from '@/config'

export const rewrite = {
  beforeMount: (el, binding, vnode) => {
    if (binding.arg === 'img') {
      el.src = publicPath + baseURL + vnode.props.src
    }
  },
  updated: (el, binding, vnode) => {
    const updateSrc = location.origin + publicPath + baseURL + vnode.props.src
    const currentSrc = decodeURIComponent(el.src)
    if (binding.arg === 'img' && currentSrc !== updateSrc) {
      el.src = updateSrc
    }
  }
}
