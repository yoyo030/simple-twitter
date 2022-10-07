<template>
  <div class="recommended-list">
    <div class="list-container">
      <div class="list-header">
        <h4>推薦跟隨</h4>
      </div>
      <div v-for="user in userList" :key="user.id">

        <div class="user-container d-flex">
          <img class="user-img" :src="user.img" />
          <span class="info">
            <div class="recommended-name">
              {{ user.name }}
            </div>
            <div class="recommended-account">
              {{ user.account | addPrefix }}
            </div>
          </span>
          <button v-if="user.isFollowed"
            class="btn-isFollowed" >          
            {{ user.isFollowed ? "正在跟隨" : "跟隨" }}
          </button>
           <button v-else
            class="btn-unFollow" >          
            {{ user.isFollowed ? "正在跟隨" : "跟隨" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
const dummyData = {
  user: [
    // 10個假資料，待API串接
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: true,
    },
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: true,
    },
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: false,
    },
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: false,
    },
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: false,
    },
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: false,
    },
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: false,
    },
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: false,
    },
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: false,
    },
    {
      id: 1,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: false,
    },
  ],
};

export default {
  data() {
    return {
      userList: [],
    };
  },
  created() {
    this.fetchRecommendedlist();
  },
  methods: {
    fetchRecommendedlist() {
      this.userList = dummyData.user;
    },
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
  //串接API後使用，本人以外挑選10個
  //computed: {
  //filteredUserLIst () {
  //  return this.userList.filter(user => user.id !== this.userId).slice(0, 10)
  // }
  // },
};
</script>