import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import router from './router'
import dayjs from 'dayjs'
import components from './components'
import zhCN from 'dayjs/locale/zh-cn'
import { rewrite } from './utils/directive'
dayjs.locale(zhCN) // 全局使用
const app = createApp(App)
app.directive('rewrite', rewrite)
app.use(router).use(Antd).use(components).mount('#app')

export default app
