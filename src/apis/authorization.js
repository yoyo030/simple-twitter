// ./src/apis/authorization.js
import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  // 帶入需要的參數
  signIn ({ account, password }) {
    // 這裡 return 的會是一個 Promise
    return apiHelper.post('/login', {
        account, password
    })
  },
  signUp ({ account, name, email, password, checkPassword }) {
    // 這裡 return 的會是一個 Promise
    
    
    
    return apiHelper.post('/users', {
        
         account,
         name, 
         email, 
         password, 
         checkPassword 
    }
      
      )



  },





  getCurrentUser () {
    return apiHelper.get(`/get_current_user`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  get ({ userId }) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTopUsers () {
    return apiHelper.get('/users/top', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },


}