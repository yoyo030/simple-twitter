<template>
    <div class="profile-nav-list scrollbar">
      <div class="reply d-flex" 
        v-for="follower in followers" :key="follower.id">
        <!--待串接後用v-bind改為使用者img-->
 
        <img
          :src="follower.avatar  | emptyImage "
          class="user-img"
          alt="" />

        <div class="reply-list-text d-flex flex-column">
          <div class="tweet-list-tweet-top d-flex align-items-center">
            <div class="tweet-user-name">
              {{ follower.name }}
            </div>
             <button
           v-if="follower.isFollowed"
           class="btn-isFollowed"
           @click.stop.prevent="unFollowed(follower.id)"> 
           正在跟隨
          </button>
          <button
           v-else
            class="btn-unFollow"
            @click.stop.prevent="followed(follower.id)">
            跟隨
          </button>
          </div>

          <div class="tweet-contentText">
            {{ follower.description }}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "userFollower",
  mixins: [emptyImageFilter],
  props: {
    //從views/ReplyList帶入dummydata，待串接API以及點擊功能id===id
    initialFollower: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      followers: this.initialFollower,
    };
  },
methods: {
   //用map找出被點擊按鈕所屬id，切換狀態(失敗中)
    followed (followerId) {
      this.followers = this.followers.map((follower) => {
       if ( follower.id === followerId) {
            return {
              ...follower,
              isFollowed: true,
            };
          }
          return this.follower;
        })
    },
    //用map找出被點擊按鈕所屬id，切換狀態(失敗中)
    unFollowed (followerId) {
      this.followers = this.followers.map((follower) => {
       if (follower.id === followerId) {
            return {
              ...follower,
              isFollowed: false,
            };
          }
          return this.follower;
        })
    }
  
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
};
</script>



<style scoped>
/*追蹤者樣板專用可視區域設定，用來控制scrollbar*/ 
.profile-nav-list {
  height: 80vh;
}
.btn-isFollowed {
 margin-left: 290px;
}
.btn-unFollow {
  margin-left: 320px; 
}

</style>