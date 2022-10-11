<template>
 
      <!--透過點擊li決定顯示樣板-->
      <div>
      <FollowerList :initial-follower="follower"  v-if="navID === 1"/>
      <FollowingList :initial-following="following" v-if="navID === 2" />
      </div>   
</template>



<script>
import FollowerList from "../components/FollowerList.vue";
import FollowingList from "../components/FollowingList.vue";

//待API串接後傳遞正確 追蹤者 資料
const dummyData = {
  follower: [
    {
      id: 1,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: true
    },
       {
      id: 2,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: true
    },   {
      id: 3,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: true
    
    },
       {
      id: 4,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: true
    },
       {
      id: 5,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: false
    },
       {
      id: 6,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: false
    },
       {
      id: 7,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: false
    },   {
      id: 8,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: false
    },
       {
      id: 9,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: false
    },
       {
      id: 10,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: false
    },
  ]
}
//待API串接後傳遞正確 正在追蹤 資料
const dummyData2 = {
  following:[
    {
      id: 1,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: true
    },
       {
      id: 2,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: true
    },   {
      id: 3,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: true
    
    },
       {
      id: 4,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: true
    },
       {
      id: 5,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: false
    },
       {
      id: 6,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: false
    },
       {
      id: 7,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: false
    },   {
      id: 8,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: false
    },
       {
      id: 9,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: false
    },
       {
      id: 10,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
      isFollowed: false
    },
  ]
}

export default {
  name: "UserProfileNav",
  components: {
    FollowerList,
    FollowingList,
  },
   props: {
    navID: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      follower: [],
      following: [],
    };
  },
  created() {
    this.fetchFollower();
    this.fetchFollowing();

  },
  methods: {
    fetchFollower() {
      this.follower = dummyData.follower;
    },
    fetchFollowing() {
      this.following = dummyData2.following;
    },

  },

};
</script>
