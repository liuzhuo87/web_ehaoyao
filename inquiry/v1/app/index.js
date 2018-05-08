import "babel-polyfill";
import Vue from "vue";
import App from "./components/App.vue";
import store from "./store";
import router from './router'

Vue.config.debug = true;

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});

