<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<template>
  <form class="d-flex flex-column align-items-center">
    <div class="d-flex flex-column align-items-center">
      <div>
        <img class="logo" src="../assets/images/ac-logo.png" />
      </div>

      <h3 class="sign-page-title">後台登入 Alphitter</h3>

      <div class="sign-up-content">
        <div class="form-label-group mb-2">
          <label for="account">帳號</label>
          <input
            id="account"
            name="account"
            type="text"
            class="form-control"
            placeholder="請輸入帳號"
            autocomplete="useraccount"
            required
            autofocus
          />
        </div>

        <div class="form-label-group mb-3">
          <label for="password">密碼</label>
          <input
            id="password"
            name="password"
            type="password"
            class="form-control"
            placeholder="請輸入密碼"
            autocomplete="new-password"
            required
          />
        </div>
      </div>

      <div class="sign-up-button">
        <button class="sign-up" type="submit">登入</button>
      </div>

      <div class="login-footer-link">
        <span>
          <router-link to="/login" class=""> 前台登入 </router-link>
        </span>
      </div>
    </div>
  </form>
</template>


<style scoped lang="scss">
@import "@/assets/styles/main.scss";
@import "@/assets/styles/_AdminLogIn.scss";
</style>


