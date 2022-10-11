// ./src/apis/authorization.js
import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem("token");

export default {
  // signIn api 成功串接 功能正常
  signIn({ account, password }) {
    return apiHelper.post("/login", {
      account,
      password,
    });
  },
  // signUp api 成功串接 功能正常
  signUp({ account, name, email, password, checkPassword }) {
    return apiHelper.post("/users", {
      account,
      name,
      email,
      password,
      checkPassword,
    });
  },

  // GetUserData api 成功串接 有拿到資料
  Test(id) {
    return apiHelper.get(`users/${id}}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  // getTweets api 成功串接 有拿到資料
  getTweets() {
    return apiHelper.get(`/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  // settingSave api 成功串接 有修改到資料
  settingSave(id, formData) {
    return apiHelper.put(`users/${id}`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

    // getTweet api 成功 獲取一篇貼文(沒有抓到此貼文的回覆)
    getTweet(id) {
      return apiHelper.get(`/tweets/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
    //api未完成
    getTweetsReplies(id) {
      return apiHelper.get(`/tweets/${id}/replies`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },

    getUserInfo(id) {      
      return apiHelper.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
    getUserFollowers(id) {      
      return apiHelper.get(`/users/${id}/followers`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
    getUserFollowing(id) {      
      return apiHelper.get(`/users/${id}/followings`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
};
