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
              @click.stop.prevent="openModal(tweet)"
            />
            <div class="tweet-reply-amount number-font">
              {{ tweet.replyCount }} 
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
               {{ tweet.likeCount }}
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
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
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
       show: false, //控制modal用
    };
  },  
  components: {
    ReplyModal,
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
        async like(t) {
   
      try {
        t.isLike = true;
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
        t.isLike = false;
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