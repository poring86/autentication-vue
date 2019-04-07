import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL ='https://vue-autentication.firebaseio.com'
axios.defaults.headers.common['Authorization'] = 'asdaegf'
axios.defaults.headers.get['Accepts'] = 'application/json'

const reqInterceptor = axios.interceptors.request.use(config => {
  console.log(config)
  config.headers['SOMETHING']
  return config
})
const resInterceptor = axios.interceptors.response.use(res => {
  console.log(res)
  return res
})

axios.interceptors.request.eject(reqInterceptor)
axios.interceptors.request.eject(resInterceptor)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
