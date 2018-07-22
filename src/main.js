// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
// import VueSwing from 'vue-swing'

// Vue.component('vue-swing', VueSwing)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // axios,
  // components: {App, VueSwing},
  components: {App},
  template: '<App/>'
})
