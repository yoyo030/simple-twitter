<template>
  <div class="container d-flex justify-content-center w100">
    <div class="w100 leftSection">
      <NavBar />
    </div>
    <div class="w100 centerSection">
      <div class="reply-list-top d-flex align-items-center">
        <img src="../assets/images/back.png" alt="" class="back-icon cursor-pointer" />
        <h4 class="setting-title reply-main-title">推文</h4>
      </div>
      <TweetReply :initial-tweet="tweet" />
    </div>
    <div class="w100 rightSection">
      <RecommandedList />
    </div>
  </div>
</template>


<script>
import NavBar from "../components/NavBar.vue";
import RecommandedList from "../components/RecommandedList.vue";
import TweetReply from "../components/TweetReply.vue";

const dummyData = {
  tweet: 
    {
      id: 1,
      account: "apple123",
      name: "Apple",
      img: "../assets/images/logo-gray.png",
      contentText: "一袋米要扛幾樓?",
      createdAt: "2022-10-08",
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
      ],

      likeAmount: 520,
    },
  
};

export default {
  name: "ReplyList",
  components: {
    NavBar,
    RecommandedList,
    TweetReply,
  },

  data() {
    return {
      tweet: [],
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    fetchTweets() {
      this.tweet = dummyData.tweet;
    },
  },
};
</script>
