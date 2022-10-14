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
          <h5 class="user-title">{{ userInfo.name }}</h5>
          <p class="tweet-amount">{{ `${userInfo.TweetCount} 則推文` }}</p>
        </div>
      </div>
      <ul class="follow-nav cursor-pointer d-flex">
        <router-link
          class="to-user-follow"
          :to="{ name: 'user-follower', params: { id: userInfo.id } }"
        >
          <div class="user-following cursor-pointer">
            <li class="nav-user-link">追隨者</li>
          </div>
        </router-link>
        <router-link
          class="to-user-follow"
          :to="{ name: 'user-following', params: { id: userInfo.id } }"
        >
          <div class="user-following cursor-pointer">
            <li class="nav-user-link">正在追隨</li>
          </div>
        </router-link>
      </ul>
      <div>
        <FollowingList
         :initial-following="userInfoFollowings"
         :key="followingkey" />
      </div>
    </div>
    <div class="w100 rightSection"><RecommandedList /></div>
  </div>
</template>


<script>
import NavBar from "../components/NavBar.vue";
import RecommandedList from "../components/RecommandedList.vue";
import FollowingList from "../components/FollowingList.vue";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "UserFollow",
  components: {
    NavBar,
    RecommandedList,
    FollowingList,
  },
  data() {
    return {
      userInfo: {}, //頁面內點擊查看追蹤時，帶入id
      userInfoFollowings: [],
      isLoading: false,
      followingkey: 0
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUserInfoFollowing(id);
    this.fetchUserInfo(id);
  },
  methods: {
    async fetchUserInfoFollowing() {
      try {
        //兩次輸入的密碼需相同
        const response = await authorizationAPI.getUserFollowing(
          this.$route.params.id
        )
        const data = response.data;
        //以是否為陣列來判斷有無追蹤
        if (Array.isArray(response.data) === false) {
          throw new Error(response.data.message)
        }
        this.userInfoFollowings = data;
        this.followingkey = this.followingkey + 1

      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
        console.log(error.message)
      }
    },
    async fetchUserInfo(id) {
      try {
        //兩次輸入的密碼需相同
        const response = await authorizationAPI.getUserInfo(id);
        const data = response.data;
        console.log(data);
        this.userInfo = data;
        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    //把vuex資料拿出來,得到currentUser
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>

<style scoped>
.user-profile-title {
  border-bottom: 1px solid #e6ecf0;
}
.follow-nav {
  padding-top: 15px;
  border-bottom: 1px solid #e6ecf0;
}
.user-following :hover {
  border-bottom: 1px solid #ff6600;
  color: #ff6600;
  padding-bottom: 14px;
}
.router-link-active .user-following .nav-user-link {
  border-bottom: 1px solid #ff6600;
  color: #ff6600;
  padding-bottom: 14px;
}
</style>