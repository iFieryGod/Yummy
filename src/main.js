import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import BootstrapVue from 'bootstrap-vue'
import Vuetify from 'vuetify'
import VueSwal from 'vue-swal'
import SimpleVueValidation from 'simple-vue-validator';
import moment from 'moment'
import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap'

moment.locale('en');
Object.defineProperty(Vue.prototype, '$moment', { value: moment });
Vue.use(SimpleVueValidation);
Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.use(VueSwal);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
