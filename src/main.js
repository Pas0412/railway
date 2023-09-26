import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router'; // 导入路由配置

createApp(App)
  .use(store)
  .use(router) // 使用路由配置
  .mount('#app');
