<template>
  <div class="profile-nav-list scrollbar">
    <div class="tweet d-flex" v-for="tweet in likedTweets" :key="tweet.id">
    

        <router-link
            :to="{ name: 'user-profile', params: { id: tweet.Tweet.User.id } }"
            class=""
          >
             <img
        :src="tweet.Tweet.User.avatar | emptyImage"
        class="tweet-list-tweet-img"
        alt=""
      />
          </router-link>

      <div class="tweet-list-text d-flex flex-column">
        <div class="tweet-list-tweet-top d-flex align-items-center">
          <router-link
            :to="{ name: 'user-profile', params: { id: tweet.Tweet.User.id } }"
            class=""
          >
            <div class="tweet-user-name">
              {{ tweet.Tweet.User.name }}
            </div>
          </router-link>

          <div class="tweet-user-account">
            {{ tweet.Tweet.User.account | addPrefix }}
          </div>
          <span>・</span>
          <div class="tweet-user-createdAt">
            {{ tweet.createdAt | fromNow }}
          </div>
        </div>
        <router-link
          class="user-tweets"
          :to="{ name: 'reply-list', params: { id: tweet.TweetId } }"
        >
          <div class="tweet-contentText">
            {{ tweet.Tweet.description }}
          </div>
        </router-link>
        <div class="tweet-action d-flex">
          <div class="tweet-reply d-flex">
            <img
              src="../assets/images/reply.png"
              class="icon cursor-pointer"
              @click.stop.prevent="openModal(tweet.Tweet)"
            />
            <div class="tweet-reply-amount number-font">
              {{ tweet.Tweet.replyCount }}
            </div>
          </div>
          <div class="tweet-like d-flex">           
              <img
              v-if="!tweet.isLike"
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
              {{ tweet.Tweet.likeCount }} 
            </div>
          </div>
        </div>
      </div>
    </div>
    <ReplyModal
      v-if="show"
      @close="closeModal"
      :tweet="tweet"
      :key="tweetKey"
    />
  </div>
</template>

<script>
import { fromNowFilter } from "../utils/mixins";
import ReplyModal from "../components/ReplyModal.vue";
import { emptyImageFilter } from "./../utils/mixins";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
export default {
  name: "userLike",
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    //從userProfileNav父層 串接API資料傳入
    initialLikes: {
      type: Array,
      required: true,
    },
  },
  components: {
    ReplyModal,
  },
  data() {
    return {
      likedTweets: "",
      show: false, //控制modal用
      tweet: {},
      tweetKey: 0,
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
    this.fetchlikedTweets();
  },
  methods: {
    fetchlikedTweets() {
      this.likedTweets = this.initialLikes;
    },
    openModal(tweet) {
      this.tweet = tweet;
      (this.tweetKey = this.tweetKey + 1), (this.show = true);
    },
    closeModal() {
      this.show = false;
    },
     async like(t) {

      try {
        t.isLike = true;
        t.Tweet.likeCount = t.Tweet.likeCount + 1;
        const response = await authorizationAPI.likeTweets(
          this.currentUser.id,
          t.TweetId
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
        t.isLike = false;
        t.Tweet.likeCount = t.Tweet.likeCount - 1;
        const response = await authorizationAPI.unlikeTweets(
          this.currentUser.id,
          t.TweetId
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
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>


<style scoped>
a {
  text-decoration: none;
}
</style>