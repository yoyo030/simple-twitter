<template>
  <div class="admin-main">
    <h4 class="setting-title main-title">推文清單</h4>
    <div class="tweet-list scrollbar">
      <div class="tweet d-flex" v-for="tweet in tweets" :key="tweet.id">
        <!--待串接後用v-bind改為使用者img-->
        <img
          v-if="tweet.User.avatar != undefined"
          :src="tweet.User.avatar"
          class="tweet-list-tweet-img"
          alt=""
        />
        <img
          v-else
          src="../assets/images/logo-gray.png"
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
            {{ tweet.description }}
          </div>

            <img src="../assets/images/delete.png"             class="btn-delete"
            :disabled="isProcessing"
            @click.prevent.stop="deleteTweet(tweet.id)"
            alt="" />

        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { fromNowFilter } from "./../utils/mixins";
import { mapState } from "vuex";
//import authorizationAPI from "./../apis/authorization";
//import { Toast } from "./../utils/helpers";

const dummyData = {
  tweets: [
    {
      id: 1,
      UserId: 2,
      description:
        "Eos voluptatum repellendus a sit aliquid ea rerum perspiciatis.",
      createdAt: "2022-11-04T10:11:41.000Z",
      updatedAt: "2022-10-07T12:02:19.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$SdtyKlm.AkaI5zmGtr20t.UErVl/WkOw0tjVuo0XBKxxp62tz9ffS",
        name: "user1",
        account: "user1",
        avatar: null,
        cover: null,
        introduction: null,
        role: "user",
        createdAt: "2022-10-08T04:25:10.000Z",
        updatedAt: "2022-10-08T04:25:10.000Z",
      },
      replyCount: 6,
      likeCount: 0,
    },
    {
      id: 25,
      UserId: 4,
      description: "aut",
      createdAt: "2022-11-04T08:11:22.000Z",
      updatedAt: "2022-10-07T12:02:19.000Z",
      User: {
        id: 4,
        email: "user3@example.com",
        password:
          "$2a$10$QpLgWFFXLgjMIQK0ZeHLTufypo4DeKtgRSeROKucbI8Gwj2E0Odti",
        name: "user3",
        account: "user3",
        avatar: null,
        cover: null,
        introduction: null,
        role: "user",
        createdAt: "2022-10-08T04:25:11.000Z",
        updatedAt: "2022-10-08T04:25:11.000Z",
      },
      replyCount: 6,
      likeCount: 0,
    },
    {
      id: 2,
      UserId: 2,
      description:
        "Eos voluptatum repellendus a sit aliquid ea rerum perspiciatis.",
      createdAt: "2022-11-04T10:11:41.000Z",
      updatedAt: "2022-10-07T12:02:19.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$SdtyKlm.AkaI5zmGtr20t.UErVl/WkOw0tjVuo0XBKxxp62tz9ffS",
        name: "user1",
        account: "user1",
        avatar: null,
        cover: null,
        introduction: null,
        role: "user",
        createdAt: "2022-10-08T04:25:10.000Z",
        updatedAt: "2022-10-08T04:25:10.000Z",
      },
      replyCount: 6,
      likeCount: 0,
    },
    {
      id: 29,
      UserId: 4,
      description: "aut",
      createdAt: "2022-11-04T08:11:22.000Z",
      updatedAt: "2022-10-07T12:02:19.000Z",
      User: {
        id: 4,
        email: "user3@example.com",
        password:
          "$2a$10$QpLgWFFXLgjMIQK0ZeHLTufypo4DeKtgRSeROKucbI8Gwj2E0Odti",
        name: "user3",
        account: "user3",
        avatar: null,
        cover: null,
        introduction: null,
        role: "user",
        createdAt: "2022-10-08T04:25:11.000Z",
        updatedAt: "2022-10-08T04:25:11.000Z",
      },
      replyCount: 6,
      likeCount: 0,
    },
     {
      id: 1,
      UserId: 2,
      description:
        "Eos voluptatum repellendus a sit aliquid ea rerum perspiciatis.",
      createdAt: "2022-11-04T10:11:41.000Z",
      updatedAt: "2022-10-07T12:02:19.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$SdtyKlm.AkaI5zmGtr20t.UErVl/WkOw0tjVuo0XBKxxp62tz9ffS",
        name: "user1",
        account: "user1",
        avatar: null,
        cover: null,
        introduction: null,
        role: "user",
        createdAt: "2022-10-08T04:25:10.000Z",
        updatedAt: "2022-10-08T04:25:10.000Z",
      },
      replyCount: 6,
      likeCount: 0,
    }, {
      id: 9,
      UserId: 2,
      description:
        "Eos voluptatum repellendus a sit aliquid ea rerum perspiciatis.",
      createdAt: "2022-11-04T10:11:41.000Z",
      updatedAt: "2022-10-07T12:02:19.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$SdtyKlm.AkaI5zmGtr20t.UErVl/WkOw0tjVuo0XBKxxp62tz9ffS",
        name: "user1",
        account: "user1",
        avatar: null,
        cover: null,
        introduction: null,
        role: "user",
        createdAt: "2022-10-08T04:25:10.000Z",
        updatedAt: "2022-10-08T04:25:10.000Z",
      },
      replyCount: 6,
      likeCount: 0,
    },
     {
      id: 33,
      UserId: 2,
      description:
        "Eos voluptatum repellendus a sit aliquid ea rerum perspiciatis.",
      createdAt: "2022-11-04T10:11:41.000Z",
      updatedAt: "2022-10-07T12:02:19.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$SdtyKlm.AkaI5zmGtr20t.UErVl/WkOw0tjVuo0XBKxxp62tz9ffS",
        name: "user1",
        account: "user1",
        avatar: null,
        cover: null,
        introduction: null,
        role: "user",
        createdAt: "2022-10-08T04:25:10.000Z",
        updatedAt: "2022-10-08T04:25:10.000Z",
      },
      replyCount: 6,
      likeCount: 0,
    },
         {
      id: 53,
      UserId: 2,
      description:
        "Eos voluptatum repellendus a sit aliquid ea rerum perspiciatis.",
      createdAt: "2022-11-04T10:11:41.000Z",
      updatedAt: "2022-10-07T12:02:19.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$SdtyKlm.AkaI5zmGtr20t.UErVl/WkOw0tjVuo0XBKxxp62tz9ffS",
        name: "user1",
        account: "user1",
        avatar: null,
        cover: null,
        introduction: null,
        role: "user",
        createdAt: "2022-10-08T04:25:10.000Z",
        updatedAt: "2022-10-08T04:25:10.000Z",
      },
      replyCount: 6,
      likeCount: 0,
    },
  ],
};

