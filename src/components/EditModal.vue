<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <form class="modal-container" @submit.stop.prevent="handleSubmit">
        <div class="modal-header d-flex align-items-center">
          <img
            class="btn-close"
            src="../assets/images/error.png"
            alt=""
            @click="$emit('close')"
          />
           <h5 class="modal-title">編輯個人資料</h5>
            <button
              class="btn-save modal-tweet-button"
              type="submit"
              :disabled="isProcessing">
              儲存
            </button>
        </div>
        <div class="modal-body">
          <!--擷取點擊該推文資訊-->
          <div class="edit-modal-img">
            <!--待串接後用v-bind改為使用者img-->
<img class="user-profile-bg" src="../assets/images/bg-img.png" />
      <div class="user-profile-info">
        <img class="user-profile-img" src="../assets/images/logo-gray.png" />


            <div class="reply-list-text d-flex flex-column">

    <div class="form-label-group mb-2">
        <label for="name">名稱</label>
        <input
          v-model="currentUserTemp.name"
          id="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="待傳入父層資料"
          autocomplete="username"
          required
          autofocus/>
      </div>
          <div class="form-label-group mb-2">
        <label for="name">自我介紹</label>
        <input
          v-model="currentUserTemp.name"
          id="description"
          name="description"
          type="text"
          class="form-control"
          placeholder="待傳入父層資料"
          autocomplete="username"
          required
          autofocus/>
      </div>

          <div class="modal-footer d-flex justify-content-end">
            <div class="warn" v-show="textWarn">字數不可超過140字</div>
            <div class="warn" v-show="noInputWarn">內容不可空白</div>

          </div>
         
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
//嘗試將TweetList資料點擊後帶入失敗，待解決
const dummyData = {
  tweet: {
    id: 1,
    account: "apple123",
    name: "apple",
    img: "../assets/images/logo-gray.png",
    description: "滿員御禮!滿員御禮!",
    createdAt: "2022-10-08",
    reply: ["good", "good", "good"],
    likeAmount: 520,
  },
};

export default {
  data() {
    return {
      text: "",
      isProcessing: false,
      textWarn: false,
      noInputWarn: false,
      tweet: dummyData.tweet, //待解決
    };
  },
  created() {
    this.getpost();
  },

  methods: {
    //提交推文事件，待完成(僅寫出送出條件)
    handleSubmit() {
      this.isProcessing = true;
      if (this.text.trim().length > 140) {
        this.isProcessing = false;
        this.noInputWarn = false;
        return (this.textWarn = true);
      }
      if (this.text.trim().length === 0) {
        this.textWarn = false;
        this.isProcessing = false;
        return (this.noInputWarn = true);
      }
    },
  },
};
</script>



<style scoped>
/* Modal專用樣式 */
.modal-header {
  position: relative;
}
.btn-save {
  right: 16px;
  top: 8px;
}
.modal-body {
  all: unset;
}
.modal-container {
  position: relative;
  height: 500px;
}
.reply {
  border-bottom: 0;
}
.modal-body {
  padding: 16px;
}
.avatar {
  position: a;
}
.reply-content {
  margin-top: 23px;
}
.modal-tweet-button {
  position: absolute;
  bottom: 20px;
}
.warn {
  position: absolute;
  bottom: 20px;
  right: 120px;
}
</style>

