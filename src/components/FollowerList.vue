<template>
  <div class="profile-nav-list scrollbar">
    <div v-if="followings" class="d-flex justify-content-center">
      使用者還沒有任何追隨者
    </div>
    <div class="reply d-flex" v-for="follower in followers" :key="follower.id">
      <!--待串接後用v-bind改為使用者img-->

      <img :src="follower.avatar | emptyImage" class="user-img" alt="" />

      <div class="reply-list-text d-flex flex-column">
        <div class="tweet-list-tweet-top d-flex align-items-center">
          <router-link
            :to="{ name: 'user-profile', params: { id: follower.id } }"
          >
            <div class="tweet-user-name">
              {{ follower.name }}
            </div>
          </router-link>
          <button
            v-if="follower.isFollowed"
            class="btn-isFollowed"
            @click.stop.prevent="unFollowed(follower.id)"
          >
            正在跟隨
          </button>
          <button
            v-else
            class="btn-unFollow"
            @click.stop.prevent="followed(follower.id)"
          >
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
    //從views/UserFollower
    initialFollower: {
      type: [],
      required: true,
    },
  },
  data() {
    return {
      followers: []
    };
  },
   created() {
    this.fetchFollowing();
  },
  methods: {
    fetchFollowing() {
      if (!this.initialFollower) {
        this.followers = null;
      }
      this.followers = this.initialFollowing;
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