<template>
  <div class="reply-tweet-container">
    <div class="reply-tweet-box">
      <div class="reply-tweet-title d-flex">
        <img :src="tweet.User.avatar | emptyImage" class="user-img" alt="" />
        <span class="info">
          <div v-if="tweet.User != null" class="name">
            {{ tweet.User.name }}
          </div>
          <div v-if="tweet.User != null" class="account">
            {{ tweet.User.account | addPrefix }}
          </div>
        </span>
      </div>
      <div class="d-flex align-items-center">
        <div class="tweet-list-contentText">{{ tweet.description }}</div>
      </div>
      <div class="reply-tweet-date">
        {{ tweet.createdAt | replyListTime }}
      </div>
      <div class="line"></div>
      <div class="reply-action-amount d-flex ">
        <div class="amount number-font d-flex">
          {{ `${tweet.replyCount}` }}
          <p>回覆</p>
        </div>
        <div class="amount number-font d-flex">
          {{ tweet.likeCount }}
          <p>喜歡次數</p>
        </div>
      </div>
      <div class="reply-action d-flex">
        <img
          src="../assets/images/reply.png"
          class="reply-reply-icon cursor-pointer"
          @click.stop.prevent="openModal(tweet)"
        />     
          <img
              v-if="!tweet.isLike"
              src="../assets/images/like.png"
              alt=""
               class="reply-like-icon cursor-pointer"
              @click="like(tweet)"
            />
            <img
              v-else
              src="../assets/images/isliked.png"
              alt=""
                class="reply-like-icon cursor-pointer"
              @click="unlike(tweet)"
            />
      </div>
    </div>

    <div class="tweet-reply-list scrollbar">
      <div class="reply d-flex" v-for="reply in tweet.reply" :key="reply.id">
        <img :src="reply.User.avatar | emptyImage" class="user-img" alt="" />

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
            {{ tweet.User.account | addPrefix }}
          </div>
          <div class="tweet-contentText">
            {{ reply.comment }}
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
  </div>
</template>

<script>
import { fromNowFilter } from "../utils/mixins";
import ReplyModal from "../components/ReplyModal.vue";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
import { emptyImageFilter } from "./../utils/mixins";
import { mapState } from "vuex";
export default {
  name: "ReplyList",
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    //從views/ReplyList帶入
    initialTweet: {
      type: Object,
      required: true,
    },
  },
  components: {
    ReplyModal,
  },
  data() {
    return {
      tweet: this.initialTweet,
      show: false, //控制modal用
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
    //控制Modal功能
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
        const response = await authorizationAPI.likeTweets(
          this.currentUser.id,
          t.id
        );
        const data = response.data;
        //console.log(data);
        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }
                t.likeCount = t.likeCount + 1
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
    //點擊愛心Like功能
    async unlike(t) {
      try {
        t.isLike = false;
        const response = await authorizationAPI.unlikeTweets(
          this.currentUser.id,
          t.id
        );
        const data = response.data;
        //console.log(data);
        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }
        t.likeCount = t.likeCount - 1
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

p {
  margin-left: 5px;
}
</style>