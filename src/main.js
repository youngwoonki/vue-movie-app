import {createApp} from 'vue'
import App from './App'
import router from './routes' // /index.js 생략해도 자동으로 찾아감
import store from './store' // // /index.js 생략해도 자동으로 찾아감
import loadImage from './plugins/loadImage';

createApp(App)
  .use(router) // $route, $router
  .use(store)
  .use(loadImage) // $loadImage
  .mount('#app');