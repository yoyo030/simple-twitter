<template>
  <form
    @submit.prevent.stop="handleSubmit"
    class="d-flex flex-column align-items-center"
  >
    <div class="d-flex flex-column align-items-center">
      <div>
        <img class="logo" src="../assets/images/ac-logo.png" />
      </div>
      <h3 class="sign-page-title">登入 Alphitter</h3>
      <div class="sign-up-content">
        <div class="form-label-group mb-2">
          <label for="account">帳號</label>
          <input
            v-model="account"
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
            v-model="password"
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
        <button class="sign-up" type="submit" :disabled="isProcessing">
          登入
        </button>
      </div>

      <div class="login-footer-link">
        <span>
          <router-link to="/signup" class=""> 註冊 Alphitter </router-link> ．
          <router-link to="/admin/login" class=""> 後台登入 </router-link>
        </span>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
@import "@/assets/styles/main.scss";
@import "@/assets/styles/_LogIn.scss";
button:disabled {
  background: gray;
}
</style>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
export default {
  data() {
    return {
      account: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {

        //檢查必填欄位
        if (!this.account || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請填入 account 和 password",
          });
          return;
        }
        //鎖定登入鍵
        this.isProcessing = true;



        // 使用 authorizationAPI 的 signIn 方法
        // 並且帶入使用者填寫的 email 和 password
        const response = await authorizationAPI.signIn({
           account: this.account, password: this.password 
        });
        let data = response.data
        console.log(data)

        //await跑完才會來這裡,判斷身分認證是否成功
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.data.token);

        //先放一張假資料
        data.data.user.cover="https://miro.medium.com/max/720/1*XEgA1TTwXa5AvAdw40GFow.png";
        //set vuex
        this.$store.commit('setCurrentUser',data.data.user)

        // 成功登入後轉址到餐聽首頁
        this.$router.push("/home");

      } catch (error) {
        this.password = "";
        this.isProcessing = false;

        Toast.fire({
          icon: "warning",
          title: error.message,
        });
      }
    },
  },
};
</script>
