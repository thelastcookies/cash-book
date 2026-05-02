import Components from 'unplugin-vue-components/vite';
import type { PluginOption } from 'vite';
import { VantResolver } from '@vant/auto-import-resolver';
import { customResolver } from './custom-resolver';

export const VueComponentPluginConfig: PluginOption = Components({
  include: [
    /\.tsx?$/, // .ts, .tsx
    /\.vue$/,
    /\.vue\?vue/, // .vue
  ],
  dirs: [
    'src/components/**',
    'src/views/**/components',
    'src/views/form/lib/configs',
  ],
  dts: './plugins/vue-component/components.d.ts',
  resolvers: [
    VantResolver({
      importStyle: false,
    }),
    customResolver,
  ],
});
