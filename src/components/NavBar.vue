<template>
  <nav>
    <img class="navbar-logo" src="../assets/images/ac-logo.png" />
    <ul>
      <li class="home ">
        <router-link to="/home" class="">
        <img
            class="navbar-icon"
            src="../assets/images/home.png"/>
          首頁
        </router-link>
      </li>
      <li class="userprofile">
        <router-link :to="{ name: 'user-profile', params: { id: currentUser.id } }" class=""
          ><img
            class="navbar-icon"
            src="../assets/images/info.png"
          />
          個人資料
          </router-link
        >
      </li>
      <li class="setting">
        <router-link to="/setting" class="">
          <img class="navbar-icon" src="../assets/images/setting.png" />
          設定
        </router-link>
      </li>
      <li>
        <button 
          type="button" 
          class="button"
          @click.stop.prevent="openModal"
        >
          推文
        </button>
      </li>

      <li style="position: absolute; bottom: 0"
        
         @click="logout">
          <img
            class="navbar-icon"
            src="../assets/images/sign-out.png" />
            登出
 
      </li>
    </ul>
     <TweetModal
        v-if="show"
        @close="closeModal"
      />
  </nav>
</template>

<style scoped lang="scss">
@import "@/assets/styles/components/_NavBar.scss";
</style>

<script>
import TweetModal from "../components/TweetModal.vue";
import { mapState } from "vuex";

export default {
  name: "NavBar",

  components: { 
   TweetModal
  },

  data () {
    return {
      show: false //控制modal用
    }
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    },
    openModal () {
      this.show = true
    },
    closeModal () {
      this.show = false
    }
  },
   computed: {
    //把vuex資料拿出來,得到currentUser
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>

<style scoped>
