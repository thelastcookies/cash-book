import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
// 全局样式表
import '@/assets/style/index.less';

export const app = createApp(App);

// // Pinia
// import { createPinia } from 'pinia';
// app.use(createPinia());
//
// // router
// import router from '@/router';
// // 导入路由守卫
// import '@/router/guards.ts';
// app.use(router);

import 'vant/lib/index.css';

app.mount('#app');
