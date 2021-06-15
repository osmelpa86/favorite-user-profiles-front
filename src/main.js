import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLayers from 'vuelayers'
import 'vuelayers/src/styles/main.scss'
import JsonCSV from 'vue-json-csv'

Vue.component('downloadCsv', JsonCSV)

Vue.use(VueAxios, axios)
Vue.use(VueLayers, {
  dataProjection: 'EPSG:4326',
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
