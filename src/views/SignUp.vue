<template>
  <div class="form-container">
    <form
      @submit.prevent.stop="handleSubmit"
      class="main d-flex flex-column align-items-center"
    >
      <div class="sign-up-heading">
        <img class="logo" src="../assets/images/ac-logo.png" />
      </div>
      <h3 class="sign-page-title">建立你的帳號</h3>

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
        <div class="form-label-group mb-2">
          <label for="name">名稱</label>
          <input
            v-model="name"
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
            v-model="email"
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

        <div class="form-label-group mb-3">
          <label for="password-check">密碼確認</label>
          <input
            v-model="passwordCheck"
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

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
export default {
  name: "SignUp",
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    };
  },
  methods: {
    async handleSubmit() {
      // const data = JSON.stringify({
      //   account: this.account,
      //   name: this.name,
      //   email: this.email,
      //   password: this.password,
      //   passwordCheck: this.passwordCheck,
      // });

      try {
        if (
          !this.account ||
          !this.name ||
          !this.email ||
          !this.password ||
          !this.passwordCheck
        ) {
          Toast.fire({
            icon: "warning",
            title: "請填寫所有欄位",
          });
          return;
        }
        if (this.password !== this.passwordCheck) {
          Toast.fire({
            icon: "warning",
            title: "兩次輸入的密碼需相同",
          });
          this.passwordCheck = "";
          return;
        }

        const response = await authorizationAPI.signUp({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.passwordCheck,
        });

        if (response.data.status !== "success") {
          throw new Error(response.data.message);
        }

        Toast.fire({
          icon: "success",
          title: `註冊成功，歡迎 ${response.data.data.user.name} !`,
        });
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "此帳號已存在",
        });
      }
    },
  },
};

/////////串接API後 更改程式碼、新增前端錯誤提示///////////
//async handleSubmit() {
//     try {
//if (
//         !this.account ||
//         !this.name ||
//         !this.email ||
//        !this.password ||
//         !this.checkPassword
//       ) {
//         Toast.fire({
//           icon: 'warning',
//           title: '請填寫所有欄位'
//          })
//         return
//       }
//       if (this.password !== this.checkPassword) {
//         Toast.fire({
//           icon: 'warning',
//           title: '兩次輸入的密碼需相同'
//        })
//         this.checkPassword = ''
//         return
//       }
//       const { data } = await authorizationAPI.signUp({
//         account: this.account,
//         name: this.name,
//         email: this.email,
//         password: this.password,
//         checkPassword: this.checkPassword
//       })
//       if (data.status === 'error') {
//         throw new Error(data.message)
//       }
//      Toast.fire({
//         icon: 'success',
//        title: `註冊成功，歡迎 ${data.name} !`
//      })
//       this.$router.push('/users/signin')
//    } catch (error) {
//      console.log(error)
//       Toast.fire({
//         icon: 'error',
//         title: '此帳號已存在'
//       })
</script>
