// ./src/apis/authorization.js
import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem("token");

export default {
  //抓取所有推文資料
  getTweets() {
    return apiHelper.get('/admin/tweets', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  //刪除貼文
  deleteTweet({ tweetId }) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`, {
       headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  //抓取所有使用者資料
  getUsers() {
    return apiHelper.get('/admin/users', {
       headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}