<template>
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
          <!--擷取點擊該推文資訊-->
          <div class="reply">
            
            <div class="d-flex">
            <!--待串接後用v-bind改為該推文作者img-->
            <!--:src="tweet.avatar | emptyImage"-->
            <img src="../assets/images/logo-gray.png" class="user-img" alt="" />

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
              <!--待串接後用v-bind改為該推文作者img-->
            <!--:src="取得目前使用者.avatar | emptyImage"-->
            <img src="../assets/images/ac-logo.png" alt="" class="avatar" />
            <textarea class="tweet" placeholder="推你的回覆" v-model="text">
            </textarea>
          </div>
          <div class="modal-footer d-flex justify-content-end">
            <div class="warn" v-show="textWarn">字數不可超過140字</div>
            <div class="warn" v-show="noInputWarn">內容不可空白</div>
            <button class="modal-tweet-button" :disabled="isLoading" @click="handleSubmit">
              回覆
            </button>
          </div>
         
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { emptyImageFilter } from "./../utils/mixins";
//嘗試將TweetList資料點擊後帶入失敗，待解決
// const dummyData = {
//   tweet: {
//     id: 1,
//     account: "apple123",
//     name: "apple",
//     img: "../assets/images/logo-gray.png",
//     description: "滿員御禮!滿員御禮!",
//     createdAt: "2022-10-08",
//     reply: ["good", "good", "good"],
//     likeAmount: 520,
//   },
// };
import { fromNowFilter } from "../utils/mixins";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
export default {
<<<<<<< HEAD
 
=======
    mixins: [fromNowFilter,emptyImageFilter],
>>>>>>> 547fb9ac22201ed541ed0d17a56fdd8b8c134d69
      filters: {
    addPrefix(account) {
      if (!account) {
        return "未提供帳號資訊";
      } else {
        return `@${account}`;
      }
    },
  
  },
  name: "ReplyModal",
<<<<<<< HEAD
  mixins: [fromNowFilter, emptyImageFilter],
=======

>>>>>>> 547fb9ac22201ed541ed0d17a56fdd8b8c134d69
  data() {
    return {
      text: "",
      isLoading: false,
      textWarn: false,
      noInputWarn: false,
      //tweet: dummyData.tweet, //待解決
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
    //從views/ReplyList帶入dummydata，待串接API以及點擊功能id===id
    tweet: {
      type: Object,
      required: true,
    },
  },


  methods: {
    //提交推文事件，待完成(僅寫出送出條件)
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



       //兩次輸入的密碼需相同
        const response = await authorizationAPI.createReplies(this.tweet.id,this.text);
        const data = response.data;
        console.log(data);

        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: `回覆成功 !`,
        });
       this.$router.go(this.$router.currentRoute)

      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }


    },
  },
};
</script>



<style scoped>

/* Modal專用樣式 */
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

