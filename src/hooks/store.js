import { reactive } from 'vue'
import * as Api from '@/api/jchc'

export default reactive({
  formData: {},
  activeOpinion: {},
  userInfo: {},
  mainBodyTypeList: [],
  dictionary: [],
  showForm: false,
  getDictionaryByCode(code) {
    return this.dictionary.filter((dic) => dic.code === code)
  },
  getDictionaryNameById(id) {
    return this.dictionary.find((dic) => dic.id === id)?.name
  },
  async getUserInfo() {
    if (!Object.keys(this.userInfo).length) {
      const { data } = await Api.apiGetUserInfo()
      this.userInfo = data
    }
  },
  async getOrgUsers() {
    if (!this.mainBodyTypeList.length) {
      const { data } = await Api.apiQueryOrgUsers()
      this.mainBodyTypeList = data
    }
  },
  async getDictionaries() {
    if (!this.dictionary.length) {
      const { data } = await Api.getDictionaries()
      this.dictionary = data
    }
  }
})
