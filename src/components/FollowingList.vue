<template>
  <div class="profile-nav-list scrollbar">
    <div v-if="!followings" class="d-flex justify-content-center">使用者還沒有追隨任何用戶</div>
    <div
      vv-else
      class="reply d-flex"
      v-for="following in followings"
      :key="following.id"
    >
      <!--待串接後用v-bind改為使用者img-->
      <img :src="following.avatar | emptyImage" class="user-img" alt="" />

      <div class="reply-list-text d-flex flex-column">
        <div class="tweet-list-tweet-top d-flex align-items-center">
          <router-link
            :to="{ name: 'user-profile', params: { id: following.id } }"
          >
            <div class="tweet-user-name">
              {{ following.name }}
            </div>
          </router-link>
          <button
            v-if="following.isFollowing"
            class="btn-isFollowed"
            @click.stop.prevent="unFollowed(following.id)"
          >
            正在跟隨
          </button>
          <button
            v-else
            class="btn-unFollow"
            @click.stop.prevent="followed(following.id)"
          >
            跟隨
          </button>
        </div>

        <div class="tweet-contentText">
          {{ following.introduction }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "userFollowing",
  mixins: [emptyImageFilter],

  props: {
    //從views/Userfollowing
    initialFollowing: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      followings: [],
    };
  },
  created() {
    this.fetchFollowing();
  },
  methods: {
    fetchFollowing() {
      if (!this.initialFollowing) {
        this.followings = null;
      }
      this.followings = this.initialFollowing;
    },
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
  height: 82vh;
}
.btn-isFollowed {
  position: absolute;
  right: 35px;
}
.btn-unFollow {
  position: absolute;
  right: 35px;
}
</style>