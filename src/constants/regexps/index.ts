/**
 * 全局的正则表达式
 */
export const ReCutUrlPrefix = new RegExp('(https?|ftp|file)://[\\w-+&@#%?=~|!:,.;]+[\\w-+&@#%=~|]/', 'g');

export const picFileExt = /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg)$/i
export const videoFileExt = /\.(mp4|m4v|mkv|webm|mov|wmv|flv|mpeg|mpg|ogv|avi|ts)$/i;
