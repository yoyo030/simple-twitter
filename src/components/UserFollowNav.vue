<template>
 
      <!--透過點擊li決定顯示樣板-->
      <div>
      <UserFollower :initial-follower="follower"  v-if="navID === 1"/>
      <UserFollowing :initial-following="following" v-if="navID === 2" />
      </div>   
</template>



<script>
import UserFollower from "../components/UserFollower.vue";
import UserFollowing from "../components/UserFollowing.vue";

//待API串接後傳遞正確 追蹤者 資料
const dummyData = {
  follower: [
    {
      id: 2,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
    },
       {
      id: 2,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
    },   {
      id: 2,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
    },
       {
      id: 2,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
    },
       {
      id: 2,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
    },
       {
      id: 2,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
    },
       {
      id: 2,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
    },   {
      id: 2,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
    },
       {
      id: 2,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
    },
       {
      id: 2,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
    },
  ]
}
//待API串接後傳遞正確 正在追蹤 資料
const dummyData2 = {
  following: [
    {
      id: 2,
      account: "aaa123",
      name: "aaa",
      img: "../assets/images/logo-gray.png",
      description: "請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「如何烤蛋糕」，可以改為搜尋「蛋糕食譜」。",
      createdAt: "2022-10-08",
    },
  ]
}

export default {
  name: "UserProfileNav",
  components: {
    UserFollower,
    UserFollowing,
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
