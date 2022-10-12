<template>
    <div class="profile-nav-list scrollbar">
      <div class="reply d-flex" 
        v-for="reply in replies" :key="reply.id">
        <img 
          :src="reply.User.avatar | emptyImage" 
          class="user-img" alt="" />

        <div class="reply-list-text d-flex flex-column">
          <div class="tweet-list-tweet-top d-flex align-items-center">
            <div class="tweet-user-name">
              {{ reply.User.name }}
            </div>
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
            {{ reply.User.account | addPrefix }}
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
    //從views/ReplyList帶入dummydata，待串接API以及點擊功能id===id
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


