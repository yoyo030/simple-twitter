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
        <button
          type="button"
          style="float: right"
          class="edit-button"
          @click.stop.prevent="openModal">
          編輯個人資料
        </button>

        <div class="user-profile-main">
          <h5 class="user-title">{{ currentUser.name }}</h5>
          <div class="tweet-user-account">
            {{ currentUser.account | addPrefix }}
          </div>
          <div class="tweet-contentText">{{ currentUser.introduction }}</div>
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

      <div class="user-profile-nav">
        <ul class="user-nav-group cursor-pointer d-flex">
          <li
            class="nav-user-link"
            v-for="nav in navs"
            :key="nav.id"
            @click.stop.prevent="handleNav(nav.id)"
          >
            {{ nav.title }}
          </li>
        </ul>
      </div>
      <!--透過點擊li決定顯示樣板-->
      <UserProfileNav :navID="navID" />
    </div>
    <div class="w100 rightSection">
      <RecommandedList />
    </div>
    <EditModal @after-submit="afterSubmit" 
     v-if="show"
     @close="closeModal"
     :initialUser="currentUser"
      />
  </div>
</template>



<script>
import NavBar from "../components/NavBar.vue";
import RecommandedList from "../components/RecommandedList.vue";
import UserProfileNav from "../components/UserProfileNav.vue";
import EditModal from "../components/EditModal.vue";

//UserProfile上半部顯示登入者資訊用，待串接
const dummyUser = {
  currentUser: {
    id: 1,
    account: "heyjoin",
    name: "John Doe",
    img: "../assets/images/logo-gray.png",
    introduction:
      "青花椰菜該如何料理，才能吃出美味及營養呢？青花椰菜爽脆可口，透過清蒸方式來烹調，是保留營養價值最好的烹調方式。",
    cover: "../assets/images/bg-img.png",
    following: "34",
    follower: "59",
  },
};

export default {
  name: "UserProfile",
  components: {
    NavBar,
    RecommandedList,
    UserProfileNav,
    EditModal,
  },
  data() {
    return {
      currentUser: {},
      navID: 1,
      navs: [
        { id: 1, title: "推文" },
        { id: 2, title: "推文與回覆" },
        { id: 3, title: "喜歡的內容" },
      ],
      show: false //控制modal用
    };
  },
  created() {
    this.fetchCurrentUser();
  },
  methods: {
    fetchCurrentUser() {
      this.currentUser = dummyUser.currentUser;
    },
    //透過點擊控制nav下方欲顯示樣板
    handleNav(navID) {
      this.navID = navID;
    },
    //Modal操作
    openModal () {
      this.show = true
    },
    closeModal() {
      this.show = false;
    },
    //接收編輯資料後傳送後端儲存
    afterSubmit(formData) {
      console.log(formData);
      // 透過 API 將表單資料送到伺服器
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }

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
};
</script>
