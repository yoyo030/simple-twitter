<template>
  <Transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header d-flex align-items-center">
            <img
              class="btn-close"
              src="../assets/images/error.png"
              alt=""
              @click.stop.prevent="clickCancel"
            />
            <h5 class="modal-title">編輯個人資料</h5>
            <button
              class="btn-save modal-tweet-button"
              :disabled="isProcessing"
              @click.stop.prevent="handleSubmit"
            >
              儲存
            </button>
          </div>
          <form ref="form">
            <div class="modal-body">
              <div class="edit-modal-img">
                <!--待串接API後用v-bind背景圖cover跟使用者img-->

                <div style="position: relative; width: 100%; height: 100%">
                  <img
                    :src="currentUserTemp.cover | emptybgImage"
                    class="user-profile-bg"
                    style="width: 634px; height: 198px; object-fit: none"
                  />
                </div>
                <div class="bg-edit">
                  <img
                    @click.stop.prevent="clickCoverUpload"
                    class="user-img-edit cursor-pointer"
                    src="../assets/images/add-photo.png"
                  />
                  <img
                    @click.stop.prevent="currentUserTemp.cover = ''"
                    class="user-img-edit bg-cancel cursor-pointer"
                    src="../assets/images/cancel.png"
                  />
                </div>

                <div class="user-profile-info">
                  <img
                    :src="currentUserTemp.avatar | emptyImage"
                    class="user-profile-img"
                    style=""
                  />
                  <img
                    @click.stop.prevent="clickAvatarUpload"
                    class="user-img-edit cursor-pointer"
                    src="../assets/images/add-photo.png"
                  />

                  <div class="form-label-group">
                    <label for="name">名稱</label>
                    <input
                      v-model="currentUserTemp.name"
                      id="name"
                      name="name"
                      type="text"
                      class="form-control"
                    />
                    <h6 class="name-count">
                      {{ `${currentUserTemp.name.trim().length}/50` }}
                    </h6>
                    <span
                      class="warn warn-name"
                      v-show="currentUserTemp.name.trim().length > 50"
                      >字數不可超過50字</span
                    >
                    <span
                      class="warn warn-name"
                      v-show="!currentUserTemp.name.trim().length"
                      >此處不可空白</span
                    >
                  </div>
                  <div class="form-label-group description">
                    <label for="description">自我介紹</label>
                    <textarea
                      v-model="currentUserTemp.introduction"
                      id="description"
                      name="introduction"
                      class="form-control edit-description"
                      type="text"
                    >
                    </textarea>
                    <h6 class="count-description">
                      {{ `${currentUserTemp.introduction.trim().length}/160` }}
                    </h6>
                    <span
                      class="warn warn-intro"
                      v-show="currentUserTemp.introduction.trim().length > 160"
                      >字數不可超過160字</span
                    >
                    <span
                      class="warn warn-intro"
                      v-show="!currentUserTemp.introduction.trim().length"
                      >此處不可空白</span
                    >

                    <input
                      id="image1"
                      type="file"
                      name="cover"
                      accept="image/*"
                      class="form-control-file d-none"
                      ref="coverFileInput"
                      @change="handleCoverFileChange"
                    />
                    <input
                      id="image2"
                      type="file"
                      name="avatar"
                      accept="image/*"
                      class="form-control-file d-none"
                      ref="avatarFileInput"
                      @change="handleAvatarFileChange"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
import { mapState } from "vuex";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
export default {
  name: "EditModal",
  mixins: [emptyImageFilter],
  props: {
    //接收父層的使用者資料
    initialUser: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      currentUserTemp: {},
      inputForm: {},
      isProcessing: false,
    };
  },

  created() {
    this.fetchCurrentUser();
  },

  methods: {
    // 帶入編輯資料
    fetchCurrentUser() {
      this.currentUserTemp = JSON.parse(JSON.stringify(this.currentUser));
       //this.currentUserTemp.introduction ='';
    },

    // 二、執行表單送出功能
    async handleSubmit() {
      if (
        !this.currentUserTemp.name.trim() ||
        !this.currentUserTemp.introduction.trim()
      ) {
        Toast.fire({
          icon: "warning",
          title: "請確實填寫名稱和自我介紹",
        });
        return;
      }
      if (
        this.currentUserTemp.name.trim() > 50 ||
        this.currentUserTemp.introduction.trim() > 160
      ) {
        Toast.fire({
          icon: "warning",
          title: "請注意欄位的字數限制",
        });
        return;
      }

      const formData = new FormData(this.$refs.form);
      try {
        const response = await authorizationAPI.settingSave(
          this.currentUser.id,
          formData
        );

        const data = response.data;
        console.log(data.data);

        if (data.status && data.status !== "success") {
          //console.log(data);
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: `修改成功 !`,
        });

        this.currentUserTemp.cover = data.data.cover;
        this.currentUserTemp.avatar = data.data.avatar;

        this.$store.commit("setCurrentUser", this.currentUserTemp);
        this.$router.go(this.$router.currentRoute);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    },
    // 三、取消編輯
    clickCancel() {
      this.inputForm = {};
      this.$emit("close");
    },
    clickCoverUpload() {
      this.$refs.coverFileInput.click();
    },
    clickAvatarUpload() {
      this.$refs.avatarFileInput.click();
    },
    handleCoverFileChange(e) {
      const { files } = e.target;

      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.currentUserTemp.cover = "";
      } else {
        // 否則產生預覽圖
        this.currentUserTemp.cover = window.URL.createObjectURL(files[0]);
      }
    },
    handleAvatarFileChange(e) {
      const { files } = e.target;

      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.currentUserTemp.avatar = "";
      } else {
        // 否則產生預覽圖
        this.currentUserTemp.avatar = window.URL.createObjectURL(files[0]);
      }
    },
  },
  computed: {
    //把vuex資料拿出來,得到currentUser
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>

<style scoped>
.form-label-group {
  width: 602px;
  margin: 0 16px 30px 16px;
}
.modal-body {
  all: unset;
  padding: 16px;
}
.modal-container {
  height: 625px;
}
.warn {
  left: 16px;
  top: 300px;
}
.warn-name {
  top: 115px;
  left: 16px;
}
</style>
