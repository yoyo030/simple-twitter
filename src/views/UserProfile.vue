<template>
  <div class="container d-flex justify-content-center w100">
    <div class="w100 leftSection"><NavBar /></div>
    <div class="w100 centerSection">
      <div class="user-profile-title d-flex align-items-center">
        <img
          src="../assets/images/back.png"
          alt=""
          class="user-back back-icon cursor-pointer" @click="$router.back()"
        />
        <div class="d-flex flex-column">
          <!--待串接使用者資料與貼文總數-->
          <h5 class="user-title">{{ userInfo.name }}</h5>
          <p class="tweet-amount">25則推文</p>
        </div>
      </div>
    

<img
                  v-if="userInfo.cover == undefined"
                  class="user-profile-bg"
                  src="../assets/images/bg-img.png"
                />

                <img
                  v-else
                  :src="userInfo.cover"
                  class="user-profile-bg"
                />

      <div class="user-profile-info">


       
<img
                  v-if="userInfo.avatar == undefined"
                  class="user-profile-img"
                  src="../assets/images/logo-gray.png"
                />

                <img
                  v-else
                  :src="userInfo.avatar"
                  class="user-profile-img"
                  style=""
                />

        <button v-if="this.$route.params.id==currentUser.id"
          type="button"
          style="float: right"
          class="edit-button"
          @click.stop.prevent="openModal">
          編輯個人資料
        </button>
         <button v-else
          type="button"
          style="float: right"
          class="edit-button"
          @click.stop.prevent="openModal">
          正在追蹤
        </button>

        <div class="user-profile-main">
          <h5 class="user-title">{{ userInfo.name }}</h5>
          <div class="tweet-user-account">
            {{ userInfo.account | addPrefix }}
          </div>
          <div class="tweet-contentText">{{ userInfo.introduction }}</div>
          <div class="user-follow-count d-flex">

          <router-link
            class="to-user-follow"
            :to="{ name: 'user-follower', params: { id: currentUser.id } }"
          >
            <div class="user-follower cursor-pointer">
              {{ `${userInfoFollowings>0?userInfoFollowings.length:0} 個跟隨中` }}
            </div>
          </router-link>
           <router-link
            class="to-user-follow"
            :to="{ name: 'user-following', params: {id: currentUser.id} }"
          >
            <div class="user-following cursor-pointer">
              {{ `${userInfoFollowers>0?userInfoFollowers.length:0} 位跟隨者` }}

            </div>
            </router-link>
          </div>
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
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
//UserProfile上半部顯示登入者資訊用，待串接
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
      userInfo: {},
      userInfoFollowers:[],
      userInfoFollowings:[],
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
    this.fetchUserInfo();
    this.fetchUserInfoFollowers();
    this.fetchUserInfoFollowing();
  },
  methods: {
    async fetchUserInfo() {

 try {
        //兩次輸入的密碼需相同
        const response = await authorizationAPI.getUserInfo(this.$route.params.id);
        const data = response.data;
        //console.log(data);
        this.userInfo = data;
        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }

      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
      
    },
     async fetchUserInfoFollowing() {

 try {
        //兩次輸入的密碼需相同
        const response = await authorizationAPI.getUserFollowing(this.$route.params.id);
        const data = response.data;
        //console.log(data);
        this.userInfoFollowings = data;


        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }

      } catch (error) {
        //console.log(error);
      }
      
    },
    async fetchUserInfoFollowers() {

 try {
        //兩次輸入的密碼需相同
        const response = await authorizationAPI.getUserFollowers(this.$route.params.id);
        const data = response.data;
        //console.log(data);
        this.userInfoFollowers = data;
        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }

      } catch (error) {
        //console.log(error);
      }
      
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
  computed: {
    //把vuex資料拿出來,得到currentUser
    ...mapState(["currentUser", "isAuthenticated"]),
  },
    watch: {
    '$route.params.id': function () {
      this.fetchUserInfo();
    }
  },
};
</script>

<style scoped>
