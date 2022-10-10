<template>
  <div class="reply-tweet-container">
    <div class="reply-tweet-box">
      <div class="reply-tweet-title d-flex">
        <!--待串接後改為使用者img-->
        <img class="user-img" src="../assets/images/logo-gray.png" />
        <span class="info">
          <div class="name">{{ tweet.User.name }}</div>
          <div class="account">{{ tweet.User.account | addPrefix  }}</div>
        </span>
      </div>
      <div class="d-flex align-items-center">
        <div class="tweet-list-contentText">{{ tweet.description }}</div>
      </div>
      <div class="reply-tweet-date">
        {{ tweet.createdAt | replyListTime}}
      </div>
      <div class="line"></div>
      <div class="reply-action-amount d-flex">
        <div class="amount number-font d-flex">
          <!-- {{ `${tweet.reply.length}` }} -->
          <p>回覆</p>
        </div>
        <div class="amount number-font d-flex">
          {{ tweet.likeAmount }}
          <p>喜歡次數</p>
        </div>
      </div>
      <div class="reply-action d-flex">
        <img
          src="../assets/images/reply.png"
          class="reply-reply-icon cursor-pointer"
          alt=""
        />
        <img
          src="../assets/images/like.png"
          alt=""
          class="reply-like-icon cursor-pointer"
        />
      </div>
    </div>

    <div class="tweet-reply-list scrollbar">
      <div class="reply d-flex" v-for="reply in tweet.reply" :key="reply.id">
        <!--待串接後用v-bind改為使用者img-->
        <img src="../assets/images/logo-gray.png" class="user-img" alt="" />

        <div class="reply-list-text d-flex flex-column">
          <div class="tweet-list-tweet-top d-flex align-items-center">
            <div class="tweet-user-name">
              {{ reply.name }}
            </div>
            <div class="tweet-user-account">
              {{ reply.account | addPrefix }}
            </div>
            <span>・</span>
            <div class="tweet-user-createdAt">
              {{ reply.createdAt | fromNow }}
            </div>
          </div>
          <div class="tweet-account">
            <span class="reply-span">回覆</span>
            {{ tweet.account | addPrefix }}
          </div>
          <div class="tweet-contentText">
            {{ reply.contentText }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "../utils/mixins";

export default {
  name: "ReplyList",
  mixins: [fromNowFilter],
  props: {
    //從views/ReplyList帶入dummydata，待串接API以及點擊功能id===id
    initialTweet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tweet: this.initialTweet,
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
