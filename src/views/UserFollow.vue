<template>
  <div class="container d-flex justify-content-center w100">
    <div class="w100 leftSection"><NavBar /></div>

    <div class="w100 centerSection">
      <div class="user-profile-title d-flex align-items-center">
        <img
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
      <ul class="user-profile-nav user-nav-group cursor-pointer d-flex">
        <li
          class="nav-user-link"
          v-for="nav in navs"
          :key="nav.id"
          @click.stop.prevent="handleNav(nav.id)"
        >
          {{ nav.title }}
        </li>
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
    UserFollowNav
  },
  data() {
    return {
      //先帶假資料
      currentUser: {
        name: "John Doe",
        tweet: [1, 2, 3],
      },
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
}
}
</script>

<style scoped>

.user-profile-title {
  border-bottom: 1px solid #E6ECF0;
}

</style>