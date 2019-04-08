import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser(state, userData){
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser(state, user){
      state.user = user
    }
  },
  actions: {
    signup({commit, dispatch}, authData){
      axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAoMj7f0KW_3SyLvvmohqRbGDAFGSbeKPo', {
        email:authData.email,
        password:authData.password,
        returnSecureToken: true
      })
      .then(res =>{
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId
        })
        dispatch('storeUser', authData)
      })
      .catch(error => console.log(error))
    },
    login({commit}, authData){
      axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAoMj7f0KW_3SyLvvmohqRbGDAFGSbeKPo', {
        email:authData.email,
        password:authData.password,
        returnSecureToken: true
      })
      .then(res =>{
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId
        })
      })
      .catch(error => console.log(error))
    },
    storeUser({commit, state}, userData){
      if(!state.idToken){
        return
      }
      axios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    fetchUser({commit, state}){
      if(!state.idToken){
        return
      }
      axios.get('/users.json' + '?auth=' + state.idToken)
      .then(res =>{ 
        console.log(res)
        const data = res.data;
        const users = []
        for(let key in data){
          const user = data[key];
          user.id = key
          users.push(user)
        }
        console.log(users)
        commit('storeUser', users[0])
      })
      .catch(error => console.log(error))
      // this.email = res.email;
    }
  },
  getters: {
    user (state){
      return state.user
    }
  }
})