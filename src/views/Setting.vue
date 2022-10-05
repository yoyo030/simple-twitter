<template>
  <div class="d-flex justify-content-center w100">
    <div class="d-flex w100">
      <div class="w100 leftSection">
        <NavBar />
      </div>

      <div class="w100 centerSection">
        <h4 class="setting-title main-title">帳戶設定</h4>
        <div class="form-container ">
    <form 
     class="main d-flex flex-column align-items-center">
      
      <div class="setting-content">
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
      </form>
        <button 
         class="setting-save-button" 
         type="submit"
         >
         儲存
        </button>
 

   
  </div>
      </div>

      <div class="w100 rightSection">popularList</div>
    </div>
  </div>
</template>



<script>
import NavBar from "../components/NavBar.vue";
export default {
  name: "UserProfile",
  components: { NavBar },
};
</script>
