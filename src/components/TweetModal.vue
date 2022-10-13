<template>
  <div class="modal-mask">
    <div class="modal-wrapper d-flex">
      <form class="modal-container" @submit.stop.prevent="handleSubmit">
        <div class="modal-header">
          <img
            class="btn-close"
            src="../assets/images/error.png"
            alt=""
            @click="$emit('close')"
          />
        </div>
        <div class="modal-body">
          <img :src="currentUser.avatar | emptyImage" alt="" class="avatar" />
          <textarea class="tweet" placeholder="有什麼新鮮事?" v-model="text">
          </textarea>
        </div>
        <div class="modal-footer d-flex justify-content-end">
          <div class="warn warn-tweet" v-show="textWarn">字數不可超過140字</div>
          <div class="warn warn-tweet" v-show="noInputWarn">內容不可空白</div>
          <button class="modal-tweet-button" :disabled="isLoading">推文</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "TweetModal",
  mixins: [emptyImageFilter],
  data() {
    return {
      text: "",
      isLoading: false,
      textWarn: false,
      noInputWarn: false,
    };
  },

  methods: {
    //提交推文事件
    async handleSubmit() {
      try {
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

        //兩次輸入的密碼需相同
        const response = await authorizationAPI.insertTweets(this.text);
        const data = response.data;
        console.log(data);

        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: `推文成功 !`,
        });
        this.$router.go(this.$router.currentRoute);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
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

.warn-tweet {
  top: 252px;
  left: 415px;
}

</style>
