<template>
 
      <!--透過點擊li決定顯示樣板-->
      <div>
      <UserTweets :initial-tweets="tweets" :key="tweetsKey"  v-if="navID === 1"/>
      <UserReplies :initial-replies="replies" :key="repliesKey" v-if="navID === 2" />
      <UserLike :initial-likes="likes"  v-if="navID === 3" />
      </div>   
</template>



<script>

import UserTweets from "../components/UserTweets.vue";
import UserReplies from "../components/UserReplies.vue";
import UserLike from "../components/UserLike.vue";
import authorizationAPI from "./../apis/authorization";
//import { Toast } from "./../utils/helpers";


//UserTweets用假資料(預設顯示貼文的內容)
//Userlikes用假資料(點按喜歡的內容)
const dummyData = {
  tweets: [
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      contentText: "滿員御禮!",
      createdAt: "2022-10-08",
      reply: ["good", "good", "good"],
      likeAmount: 520,
    },
    {
      id: 2,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      contentText: "滿員御禮!",
      createdAt: "2022-10-08",
      reply: ["good", "good", "good"],
      likeAmount: 520,
    },
    {
      id: 3,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      contentText: "滿員御禮!",
      createdAt: "2022-10-08",
      reply: ["good", "good", "good"],
      likeAmount: 520,
    },
    {
      id: 4,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      contentText: "滿員御禮!",
      createdAt: "2022-10-08",
      reply: ["good", "good", "good"],
      likeAmount: 520,
    },
    {
      id: 5,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      contentText: "滿員御禮!",
      createdAt: "2022-10-08",
      reply: ["good", "good", "good"],
      likeAmount: 520,
    },
    {
      id: 6,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      contentText: "滿員御禮!",
      createdAt: "2022-10-08",
      reply: ["good", "good", "good"],
      likeAmount: 520,
    },
  ],
};




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
      required: true
    },
  },
  data() {
    return {
      tweets: [],
      tweetsKey:0,
      replies: [],
      repliesKey:0,
      likes: [],
    };
  },
  created() {
    this.fetchReplies();
    this.fetchLikesTweets();
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {

    
        try {
        //兩次輸入的密碼需相同
        const response = await authorizationAPI.getUserTweets(this.$route.params.id);
        const data = response.data;
        console.log(data);

        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }

       this.tweets = data;
       this.tweetsKey = this.tweetsKey + 1
      } catch (error) {
        //console.log(error);
        this.tweets = [];
        // Toast.fire({
        //   icon: "error",
        //   title: error.message,
        // });
      }
    this.tweetsKey = this.tweetsKey + 1
    
    },
    async fetchReplies() {

              try {
        //兩次輸入的密碼需相同
        const response = await authorizationAPI.getUserReplies(this.$route.params.id);
        const data = response.data;
        console.log(data);

        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }

       this.replies = data;
   
      } catch (error) {
      this.replies = [];
       
        // Toast.fire({
        //   icon: "error",
        //   title: error.message,
        // });
      }
this.repliesKey = this.repliesKey + 1
    },
    fetchLikesTweets() {

    
      this.likes = dummyData.tweets;
    },

  },
  watch: {
    '$route.params.id': function () {
     this.fetchReplies();
     this.fetchLikesTweets();
     this.fetchTweets();
    }
  },
};
</script>

<style scoped>

.profile-nav-list {
   height: 55vh;
}

</style>
