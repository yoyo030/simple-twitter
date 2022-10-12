<template>
  <div class="profile-nav-list scrollbar">
    <div class="tweet d-flex" v-for="tweet in likedTweets" :key="tweet.id">
      
      <img
        :src="tweet.Tweet.avatar | emptyImage"
        class="tweet-list-tweet-img"
        alt=""
      />

      <div class="tweet-list-text d-flex flex-column">
        <div class="tweet-list-tweet-top d-flex align-items-center">
          <div class="tweet-user-name">

             {{ tweet.Tweet.User.name }}
          </div>
          <div class="tweet-user-account">
            {{ tweet.Tweet.User.account }}

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
            <!-- {{ tweet.reply.length }}-->
            </div>
          </div>
          <div class="tweet-like d-flex">
            <img
              src="../assets/images/isliked.png"
              alt=""
              class="icon cursor-pointer"
            />
            <div class="tweet-like-amount number-font">
               {{ tweet.isLike }}
            </div>
          </div>
        </div>
      </div>
    </div>
      <ReplyModal v-if="show" @close="closeModal" :tweet="tweet" :key ="tweetKey"/>
  </div>
</template>

<script>
import { fromNowFilter } from "../utils/mixins";
import ReplyModal from "../components/ReplyModal.vue";
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "userLike",
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    //從views/ReplyList帶入dummydata，待串接API以及點擊功能id===id
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
      likedTweets: this.initialLikes,
       show: false, //控制modal用
       tweet:{},
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
  },
   methods:{
      openModal(tweet) {    
      this.tweet = tweet
      this.tweetKey = this.tweetKey + 1,
      this.show = true;
    },
     closeModal() {
      this.show = false;
    },
}
};
</script>


<style scoped>
a {
  text-decoration: none;
}
</style>