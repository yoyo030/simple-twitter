<template>
  <div class="home-tweet-container">
    <div class="home-tweet-box">
      <div class="d-flex align-items-center">
        <img
          v-if="currentUser.avatar != undefined"
          :src="currentUser.avatar"
          class="tweet-list-tweet-img"
          alt=""
        />
        <img
          v-else
          src="../assets/images/logo-gray.png"
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
          <router-link
            class="user-tweets"
            :to="{ name: 'reply-list', params: { id: tweet.id } }"
          >
            <div class="tweet-contentText">
              {{ tweet.description }}
            </div>
          </router-link>
          <div class="tweet-action d-flex">
            <div class="tweet-reply d-flex">
              <img
                src="../assets/images/reply.png"
                class="icon cursor-pointer"
                alt=""
                @click.stop.prevent="openModal ()"
              />

              <div class="tweet-reply-amount number-font">推特回應數</div>
            </div>
            <div class="tweet-like d-flex">
              <img
                src="../assets/images/like.png"
                alt=""
                class="icon cursor-pointer"
              />
              <div class="tweet-like-amount number-font">
                {{ tweet.likeAmount }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ReplyModal 
    v-if="show" 
    @close="closeModal" />
  </div>
  
</template>




<script>
import { fromNowFilter } from "./../utils/mixins";
import { mapState } from "vuex";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
import ReplyModal from "../components/ReplyModal.vue";

export default {
  name: "TweetList",
  mixins: [fromNowFilter],

  components: {
    ReplyModal,
  },
  data() {
    return {
      tweets: [],
      show: false,
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
  methods: {
    //Modal操作
    openModal () {
      this.show = true
    },
    closeModal() {
      this.show = false;
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