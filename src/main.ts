import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
// 全局样式表
import '@/assets/style/index.less';

export const app = createApp(App);

import 'vant/lib/index.css';

app.mount('#app');
