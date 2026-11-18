import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
// 全局样式表
import '@/assets/style/index.less';

import 'vant/lib/index.css';

// router
import router from '@/router';
// 导入路由守卫
import '@/router/guards.ts';

/**
 * 应用初始化
 * 在 Vue 应用挂载前处理 OIDC 回调
 */
const start = async () => {
  const callbackHandled = await handleOidcCallback();
  if (callbackHandled) return;

  const app = createApp(App);
  app.use(createPinia());
  app.use(router);
  app.mount('#app');
  return app;
};

start();
