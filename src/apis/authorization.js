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
  // 後台登入功能(待後端解決)
  adminLogin({ account, password }) {
    return apiHelper.post("/admin/login", {
      account,
      password,
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
    //串api尚未成功
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

    getTopUser() {      
      return apiHelper.get(`/followships/followers/top10`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },

    //api一直串不過
    followed() {
      return apiHelper.post(`/followships`, {
        headers: { Authorization: `Bearer ${getToken()}` , 'Content-Type': 'application/json' },
      });
    },


    unfollowed(id) {
      return apiHelper.delete(`/followships/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },

    getUserTweets(id) {
      return apiHelper.get(`/users/${id}/tweets`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
    getUserReplies(id) {
      return apiHelper.get(`/users/${id}/replied_tweets`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
 
    insertTweets(description) {
      return apiHelper.post(
        "/tweets",
        {
          description, // req.body.description
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
    },
    likeTweets(userId,tweetId) {
      return apiHelper.post(      
        `/tweets/${tweetId}/like`,
        { userId,},
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
    },
    unlikeTweets(userId,tweetId) {
      return apiHelper.post(
        `/tweets/${tweetId}/unlike`,
        { userId },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
    },
    
};
