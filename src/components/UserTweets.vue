<template>
  <div class="profile-nav-list scrollbar">
    <div class="tweet d-flex" v-for="tweet in tweets" :key="tweet.id">
      <!--待串接後用v-bind改為使用者img-->
      <img
        src="../assets/images/logo-gray.png"
        class="tweet-list-tweet-img"
        alt=""
      />

      <div class="tweet-list-text d-flex flex-column">
        <div class="tweet-list-tweet-top d-flex align-items-center">
          <div class="tweet-user-name">
            {{ tweet.name }}
          </div>
          <div class="tweet-user-account">
            {{ tweet.account | addPrefix }}
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
            {{ tweet.contentText }}
          </div>
        </router-link>
        <div class="tweet-action d-flex">
          <div class="tweet-reply d-flex">
            <img
              src="../assets/images/reply.png"
              class="icon cursor-pointer"
              alt=""
            />
            <div class="tweet-reply-amount number-font">
              {{ tweet.reply.length }}
            </div>
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
</template>

<script>
import { fromNowFilter } from "../utils/mixins";

export default {
  name: "userTweets",
  mixins: [fromNowFilter],
  props: {
    //從views/ReplyList帶入dummydata，待串接API以及點擊功能id===id
    initialTweets: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tweets: this.initialTweets,
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
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>