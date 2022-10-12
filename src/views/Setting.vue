<template>
  <div class="container d-flex justify-content-center w100">
    <div class="w100 leftSection">
      <NavBar />
    </div>

    <div class="w100 centerSection">
      <h4 class="setting-title main-title">帳戶設定</h4>
      <div class="form-container">
        <SettingForm @after-submit-setting="afterSubmitSetting" />
      </div>
    </div>

    <div class="w100 rightSection">
      <RecommandedList />
    </div>
  </div>
</template>



<script>
import NavBar from "../components/NavBar.vue";
import SettingForm from "../components/SettingForm.vue";
import RecommandedList from "../components/RecommandedList.vue";

export default {
  name: "Setting",
  components: {
    NavBar,
    SettingForm,
    RecommandedList,
  },

  methods: {
    afterSubmitSetting(formData) {
      console.log(formData);
      // 透過 API 將表單資料送到伺服器
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    },
  },
};
</script>
