<template>
  <form
    @submit.stop.prevent="submitSetting"
    class="main d-flex flex-column align-items-center"
  >
    <div class="setting-content">
      <div class="form-label-group mb-2">
        <label for="account">帳號</label>
        <input
          v-model="currentUserTemp.account"
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
          v-model="currentUserTemp.name"
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
          v-model="currentUserTemp.email"
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
          v-model="currentUserTemp.password"
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
          v-model="currentUserTemp.passwordCheck"
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
    <div class="button">
      <button class="setting-save-button" type="submit">儲存</button>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
export default {
  name: "SettingForm",
  data() {
    return {
      currentUserTemp: {},
    };
  },
  methods: {
    async submitSetting(e) {
      if (
        this.currentUserTemp.password !== this.currentUserTemp.passwordCheck
      ) {
        Toast.fire({
          icon: "warning",
          title: "兩次輸入的密碼需相同",
        });
        this.passwordCheck = "";
        return;
      }

      const form = e.target;
      const formData = new FormData(form);
      formData.delete("passwordCheck");

      try {
        //兩次輸入的密碼需相同
        const response = await authorizationAPI.settingSave(
          this.currentUser.id,
          formData
        );
        const data = response.data;
        console.log(data);

        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: `修改成功 !`,
        });

        let user = {
          ...this.currentUser,
          name: data.data.name,
          account: data.data.account,
          email: data.data.email,
        };

        this.$store.commit("setCurrentUser", user);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    },
    fetchCurrentUser() {
      this.currentUserTemp = JSON.parse(JSON.stringify(this.currentUser));
    },
  },
  computed: {
    //把vuex資料拿出來,得到currentUser
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    //把得到的currentUser複製一份給currentUser.Temp
    this.fetchCurrentUser();
  },
};
</script>
