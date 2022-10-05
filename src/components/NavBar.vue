<template>
  <nav>
    <img class="navbar-logo" src="../assets/images/ac-logo.png" />
    <ul>
      <li class="home">
        <router-link to="/home" class=""><img class="navbar-icon" src="../assets/images/home.png" />首頁</router-link
        >
      </li>
      <li class="userprofile">       
           <router-link to="/userprofile" class=""><img
            class="navbar-icon"
            src="../assets/images/info.png"
          />個人資料</router-link>
      </li>
      <li class="setting">
        <router-link to="/setting" class=""><img class="navbar-icon" src="../assets/images/setting.png" />設定</router-link
        >
      </li>
      <li>
        <a href="#"></a><button type="button" class="button">推文</button>
      </li>

      <li style="position: absolute; bottom: 0">
        <a href="#"
          ><img
            class="navbar-icon"
            src="../assets/images/sign-out.png"
          />登出</a
        >
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
