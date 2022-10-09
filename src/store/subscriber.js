import store from '@/store'

import axios from 'axios'

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'auth/SET_TOKEN':
            if (mutation.payload) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
        
                sessionStorage.setItem("token",mutation.payload)
          }
            else {
                axios.defaults.headers.common['Authorization'] = null
                sessionStorage.removeItem("token")
            }

            break;
        case 'auth/SET_USER':
            if (mutation.payload) {
                sessionStorage.setItem("user", JSON.stringify(mutation.payload))
          }
            else {
                sessionStorage.removeItem("user")
            }

            break;
    }
})