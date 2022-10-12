<template>
  <div class="home-tweet-container">
    <div class="home-tweet-box">
      <div class="d-flex align-items-center">
        <!--目前使用者的大頭貼-->
        <img
          :src="currentUser.avatar | emptyImage"
          class="tweet-list-tweet-img"
          alt=""
        />
        <textarea
          class="home-tweet-input"
          type="text"
          name="home-tweet-input"
          placeholder="有什麼新鮮事？"
        />
      </div>
      <button class="home-tweet-button">推文</button>
    </div>

    <div class="tweet-list scrollbar">
      <div class="tweet d-flex" v-for="tweet in tweets" :key="tweet.id">
        <!--待串接後用v-bind改為使用者img-->
        <router-link
          :to="{ name: 'user-profile', params: { id: tweet.User.id } }"
          class=""
          ><img
            :src="tweet.User.avatar | emptyImage"
            class="tweet-list-tweet-img"
            alt=""
          />
        </router-link>

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
          <router-link
            class="user-tweets"
            :to="{ name: 'reply-list', params: { id: tweet.id } }"
          >
            <div class="tweet-contentText">
              {{ tweet.description | sliceTweet }}
            </div>
          </router-link>
          <div class="tweet-action d-flex">
            <div class="tweet-reply d-flex">
              <img
                src="../assets/images/reply.png"
                class="icon cursor-pointer"
                alt=""
                @click.stop.prevent="openModal(tweet)"
              />

              <div class="tweet-reply-amount number-font">
                {{ tweet.replyCount }}
              </div>
            </div>
            <div class="tweet-like d-flex">
              <img
                v-if="!tweet.islike"
                src="../assets/images/like.png"
                alt=""
                class="icon cursor-pointer"
                @click="like(tweet)"
              />
              <img
                v-else
                src="../assets/images/isliked.png"
                alt=""
                class="icon cursor-pointer"
                @click="unlike(tweet)"
              />

              <div class="tweet-like-amount number-font">
                {{ tweet.likeCount }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ReplyModal v-if="show" @close="closeModal" :tweet="tweet" :key ="tweetKey"/>
  </div>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";
import { mapState } from "vuex";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
import ReplyModal from "../components/ReplyModal.vue";
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "TweetList",
  mixins: [fromNowFilter, emptyImageFilter],

  components: {
    ReplyModal,
  },
  data() {
    return {
      tweets: [],
      show: false, //控制modal用
      tweet: {},
      tweetKey:0
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
    //首頁顯示推文字數超過95字，後面隱藏(待確認是否需要此功能)
    sliceTweet(description) {
      if (description.length > 95) {
        return `${description.slice(0, 95)}...`;
      }
      return description;
    },
  },
  methods: {
    //Modal操作
    openModal(tweet) {
      this.tweet = tweet
      this.tweetKey = this.tweetKey + 1,
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
    async like(t) {
      try {
        t.islike = true;
        t.likeCount = t.likeCount + 1;
        const response = await authorizationAPI.likeTweets(
          this.currentUser.id,
          t.id
        );
        const data = response.data;
        //console.log(data);
        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "按讚成功!",
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "warning",
          title: error.message,
        });
      }
    },
    async unlike(t) {
      try {
        t.islike = false;
        t.likeCount = t.likeCount - 1;
        const response = await authorizationAPI.unlikeTweets(
          this.currentUser.id,
          t.id
        );
        const data = response.data;
        //console.log(data);
        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "成功收回讚!",
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "warning",
          title: error.message,
        });
      }
    },

    // 點擊回覆時將該筆推文發給modal
    clickOnReply(tweetId) {
      this.show = true;
      this.tweetForModal = this.tweets.filter((tweet) => tweet.id === tweetId);
      console.log(tweetId);
      console.log(this.tweetForModal);
    },

    async fetchTweets() {
      try {
        const response = await authorizationAPI.getTweets();
        const data = response.data;
        //console.log(data);
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
  },
  created() {
    this.fetchTweets();
  },

  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>

<style scoped>
a,
a:hover {
  text-decoration: none;
}
</style>
