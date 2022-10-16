<template>
  <!--透過點擊li決定顯示樣板-->
  <div>
    <UserTweets :initial-tweets="tweets" :key="tweetsKey" v-if="navID === 1" />
    <UserReplies
      :initial-replies="replies"
      :key="repliesKey"
      v-if="navID === 2"
    />
    <UserLike :initial-likes="likes" :key="likesKey" v-if="navID === 3" />
  </div>
</template>

<script>
import UserTweets from "../components/UserTweets.vue";
import UserReplies from "../components/UserReplies.vue";
import UserLike from "../components/UserLike.vue";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  name: "UserProfileNav",
  components: {
    UserTweets,
    UserReplies,
    UserLike,
  },
  props: {
    navID: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      tweets: [],
      tweetsKey: 0,
      replies: [],
      repliesKey: 0,
      likes: [],
      likesKey: 0,
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await authorizationAPI.getUserTweets(
          this.$route.params.id
        );
        const data = response.data;
        console.log(data);

        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }

        this.tweets = data;
      } catch (error) {
        //console.log(error);
        this.tweets = [];
        if (!error.message.includes("沒有")) {
          Toast.fire({
            icon: "error",
            title: error.message,
          });
        }
      }
      this.tweetsKey = this.tweetsKey + 1;
      this.$emit("tweetCount", this.tweets.length);
    },
    async fetchReplies() {
      try {
        const response = await authorizationAPI.getUserReplies(
          this.$route.params.id
        );
        const data = response.data;
        console.log(data);
        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }

        this.replies = data;
      } catch (error) {
        this.replies = [];

        if (!error.message.includes("沒有")) {
          Toast.fire({
            icon: "error",
            title: error.message,
          });
        }
      }
      this.repliesKey = this.repliesKey + 1;
    },
    async fetchLikesTweets() {
      try {
        const response = await authorizationAPI.getlikeTweets(
          this.$route.params.id
        );
        const data = response.data;
        console.log(data);
        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }
        this.likes = data;
      } catch (error) {
        this.likes = [];
        if (!error.message.includes("沒有")) {
          Toast.fire({
            icon: "error",
            title: error.message,
          });
        }
      }
      this.likesKey = this.likesKey + 1;
    },
  },
  watch: {
    "$route.params.id": function () {
      this.fetchReplies();
      this.fetchLikesTweets();
      this.fetchTweets();
    },

    navID: {
      handler() {
        if (this.navID === 2) {
          this.fetchReplies();
        } else if (this.navID === 3) {
          this.fetchLikesTweets();
        } else {
          this.fetchTweets();
        }
      },
      // 增加了immediate属性，說明監聽到props傳参後立即先去執行handler方法
      immediate: true,
    },
  },
};
</script>
