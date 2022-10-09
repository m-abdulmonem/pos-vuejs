import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'


import '../public/css/app.css'



import VueTilt from 'vue-tilt.js'


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faSignOut, faBell, faDashboard, faCalculator } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faSignOut, faBell, faDashboard, faCalculator)

import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';


import axios from 'axios'

import $ from 'jquery'

import'../public/js/app.js'

require('@/store/subscriber');

axios.defaults.baseURL = "https://el-saddiq-managment-feed.com/api";




document.querySelector('body').addEventListener('keyup', (e) => {
  if (e.altKey && e.keyCode === 67)
    window.open('Calculator:///');
});

$('body').on('keydown', 'input', function () {
  if ($(this).hasClass('is-invalid')) {
    $(this).removeClass('is-invalid').next(".alert").addClass("hide")
  }
})




router.beforeEach(async (to) => {
  if (
    !store.getters['auth/authenticated'] &&
    to.name !== 'login'
  ) {
    return { name: 'login' }
  } else if (to.name == "invoice" && to?.params == null) {
    return { name: 'home' }
  }
})


store.dispatch('auth/attempt', sessionStorage.getItem('token')).then(() => {
  createApp(App).use(store).use(router).use(BootstrapVue3).use(VueSweetalert2).use(VueTilt).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

})




