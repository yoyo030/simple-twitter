<template>
  <nav>
    <img class="navbar-logo" src="../assets/images/ac-logo.png" />
    <ul>
      <li class="home">
        <router-link to="/admin/userlist" class="">
          <img class="navbar-icon" src="../assets/images/home.png" />
          推文清單
        </router-link>
      </li>
      <li class="userprofile">
        <router-link to="/userprofile" class=""
          ><img
            class="navbar-icon"
            src="../assets/images/info.png"
          />使用者列表</router-link
        >
      </li>

      <li style="position: absolute; bottom: 0" @click="logout">
        <img class="navbar-icon" src="../assets/images/sign-out.png" />
        登出
      </li>
    </ul>
  </nav>
</template>


<style scoped lang="scss">
@import "@/assets/styles/components/_NavBar.scss";
</style>

<script>
export default {
  name: "NavBar",
};
</script>

