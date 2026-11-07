import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import { UnoCSSPluginConfig } from './unocss/index.ts';
import { AutoImportPluginConfig } from './auto-import/index.ts';
import { VueComponentPluginConfig } from './vue-component/index.ts';

/**
 * 注入 vite 的插件
 * 目前包括：
 *  Vue
 *  VueJsx
 *  VueDevTools
 *  UnoCSS
 *  unplugin-auto-import
 *  unplugin-vue-components
 */
// vite.config.ts
export function createVitePlugins() {
  const vitePluginList: (PluginOption | PluginOption[])[] = [
    vue(),
    UnoCSSPluginConfig,
    AutoImportPluginConfig,
    VueComponentPluginConfig,
    // BasicSslPluginConfig,
  ];
  return vitePluginList;
}
