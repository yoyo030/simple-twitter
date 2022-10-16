<template>
  <Transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
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
            <div class="reply">
              <div class="d-flex">
                <img
                  :src="tweet.User.avatar | emptyImage"
                  class="user-img"
                  alt=""
                />

                <div class="reply-list-text d-flex flex-column">
                  <div class="tweet-list-tweet-top d-flex align-items-center">
                    <div class="tweet-user-name">
                      {{ tweet.User.name }}
                    </div>
                    <div class="tweet-user-account">
                      {{ tweet.User.account | addPrefix }}
                    </div>
                    <span>・</span>
                    <div class="tweet-user-createdAt">
                      {{ tweet.createdAt | date }}
                    </div>
                  </div>

                  <div class="tweet-contentText">
                    {{ tweet.description }}
                    <div class="tweet-account">
                      <span class="reply-span">回覆給</span>
                      {{ tweet.User.account | addPrefix }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="reply-content d-flex">
                <img :src="currentUser.avatar | emptyImage" alt="" class="avatar" />
                <textarea class="tweet" placeholder="推你的回覆" v-model="text">
                </textarea>
              </div>
              <div class="modal-footer d-flex justify-content-end">
                <div class="warn" v-show="textWarn">字數不可超過140字</div>
                <div class="warn" v-show="noInputWarn">內容不可空白</div>
                <button
                  class="modal-tweet-button"
                  :disabled="isLoading"
                  @click="handleSubmit"
                >
                  回覆
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>


<script>
import { emptyImageFilter } from "./../utils/mixins";
import { fromNowFilter } from "../utils/mixins";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "ReplyModal",
  mixins: [fromNowFilter, emptyImageFilter],
  data() {
    return {
      text: "",
      isLoading: false,
      textWarn: false,
      noInputWarn: false,
    };
  },
  filters: {
    addPrefix(account) {
      if (!account) {
        return "未提供帳號資訊";
      } else {
        return `@${account}`;
      }
    },
  },
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },

  methods: {
    //提交推文事件(含條件審核))
    async handleSubmit() {
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

      try {
        const response = await authorizationAPI.createReplies(
          this.tweet.id,
          this.text
        );
        const data = response.data;
        console.log(data);

        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: `回覆成功 !`,
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
/* Modal專用樣式 */
.modal-body {
  all: unset;
}
.modal-container {
  height: 100%;
}
.reply {
  border-bottom: 0;
}
.modal-body {
  padding: 16px;
}

.reply-content {
  margin-top: 23px;
}
.modal-tweet-button {
  all: unset;
  padding: 8px 16px;
  background: #ff6600;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  line-height: 24px;
}
.modal-footer {
  position: relative;
}
.warn {
  position: absolute;
  top: 10px;
  left: 390px;
}

.modal-enter-from {
  opacity: 0;
}
</style>

