<template>
  <div class="container d-flex justify-content-center">
    <div class="admin-side-bar">
      <nav>
        <img class="navbar-logo" src="../assets/images/ac-logo.png" />
        <ul>
          <li class="home d-flex align-items-center">
            <router-link to="/admin/tweets" class="adminTweets">
              <img
                class="admin-navbar-icon"
                src="../assets/images/home-active.png"
              />
              <h5 class="nav-tweet">推文清單</h5>
            </router-link>
          </li>
          <li class="userprofile">
            <router-link to="/admin/userlist" class="adminUserlist d-flex"
              ><img class="admin-navbar-icon" src="../assets/images/info.png" />
              <h5 class="nav-user">使用者列表</h5>
            </router-link>
          </li>

          <li style="position: absolute; bottom: 0" @click="logout">
            <img
              class="admin-navbar-icon"
              src="../assets/images/sign-out.png"
            />
            登出
          </li>
        </ul>
      </nav>
    </div>

    <AdminTweetList />
  </div>
</template>

<script>
import AdminTweetList from "../components/AdminTweetList.vue";

export default {
  components: {
    AdminTweetList,
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 95%;
}

.admin-side-bar {
  width: 200px;
  height: 100%;
}

nav > ul {
  list-style: none; /* 移除項目符號 */
  height: 100%;
  margin-top: 29px;
  padding: 0;
  line-height: 26px;
}

nav a {
  color: inherit; /* 移除超連結顏色 */
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding-bottom: 40px;
  text-decoration: none; /* 移除超連結底線 */
}

h5 {
  color: #44444f;
}

.nav-tweet {
  color: #ff6600;
}

button {
  all: unset;
}
.button {
  width: 100%;
  height: 2rem;
  font-size: 1rem;
  color: white;
  text-align: center;
  background: #ff6600;
  border-radius: 50px;
}
.navbar-logo {
  width: 40px;
  height: 40px;
  margin: 10px auto auto auto;
}
.admin-navbar-icon {
  width: 22px;
  height: 20.25px;
  bottom: 0px;
  margin-right: 17.62px;
}
</style>