import axios from 'axios'

import router from '../router'


export default {
    namespaced: true,
    state: {
        token: '',
        user: ''
    },
    getters: {
        authenticated(state) {
            return state.token && state.user
        },
        user(state) {
            return state.user
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        }
        ,
        SET_USER(state, data) {
            state.user = data
        }
    },
    actions: {
        async singIn({ dispatch }, credentials) {

            let response = await axios.post("login", credentials);

            let data = response.data;

            if (data.code == 1) {
                dispatch('attempt', data)

                router.push({name: 'home'})

            }
        },
        async attempt({ commit, state }, data) {
            if (typeof data == 'string') {
                commit('SET_TOKEN', data);
                try {
                    let response = await axios.get('profile');
                    commit('SET_USER', response.data.data);
                } catch (e) {
                    commit('SET_TOKEN', null);
                    commit('SET_USER', null);
                }
                return;
            }
            if (data) {
                commit('SET_TOKEN', data.token);
                commit('SET_USER', data.data);
                return;
            }
            if (state.data) {
                return;
            }
        },

        signOut({ commit }) {
            commit('SET_TOKEN', null);
            commit('SET_USER', null);
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('token')
        }
    }
}
