<template>
  <div class="profile-nav-list scrollbar">
   <diV class="tweet d-flex align-items-center" v-if ="!replies.length>0" > 目前無任何回應的內容</diV>
    <div class="reply d-flex" v-for="reply in replies" :key="reply.id" v-else>
    
      <router-link
            :to="{ name: 'user-profile', params: { id: reply.User.id } }"
            class=""
          >
          <img :src="reply.User.avatar | emptyImage" class="user-img" alt="" />
          </router-link>
      <div class="reply-list-text d-flex flex-column">
        <div class="tweet-list-tweet-top d-flex align-items-center">
          <router-link
            :to="{ name: 'user-profile', params: { id: reply.User.id } }"
            class=""
          >
          <div class="tweet-user-name">
            {{ reply.User.name }}
          </div>
          </router-link>
          <div class="tweet-user-account">
            {{ reply.User.account | addPrefix }}
          </div>
          <span>・</span>
          <div class="tweet-user-createdAt">
            {{ reply.createdAt | fromNow }}
          </div>
        </div>
        <div class="tweet-account">
          <span class="reply-span">回覆</span>
          {{ reply.Tweet.User.account | addPrefix }}
        </div>
        <div class="tweet-contentText">
          {{ reply.comment }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "../utils/mixins";
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "userReplies",
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
      //從userProfileNav父層 串接API資料傳入
    initialReplies: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      replies: this.initialReplies,
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


