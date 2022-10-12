<template>
  <div class="reply-tweet-container">
    <div class="reply-tweet-box">
      <div class="reply-tweet-title d-flex">
        <!--待串接後改為使用者img-->
        <img class="user-img" src="../assets/images/logo-gray.png" />
        <span class="info">
          <div v-if ="tweet.User!=null" class="name">{{ tweet.User.name }}</div>
          <div v-if ="tweet.User!=null" class="account">{{ tweet.User.account | addPrefix  }}</div>
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
          src="../assets/images/like.png"
          alt=""
          class="reply-like-icon cursor-pointer"
        />
      </div>
    </div>

    <div class="tweet-reply-list scrollbar">
      <div class="reply d-flex" v-for="reply in tweet.reply" :key="reply.id">
 
        <img
         :src="reply.avatar | emptyImage"
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
              {{ reply.User.createdAt | fromNow }}
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
         <ReplyModal v-if="show" @close="closeModal" :tweet="tweet" :key ="tweetKey"/>
    </div>

  </div>
</template>

<script>
import { fromNowFilter } from "../utils/mixins";
<<<<<<< HEAD
import ReplyModal from "../components/ReplyModal.vue";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
=======
import { emptyImageFilter } from "./../utils/mixins";

>>>>>>> feature/mixins公式帶入
export default {
  name: "ReplyList",
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    //從views/ReplyList帶入dummydata，待串接API以及點擊功能id===id
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
methods:{
      openModal(tweet) {  
      this.tweet = tweet
      this.tweetKey = this.tweetKey + 1,
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
    //尚未綁定按鈕
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

}
   
 

};
</script>
