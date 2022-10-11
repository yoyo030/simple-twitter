<template>
 
      <!--透過點擊li決定顯示樣板-->
      <div>
      <UserTweets :initial-tweets="tweets"  v-if="navID === 1"/>
      <UserReplies :initial-replies="replies" v-if="navID === 2" />
      <UserLike :initial-likes="likes"  v-if="navID === 3" />
      </div>   
</template>



<script>

import UserTweets from "../components/UserTweets.vue";
import UserReplies from "../components/UserReplies.vue";
import UserLike from "../components/UserLike.vue";



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

//UserReplies用假資料(點按回覆)
const dummyData2 = {
  reply: [
    {
      id: 2,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      contentText: "一樓",
      createdAt: "2022-10-08",
    },
    {
      id: 3,
      account: "bbb123",
      name: "bbb",
      img: "../assets/images/logo-gray.png",
      contentText: "二樓",
      createdAt: "2022-10-08",
    },

    {
      id: 4,
      account: "ccc123",
      name: "ccc",
      img: "../assets/images/logo-gray.png",
      contentText: "三樓",
      createdAt: "2022-10-08",
    },
    {
      id: 5,
      account: "ccc123",
      name: "ccc",
      img: "../assets/images/logo-gray.png",
      contentText: "四樓",
      createdAt: "2022-10-08",
    },
    {
      id: 6,
      account: "ccc123",
      name: "ccc",
      img: "../assets/images/logo-gray.png",
      contentText: "五樓",
      createdAt: "2022-10-08",
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
      replies: [],
      likes: [],
    };
  },
  created() {
    this.fetchReplies();
    this.fetchLikesTweets();
    this.fetchTweets();
  },
  methods: {
    fetchTweets() {
      this.tweets = dummyData.tweets;
    },
    fetchReplies() {
      this.replies = dummyData2.reply;
    },
    fetchLikesTweets() {
      this.likes = dummyData.tweets;
    },

  },

};
</script>

<style scoped>

.profile-nav-list {
   height: 55vh;
}

</style>
