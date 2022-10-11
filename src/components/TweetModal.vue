<template>
  <div class="modal-mask">
    <div class="modal-wrapper d-flex ">
      <form class="modal-container" @submit.stop.prevent="handleSubmit">
        <div class="modal-header">
            <img 
              class="btn-close" 
              src="../assets/images/error.png" alt="" 
              @click="$emit('close')"/>
        </div>
        <div class="modal-body">
          <img src="../assets/images/ac-logo.png" alt="" class="avatar" />
          <textarea
            class="tweet"
            placeholder="有什麼新鮮事?"
            v-model="text">
          </textarea>
        </div>
        <div class="modal-footer d-flex justify-content-end ">
          <div class="warn" v-show="textWarn">字數不可超過140字</div>
          <div class="warn" v-show="noInputWarn">內容不可空白</div>
          <button class="modal-tweet-button" :disabled="isLoading">
            推文
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>


export default {

data() {
    return {
      text: "",
      isLoading: false,
      textWarn: false,
      noInputWarn: false,
    };
  },

  methods: {
    //提交推文事件，待完成(僅寫出送出條件)
    
    handleSubmit() {
      this.isLoading = true;
      if (this.text.trim().length > 140) {
        this.isLoading = false;
        this.noInputWarn = false;
        return (this.textWarn = true);
      }
      if (this.text.trim().length === 0) {
        this.textWarn = false;
        this.isLoading = false;
        return (this.noInputWarn = true);
      }
     
    },
  },
};
</script>

