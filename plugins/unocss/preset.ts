import type { Preset, Rule, UserShortcuts, Variant } from 'unocss';

/**
 * 规则配置
 */

const rules: Rule<Object>[] = [];

/**
 * 快捷方式
 */
const shortcuts: UserShortcuts = [
];

/**
 * 主题
 */
const theme: Object = {
};

// 变体
/**
 * 变体配置
 */
const variants: Variant<Object>[] = [];

// 组合预设并导出
export default function presetThelastcookies(): Preset {
  return {
    name: 'preset-thelastcookies',
    rules,
    shortcuts,
    theme,
    variants,
  };
}
