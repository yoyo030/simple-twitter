<template>
  <div class="profile-nav-list scrollbar">
    <div  
      class="reply d-flex" 
      v-for="follower in followers"
      :key="follower.id">
      <!--待串接後用v-bind改為使用者img-->

      <img :src="follower.avatar | emptyImage" class="user-img" alt="" />

      <div class="reply-list-text d-flex flex-column">
        <div class="tweet-list-tweet-top d-flex align-items-center">
          <router-link v-if= follower.id
            :to="{ name: 'user-profile', params: { id: follower.id } }"
          >
            <div class="tweet-user-name">
              {{ follower.name }}
            </div>
          </router-link>
          <button
            v-if="follower.isFollowing"
            class="btn-isFollowed"
            @click.stop.prevent="unFollowed(follower)"
          >
            正在跟隨
          </button>
          <button
            v-else
            class="btn-unFollow"
            @click.stop.prevent="followed(follower)"
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
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
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
    this.fetchFollower();
  },
  methods: {
    fetchFollower() {
      if (!this.initialFollower) {
        this.followers = null;
      }
      this.followers = this.initialFollower;
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