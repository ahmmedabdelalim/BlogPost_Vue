import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import store from "./store/Store";
import router from "./router/Router";
import "./assets/scss/style.scss";
import App from "./App.vue";
import JwPagination from 'jw-vue-pagination';
import $ from 'jquery';

Vue.component('jw-pagination', JwPagination);

Vue.config.productionTip = false;
//var $ = require('jquery');

new Vue({ store, $ , router, render: (h) => h(App) }).$mount("#app");
