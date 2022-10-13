<template>
  <div class="profile-nav-list scrollbar">
    <div
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
            @click.stop.prevent="unFollowed(following)"
          >
            正在跟隨
          </button>
          <button
            v-else
            class="btn-unFollow"
            @click.stop.prevent="followed(following)"
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
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
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
        console.log(this.initialFollowing)
      }
      this.followings = this.initialFollowing;
    },
    async followed(user) {
      try {
        let followedResponse = await authorizationAPI.followed(user.id);
        let followedData = followedResponse.data;
        console.log(followedData);

        if (followedData.status && followedData.status !== "success") {
          throw new Error(followedData.message);
        }
        
        user.isFollowing = true;
        Toast.fire({
          icon: "success",
          title: "追蹤成功",
        });

      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    },
    async unFollowed(user) {
      try {
        let unfollowedResponse = await authorizationAPI.unfollowed(user.id);
        let unfollowedData = unfollowedResponse.data;
        console.log(unfollowedData);

        if (unfollowedData.status && unfollowedData.status !== "success") {
          throw new Error(unfollowedData.message);
        }
        user.isFollowing = false;
        Toast.fire({
          icon: "success",
          title: "取消追蹤成功",
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
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
  right: 15px;
}
.btn-unFollow {
  position: absolute;
  right: 15px;
}
</style>