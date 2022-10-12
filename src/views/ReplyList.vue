<template>
  <div class="container d-flex justify-content-center w100">
    <div class="w100 leftSection">
      <NavBar />
    </div>
    <div class="w100 centerSection">
      <div class="reply-list-top d-flex align-items-center">
        <img
          @click.stop.prevent="$router.push({path:'/home'})"
          src="../assets/images/back.png" 
          alt=""
          class="back-icon cursor-pointer" />
        <h4 class="setting-title reply-main-title">推文</h4>
      </div>
      <Replies :initial-tweet="tweet" :key=key />
    </div>
    <div class="w100 rightSection">
      <RecommandedList />
    </div>
  </div>
</template>


<script>
import NavBar from "../components/NavBar.vue";
import RecommandedList from "../components/RecommandedList.vue";
import Replies from "../components/Replies.vue";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";


export default {
  name: "ReplyList",
  components: {
    NavBar,
    RecommandedList,
    Replies,
  },

  data() {
    return {
      tweet:{},key:0
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {

        async fetchTweets() {
              
   
   
     
      try {
        const response = await authorizationAPI.getTweet(this.$route.params.id);
        const data = response.data;
        console.log(data);
        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }
       this.tweet = data;
        
      } catch (error) {
        console.log(error);
          Toast.fire({
          icon: "warning",
          title: `資料載入失敗 !`,
        });
      }

        try {
        const response1 = await authorizationAPI.getTweetReplies(this.$route.params.id);
        const data1 = response1.data;
        console.log(data1);
        if (data1.status && data1.status !== "success") {
          throw new Error(data1.message);
        }
       this.tweet.reply = data1
 
      } catch (error) {
        console.log(error);
        //   Toast.fire({
        //   icon: "warning",
        //   title: `資料載入失敗 !`,
        // });
      }

      this.key= this.key +1
    },

  },

};
</script>
