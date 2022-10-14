<template>
  <nav>
    <img class="navbar-logo" src="../assets/images/ac-logo.png" />
    <ul>
      <li class="home d-flex">
        <router-link to="/admin/tweets" class="adminTweets">
          <img class="navbar-icon" src="../assets/images/home.png" />
          <h5 class="nav-tweet">推文清單</h5>
        </router-link>
      </li>
      <li class="userprofile">
        <router-link to="/admin/userlist" class="adminUserlist d-flex"
          ><img class="navbar-icon" src="../assets/images/info.png" />
          <h5 class="nav-user">使用者列表</h5>
        </router-link>
      </li>

      <li style="position: absolute; bottom: 0" @click="logout">
        <img class="navbar-icon" src="../assets/images/sign-out.png" />
        登出
      </li>
    </ul>
  </nav>
</template>



<style scoped lang="scss">
nav > ul {
  list-style: none; /* 移除項目符號 */
  height: 100%;
  margin: 0;
  padding: 0;
  line-height: 26px;
}
h5 {
  color: #44444f;
}
nav a {
  color: inherit; /* 移除超連結顏色 */
  display: block; /* 讓 <a> 填滿 <li> */
  font-size: 1rem;
  padding: 10px;
  text-decoration: none; /* 移除超連結底線 */
}

/* 滑鼠移到 <a> 時變成深底淺色 */
a.active {
  color: #ff6600;
}
.userprofile > .active > img {
  content: url("../assets/images/info-active.png");
}
.home > .active > img {
  content: url("../assets/images/home-active.png");
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
.navbar-icon {
  width: 22px;
  height: 20.25px;
  bottom: 0px;
  margin: 10px 17.62px 0 0;
}
</style>