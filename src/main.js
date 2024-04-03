import './assets/main.css'
import antd from 'ant-design-vue'
import ElementPlus from 'element-plus' //引入element-plus库
import 'element-plus/dist/index.css' //引入element-plus样式
import VForm3 from 'vform3-builds' //引入VForm3库
import 'vform3-builds/dist/designer.style.css' //引入VForm3样式
import 'ant-design-vue/dist/reset.css'
import VueFormCraft from 'vue-form-craft'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(antd)
app.use(ElementPlus)
app.use(VueFormCraft)
app.use(VForm3)
app.use(router)

app.mount('#app')
