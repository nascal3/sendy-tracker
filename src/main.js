import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Toasted from 'vue-toasted'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(Toasted, {
  duration: 4000
})
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBWMVg9uhO7-BieEMUB3cVzm9O78RGtugo',
    libraries: 'places,drawing,visualization'
  },
  autobindAllEvents: true
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
