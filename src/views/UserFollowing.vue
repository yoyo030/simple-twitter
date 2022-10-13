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
            <li class="nav-user-link">追蹤者</li>
          </div>
        </router-link>
        <router-link
          class="to-user-follow"
          :to="{ name: 'user-following', params: { id: userInfo.id } }"
        >
          <div class="user-following cursor-pointer">
            <li class="nav-user-link">正在追蹤</li>
          </div>
        </router-link>
      </ul>
      <div>
        <FollowingList
         :initial-following="following" />
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
      userInfo: {},//頁面內點擊查看追蹤時，帶入id
      following: [],
      isLoading: false,
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchFollowings(id);
    this.fetchUserInfo(id) 
  },
  methods: {
    async fetchFollowings(userId) {
      try {
        this.isLoading = true;
        const response = await authorizationAPI.getFollowings(userId);
        console.log(response)
        if (response.message == "AssertionError: 這個使用者還沒有任何追隨者") {
          this.following = null
        }
        this.following = response.data;
        console.log(this.following);
        this.isLoading = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "目前無法取得跟隨者，請稍後再試",
        });
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
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    },
  },
computed: {
    //把vuex資料拿出來,得到currentUser
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  }
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
</style>