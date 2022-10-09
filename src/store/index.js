import Vue from "vue";
import Vuex from "vuex";
import authorizationAPI from "./../apis/authorization";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {
      "id": -1,
      "name": "",
      "account": "",
      "email": "",
      "avatar": "http://imgur.com/xxxxxx",
      "cover": "",
      "description": "",
      "isAdmin": false,
      "createdAt": "2022-01-18T07:23:18.000Z",
      "updatedAt": "2022-01-18T07:23:18.000Z",
    },
    isAuthenticated: false,
    // 新增 token 屬性
    token: ''
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser 
      }
      // 將使用者的登入狀態改為 true
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },
  
      revokeAuthentication (state) {
        state.currentUser = {}
        state.isAuthenticated = false   
      }
    
  },
  actions: {
    async fetchCurrentUser () {
      try {
        // 呼叫 usersAPI.getCurrentUser() 方法，並將 response 顯示出來
        const response = await authorizationAPI.getCurrentUser()
        console.log('response', response)
      } catch (error) {
        console.log('error', error)
        console.error('can not fetch user information')
      }
    }
  },
  modules: {},
  plugins: [createPersistedState()]
});