export default {
  name: "AdminTweetList",
  mixins: [fromNowFilter],

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
  },

  created() {
    this.fetchTweets();
  },
  methods: {
    fetchTweets() {
      this.tweets = dummyData.tweets;
    },
    deleteTweet (tweetId) {
      this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId)
    }
  },

  //一、待串接API後參考用程式碼(待新增adminApi)
  //  async fetchTweets() {
  //   try {
  //    const response = await authorizationAPI.getTweets()
  //    const data = response.data;
  //    console.log(data);
  //    if (data.status && data.status !== "success") {
  //         throw new Error(data.message);
  //          }
  //        this.tweets = data;
  //     } catch (error) {
  //        console.log(error);
  //        Toast.fire({
  //          icon: "warning",
  //          title: `資料載入失敗 !`,
  //        });
  //       }
  //     },
  //   },
  //二、刪除推文功能程式碼
  //    async deleteTweet (tweetId) {
  //      try {
  //        this.isProcessing = true
  //        const { data } = await adminApi.deleteTweet({ tweetId })
  //        if (data.status !== 'success') {
  //          throw new Error(data.message)
  //        }
  //        this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId)
  //        Toast.fire({
  //          icon: 'success',
  //          title: '成功刪除推文'
  //        })
  //       this.isProcessing = false
  //      } catch (error) {
  //        this.isProcessing = false
  //        Toast.fire({
  //          icon: 'error',
  //          title: '無法刪除推文'
  //        })
  //        console.dir(error)
  //      }
  //    }
  //  }

  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>





<style  lang="scss" scoped>
/*AdminTweetList限定樣式^^*/
.admin-main {
  width: 80%;
  border-right: 1px solid #e6ecf0;
  border-left: 1px solid #e6ecf0;
}
.tweet {
  position: relative;
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

.tweet-list {
  height: 85vh;
}
</style>