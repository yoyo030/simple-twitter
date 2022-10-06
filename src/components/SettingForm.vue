<template>
  <form
    @submit.stop.prevent="submitSetting"
    class="main d-flex flex-column align-items-center"
  >
    <div class="setting-content">
      <div class="form-label-group mb-2">
        <label for="account">帳號</label>
        <input
          v-model="user.account"
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
          v-model="user.name"
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
          v-model="user.email"
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
          v-model="user.password"
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
          v-model="user.passwordCheck"
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
export default {
  name: 'SettingForm',
  
  data() {
    return {
      user: {
        account: '',
      name: '',
      email: '',
      password: '',
      checkPassword: ''
      }
      
    }
  },
  methods: {
    submitSetting(e) {
      const form = e.target
      const formData = new FormData(form)
      this.$emit('after-submit-setting', formData)
    }
  }
}
</script>