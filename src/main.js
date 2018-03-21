import { router, store } from 'setaria';
import Vue from 'vue';
import 'weui/dist/style/weui.min.css';
import SetariaWechatUI from './components/index';
import './css/trans.css';
import App from './App.vue';

Vue.use(SetariaWechatUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
