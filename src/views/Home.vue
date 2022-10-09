<template>

  <div class="container d-flex justify-content-center w100">
      <div class="w100 leftSection"><NavBar /></div>
      <div class="w100 centerSection">
        <h4 class="setting-title main-title">首頁</h4>
         <div class="home-tweet-box">
      <div class="d-flex align-items-center">
        <img src="../assets/images/ac-logo.png" class="home-tweet-img" alt="" />
        <textarea
          class="home-tweet-input"
          type="text"
          name="home-tweet-input"
          placeholder="有什麼新鮮事？"
        />
      </div>
      <button class="home-tweet-button">推文</button>
    </div>
        <TweetList :initial-tweets="tweets"/>
      </div>
      <div class="w100 rightSection"><RecommandedList /></div>
    </div>

</template>


<script>
import NavBar from "../components/NavBar.vue";
import RecommandedList from "../components/RecommandedList.vue";
import TweetList from "../components/TweetList.vue";

const dummyData = {
  tweets: [  
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      contentText: "滿員御禮!",
      createdAt: "2022-10-08",
      reply: [
        "good", "good", "good"
      ],
      likeAmount: 520      
    },
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      contentText: "滿員御禮!",
      createdAt: "2022-10-08",
      reply: [
        "good", "good", "good"
      ],
      likeAmount: 520     
    },
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      contentText: "滿員御禮!",
      createdAt: "2022-10-08",
      reply: [
        "good", "good", "good"
      ],
      likeAmount: 520      
    },  
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      contentText: "滿員御禮!",
      createdAt: "2022-10-08",
      reply: [
        "good", "good", "good"
      ],
      likeAmount: 520  
    },
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      contentText: "滿員御禮!",
      createdAt: "2022-10-08",
      reply: [
        "good", "good", "good"
      ],
      likeAmount: 520      
    },
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      contentText: "滿員御禮!",
      createdAt: "2022-10-08",
      reply: [
        "good", "good", "good"
      ],
      likeAmount: 520      
    },

  ]
}

export default {
  name: "Home",
  components: { 
    NavBar,
    RecommandedList,
    TweetList
  },

  data() {
    return {
      tweets: [],
    }
  },
  created() {
    this.fetchTweets()
  },
  methods: {
    fetchTweets() {
        this.tweets = dummyData.tweets
      }
    }
 
};

//串接API用程式碼(async/await語法)
//async fetchTweets() {
//      try {
//        this.isLoading = true
//        const { data } = await tweetAPI.getAll()
//        if (data.status === 'error') {
//          throw new Error(data.message)
//        }
//        this.tweets = data
//        this.isLoading = false
//      } catch (error) {
//        this.isLoading = false
//        console.error
//      }
//    }
</script>
