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
          <p class="tweet-amount">25則推文</p>
        </div>
      </div>
      <img class="user-profile-bg" src="../assets/images/bg-img.png" />
      <div class="user-profile-info">
        <img class="user-profile-img" src="../assets/images/logo-gray.png" />
        <button type="button" style="float: right" class="edit-button">
          編輯個人資料
        </button>

        <div style="padding-left: 16.13px">
          <h5 class="user-title">{{ currentUser.name }}</h5>
          <div class="tweet-user-account">
            {{ currentUser.account | addPrefix }}
          </div>
          <div class="tweet-contentText">{{ currentUser.contentText }}</div>
          <div class="user-follow-count d-flex">
            <div class="user-following">
              {{ `${currentUser.following} 個跟隨中` }}
            </div>
            <div class="user-follower">
              {{ `${currentUser.follower} 位跟隨者` }}
            </div>
          </div>
        </div>
      </div>

      <div class="nav-group">
        <ul class="nav-ul-group">
          <li class="nav-li nav-user-tweets cursor-pointer">推文</li>
          <li class="nav-li nav-user-replies cursor-pointer">推文與回覆</li>
          <li class="nav-li nav-user-likes cursor-pointer">喜歡的內容</li>
        </ul>
      </div>
      <!--透過點擊li決定顯示樣板-->
      <UserTweets/>
      <UserReplies/>
      <UserLike />

    </div>
    <div class="w100 rightSection">
      <RecommandedList />

    </div>
  </div>
</template>



<script>
import NavBar from "../components/NavBar.vue";
import RecommandedList from "../components/RecommandedList.vue";
import UserTweets from "../components/UserTweets.vue";
import UserReplies from "../components/UserReplies.vue";
import UserLike from "../components/UserLike.vue";




const dummyUser = {
  currentUser: {
    id: 1,
    account: "heyjoin",
    name: "John Doe",
    img: "../assets/images/logo-gray.png",
    contentText:
      "青花椰菜該如何料理，才能吃出美味及營養呢？青花椰菜爽脆可口，透過清蒸方式來烹調，是保留營養價值最好的烹調方式。",
    following: "34",
    follower: "59",
  },
};

export default {
  name: "UserProfile",
  components: {
    NavBar,
    RecommandedList,
    UserTweets,
    UserReplies,
    UserLike
  },
  data() {
    return {
      currentUser: "",
    };
  },
  created() {
    this.fetchCurrentUser();
  },
  methods: {
    fetchCurrentUser() {
      this.currentUser = dummyUser.currentUser;
      console.log(this.currentUser);
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
};
</script>
