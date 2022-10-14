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
                    {{ `${currentUserTemp.name.length}/50` }}
                  </h6>
                  <span class="warn warn-name" v-show="nameLengthWarn"
                    >字數不可超過50字</span
                  >
                  <span class="warn warn-name" v-show="noInputWarn">此處不可空白</span>
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
                    {{
                      `${
                        !currentUserTemp.introduction
                          ? 0
                          : currentUserTemp.introduction.length
                      }/160`
                    }}
                  </h6>
                  <span class="warn warn-intro" v-show="introLengthWarn"
                    >字數不可超過160字</span
                  >
                  <span class="warn warn-intro" v-show="noInputWarn"
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
      nameLengthWarn: false,
      introLengthWarn: false,
      noInputWarn: false,
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
    },
    // 一、表單編輯送出前的檢查條件
    checkForm() {
      const { name, introduction } = { ...this.currentUserTemp };

      const { username, nameLength, introLength } = {
        username: name,
        nameLength: name ? name.length : 0,
        introLength: introduction ? introduction.length : 0,
      };

      //檢查名稱是否空白
      if (!username) {
        this.noInputWarn = true;
        return true;
      } else {
        this.noInputWarn = false;
      }
      //檢查名稱字數
      if (nameLength > 50) {
        this.nameLengthWarn = true;
        return true;
      } else {
        this.nameLengthWarn = false;
      }
      //檢查介紹是否空白
      if (!introLength) {
        this.noInputWarn = true;
        return true;
      } else {
        this.noInputWarn = false;
      }
      //檢查介紹字數
      if (introLength > 160) {
        this.introLengthWarn = true;
        return true;
      } else {
        this.introLengthWarn = false;
      }
      return false;
    },

    // 二、執行表單送出功能
    async handleSubmit() {
      //確認表單通過條件審核，並帶入編輯後資料
      if (this.checkForm()) return;
      const formData = new FormData(this.$refs.form);

      //       for (var pair of formData.entries()) {
      //     console.log(pair[0]+ ', ' + pair[1]);
      // }
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
