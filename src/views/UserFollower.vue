<template>
  <div class="container d-flex justify-content-center w100">
    <div class="w100 leftSection"><NavBar /></div>

    <div class="w100 centerSection">
      <div class="user-profile-title d-flex align-items-center">
        <img
          @click="$router.back()"
          src="../assets/images/back.png"
          alt=""
          class="user-back back-icon cursor-pointer"
        />
        <div class="d-flex flex-column">
          <!--待串接使用者資料與貼文總數-->
          <h5 class="user-title">{{ currentUser.name }}</h5>
          <p class="tweet-amount">{{ `${currentUser.tweet.length} 則推文` }}</p>
        </div>
      </div>
      <ul class="follow-nav cursor-pointer d-flex">
        <router-link
          class="to-user-follow"
          :to="{ name: 'user-follower', params: { id: currentUser.id } }"
        >
           <div class="user-following cursor-pointer">
            <li class="nav-user-link">追蹤者</li>
          </div>
        </router-link>
        <router-link
          class="to-user-follow"
          :to="{ name: 'user-following', params: { id: currentUser.id } }"
        >
          <div class="user-following cursor-pointer">
            <li class="nav-user-link">正在追蹤</li>
          </div>
        </router-link>
      </ul>

      <!--透過點擊li決定顯示樣板-->
      <UserFollowNav :navID="navID" />
    </div>
    <div class="w100 rightSection"><RecommandedList /></div>
  </div>
</template>


<script>
import NavBar from "../components/NavBar.vue";
import RecommandedList from "../components/RecommandedList.vue";
import UserFollowNav from "../components/UserFollowNav.vue";

export default {
  name: "UserFollow",
  components: {
    NavBar,
    RecommandedList,
    UserFollowNav,
  },
  data() {
    return {
      //先帶假資料
      currentUser: {
        id: 1,
        name: "John Doe",
        tweet: [1, 2, 3],
      },
      //動態帶入nav標題抓到點擊時的id
      navID: 1,
      navs: [
        { id: 1, title: "追蹤者" },
        { id: 2, title: "正在追蹤" },
      ],
    };
  },
  methods: {
    //透過點擊控制nav下方欲顯示樣板
    handleNav(navID) {
      this.navID = navID;
    },

  },
};
</script>

<style scoped>
.user-profile-title {
  border-bottom: 1px solid #e6ecf0;
}
.follow-nav {
  padding-top: 15px;
  border-bottom:1px solid #E6ECF0;
}
.user-following :hover {
  border-bottom: 1px solid #FF6600;
  color: #FF6600;
  padding-bottom: 14px;
}
</style>