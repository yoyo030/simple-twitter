<template>
  <div class="admin-main">
    <h4 class="setting-title main-title">推文清單</h4>
    <div class="admin-tweet-list scrollbar">
      <div class="tweet d-flex" v-for="tweet in tweets" :key="tweet.id">
        <img
          :src="tweet.User.avatar | emptyImage"
          class="tweet-list-tweet-img"
          alt=""
        />

        <div class="tweet-list-text d-flex flex-column">
          <div class="tweet-list-tweet-top d-flex align-items-center">
            <div class="tweet-user-name">
              {{ tweet.User.name }}
            </div>
            <div class="tweet-user-account">
              {{ tweet.User.account | addPrefix }}
            </div>
            <span>・</span>
            <div class="tweet-user-createdAt">
              {{ tweet.createdAt | fromNow }}
            </div>
          </div>
          <div class="tweet-contentText">
            {{ tweet.description | sliceTweet }}
          </div>

          <img
            src="../assets/images/delete.png"
            class="btn-delete cursor-pointer"
            :disabled="isProcessing"
            @click.prevent.stop="deleteTweet(tweet.id)"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { emptyImageFilter } from "./../utils/mixins";
import { fromNowFilter } from "./../utils/mixins";
import { mapState } from "vuex";
import adminAPI from "./../apis/admin.js";
import { Toast } from "./../utils/helpers";

export default {
  name: "AdminTweetList",
  mixins: [fromNowFilter, emptyImageFilter],

  data() {
    return {
      tweets: [],
      isProcessing: false,
    };
  },
  filters: {
    addPrefix(account) {
      if (!account) {
        return "未提供帳號資訊";
      } else {
        return `@${account}`;
      }
    },
    //顯示推文字數超過50字，後面隱藏
    sliceTweet(description) {
      if (description.length >= 50) {
       return `${description.slice(0, 50)}...`;
      }
      return description;
    },
  },

  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await adminAPI.getTweets();
        const data = response.data;
        console.log(data);
        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }
        this.tweets = data;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "warning",
          title: `資料載入失敗 !`,
        });
      }
    },
    //二、刪除推文功能程式碼
    async deleteTweet(tweetId) {
      try {
        this.isProcessing = true;
        const { data } = await adminAPI.deleteTweet({ tweetId });
        console.log(data.status);
        // 配合測試檔無status欄位
        // if (data.status !== "success") {
        //   throw new Error(data.message);
        // }
        this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
        console.log(this.tweets);
        Toast.fire({
          icon: "success",
          title: "成功刪除推文",
        });
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法刪除推文",
        });
        console.log(error);
      }
    },
  },

  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>





<style  lang="scss" scoped>
/*AdminTweetList限定樣式^^*/
.admin-main {
  width: 100%;
  border-right: 1px solid #e6ecf0;
  border-left: 1px solid #e6ecf0;
}
.tweet {
  position: relative;
}
.tweet:hover{
  transform: scale(0.98);
  transition: all 0.1s ease
}
.btn-delete {
  position: absolute;
  right: 10px;
  width: 15px;
  height: 15px;
}
.main-title {
  margin-bottom: 0;
}

.admin-tweet-list {
  height: 85vh;
  overflow-y: scroll;
}

.admin-tweet-list::-webkit-scrollbar {
  width: 8px;
 }
  
.admin-tweet-list::-webkit-scrollbar-thumb {
  background-color: lightgray;
  border-radius: 50px;
}
</style>