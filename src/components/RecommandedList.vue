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
            <div class="name">
              {{ user.name }}
            </div>
            <div class="account">
              {{ user.account | addPrefix }}
            </div>
          </span>
          <button
           v-if="user.isFollowed"
           class="btn-isFollowed"
           @click.stop.prevent="unFollowed(user.id)"> 
           正在跟隨
          </button>
          <button
           v-else
            class="btn-unFollow"
            @click.stop.prevent="followed(user.id)">
            跟隨
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
      id: 2,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: true,
    },
    {
      id: 3,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: false,
    },
    {
      id: 4,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: false,
    },
    {
      id: 5,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: false,
    },
    {
      id: 6,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: false,
    },
    {
      id: 7,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: false,
    },
    {
      id: 8,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: false,
    },
    {
      id: 9,
      account: "apple123",
      name: "apple",
      img: "../assets/images/logo-gray.png",
      introduction: "滿員御禮!",
      isFollowed: false,
    },
    {
      id: 10,
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
    followed (userId) {
      this.userList = this.userList.map((user) => {
       if (user.id === userId) {
            return {
              ...user,
              isFollowed: true,
            };
          }
          return user;
        })
    },
    unFollowed (userId) {
      this.userList = this.userList.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowed: false,
            };
          }
          return user;
        });
    }
  
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