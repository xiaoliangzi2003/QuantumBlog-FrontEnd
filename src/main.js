import { createApp } from 'vue'

//element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview-html.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';

import '@kangc/v-md-editor/lib/theme/style/github.css';
// 引入使用主题的样式
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
    Hljs: hljs,
});

//创建实例
const app = createApp(App);
app.config.globalProperties.$axios = axios;

app.use(router)
    .use(ElementPlus)
    .use(store)
    .use(VMdPreview)
    .mount('#app');

