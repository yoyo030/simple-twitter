<template>
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
            type="submit"
            :disabled="isProcessing"
            @click.stop.prevent="btnclick"
          >
            儲存
          </button>
        </div>
        <form  @submit.stop.prevent="handleSubmit">
        <div class="modal-body">
          <div class="edit-modal-img">

            <!--待串接API後用v-bind背景圖cover跟使用者img-->
            <img 
              class="user-profile-bg" 
              src="../assets/images/bg-img.png" />
             <div class="bg-edit">
              <img
              class="user-img-edit cursor-pointer"
              src="../assets/images/add-photo.png"
            />
            <img
              class="user-img-edit bg-cancel cursor-pointer"
              src="../assets/images/cancel.png"
            />
              </div> 
          
            <div class="user-profile-info">            
              <img
              class="user-profile-img "
              src="../assets/images/logo-gray.png"
            />
             <img
              class="user-img-edit cursor-pointer"
              src="../assets/images/add-photo.png"
            />
              <div class="form-label-group">
                <label for="name">名稱</label>
                <input
                  v-model="currentUser.name"
                  id="name"
                  name="name"
                  type="text"
                  class="form-control"
                /> 
              <h6 class="name-count">{{`${currentUser.name.length}/50`}}</h6>             
              <span class="warn" v-show="nameLengthWarn">字數不可超過50字</span>
              <span class="warn" v-show="noInputWarn">此處不可空白</span>
              </div>
              <div class="form-label-group description">
                
                <label for="description">自我介紹</label>
                <textarea
                  v-model="currentUser.introduction"
                  id="description"
                  class="form-control edit-description"
                  type="text">
                </textarea>
               <h6 class="count-description">{{ `${currentUser.introduction.length}/160`}}</h6> 
              <span class="warn warn-intro" v-show="introLengthWarn">字數不可超過160字</span>
              <span class="warn warn-intro" v-show="noInputWarn">此處不可空白</span> 
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  </div>
</template>


<script>

export default {
  name: "EditModal",

  props: {
    //接收父層的使用者資料
    initialUser: {
      type: Object,
      required: true,
    },

  },

  data() {
    return {
      currentUser: {
        name: "",
        img: "",
        introduction: "",     
        cover: "",
      },
      inputForm: {},
      nameLengthWarn: false,
      introLengthWarn: false,
      noInputWarn: false,      
      isProcessing: false,
    };
  },

  created() {
    this.fetchuser();
  },

  methods: { 
    // 帶入編輯資料
     fetchuser() {
      const { 
        name,
        introduction,
        img,
        cover, 
        } = { ...this.initialUser };
      this.currentUser = {
        name,
        introduction,
        img,
        cover,
      };
     },
    // 一、表單編輯送出前的檢查條件
    checkForm() {
      const { name, introduction } = { ...this.currentUser };
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

    // 二、執行表單送出功能(尚未成功傳遞資料QQ)
    handleSubmit() {
      //確認表單通過條件審核，並帶入編輯後資料
      if (this.checkForm()) 
        return;
      this.inputForm = {
        ...this.initialUser,
        ...this.currentUser,
      };
      //傳向父層接收編輯後資料
      const formData = this.inputForm;
      console.log(formData)
      this.$emit("after-submit", formData);
    },
    // 三、取消編輯
    clickCancel() {
      this.inputForm = {};
      this.$emit("close");
    },

  },
};
</script>




<style scoped>
.form-label-group {
  width: 602px;
  margin: 0 16px 30px 16px;
}
</style>