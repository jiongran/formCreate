import formCreate from '@form-create/element-ui';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import ElementPlus from 'element-plus'; //引入element-plus库
import 'element-plus/dist/index.css'; //引入element-plus样式
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import VForm3 from 'vform3-builds';
import 'vform3-builds/dist/designer.style.css'; //引入VForm3样式
import "virtual:svg-icons-register";
import { createApp } from 'vue';
import VueFormCraft from 'vue-form-craft';
import App from './App.vue';
import router from './router';
import './styles/index.scss';


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(pinia)
app.use(ElementPlus)
app.use(VueFormCraft)
app.use(VForm3)
app.use(formCreate)
app.use(router)
inject()
injectSpeedInsights()
app.mount('#app')
