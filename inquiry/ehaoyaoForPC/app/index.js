// import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import store from './store'
import router from './router'
import { Picker, MessageBox,Checklist,Swipe, SwipeItem} from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.component(Picker.name, Picker);
Vue.component(Checklist.name, Checklist);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.config.debug = true
Vue.config.productionTip = false

// Vue.use(VueRouter);//使用路由插件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
