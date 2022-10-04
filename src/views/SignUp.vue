<template>
  <div class="form-container ">
    <form class="main d-flex flex-column align-items-center">
      <div class="sign-up-heading">
        <img class="logo" src="../assets/images/ac-logo.png" />
        </div>
        <h3 class="sign-page-title">建立你的帳號</h3>
      
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
        <div class="form-label-group mb-2">
          <label for="name">名稱</label>
          <input
            id="name"
            name="name"
            type="text"
            class="form-control"
            placeholder="請輸入名稱"
            autocomplete="username"
            required
            autofocus
          />
        </div>

        <div class="form-label-group mb-2">
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            class="form-control"
            placeholder="請輸入Email"
            autocomplete="email"
            required
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

        <div class="form-label-group mb-3">
          <label for="password-check">密碼確認</label>
          <input
            id="password-check"
            name="passwordCheck"
            type="password"
            class="form-control"
            placeholder="請再次輸入密碼"
            autocomplete="new-password"
            required
          />
        </div>
      </div>
      <div class="sign-up-button">
        <button class="sign-up" type="submit">註冊</button>
      </div>
      <div class="cancel">
        <router-link to="/signin" class="cancel"> 取消 </router-link>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
@import "../assets/styles/main.scss";

button {
  @extend %sign-button;
}
.form-label-group {
  @extend %form-setting;
}
label {
  @include font-setting(14px, 400, $dark-80, 22px);
}

.logo {
  width: 40px;
  height: 40px;
  margin: 69px auto 29px auto;
}

.sign-page-title {
  margin-bottom:  40px;
}
</style>