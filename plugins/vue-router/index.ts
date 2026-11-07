import type { PluginOption } from 'vite';
import VueRouter from 'vue-router/vite';
import { getFileBasedRouteName } from 'vue-router/unplugin';

export const VueRouterPluginConfig: PluginOption = VueRouter({
  routesFolder: ['src/pages', 'src/views'],
  extensions: ['.vue'],
  filePatterns: ['**/*'],
  exclude: [],
  dts: './plugins/vue-router/typed-router.d.ts',
  getRouteName: routeNode => getFileBasedRouteName(routeNode),
  routeBlockLang: 'json5',
  importMode: 'async',
  root: process.cwd(),
  pathParser: {
    dotNesting: true,
  },

  // 单独修改路由
  async extendRoute(route) {
  },

  // 在写入文件之前修改路由
  async beforeWriteFiles(rootRoute) {
  },
});
