<template>
  <div class="recommended-list">
    <div class="list-container">
      <div class="list-header">
        <h4>推薦跟隨</h4>
      </div>
      <div v-for="user in userList" :key="user.id">
        <div class="user-container d-flex">
          <router-link
            :to="{ name: 'user-profile', params: { id: user.id } }"
            class=""
            ><img :src="user.avatar | emptyImage" class="user-img" alt="" />
          </router-link>

          <span class="info">
            <router-link
              :to="{ name: 'user-profile', params: { id: user.id } }"
              class=""
            >
              <div class="name">
                {{ user.name | nameLengthLimit}}
              </div>
            </router-link>
            <div class="account">
              {{ user.account | addPrefix }}
            </div>
          </span>
          <button
            v-if="user.isFollowing"
            class="btn-isFollowed"
            @click.stop.prevent="unFollowed(user)"
          >
            正在跟隨
          </button>
          <button
            v-else
            class="btn-unFollow"
            @click.stop.prevent="followed(user)"
          >
            跟隨
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "recommandedList",
  mixins: [emptyImageFilter],
  data() {
    return {
      userList: [],
    };
  },
  created() {
    this.fetchRecommendedlist();
  },
  methods: {
    async fetchRecommendedlist() {
      try {
        const response = await authorizationAPI.getTopUser();
        const data = response.data;
        //console.log(data);
        this.userList = data;
        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
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
    nameLengthLimit(name) {
      const re = /^[A-Za-z]+$/;
      if (name.length > 6) {
        if (name.match(re) === null) {
          return `${name.slice(0, 4)}...`;
        } else {
          return `${name.slice(0, 6)}...`;
        }
      } return name
    },
  },
  //串接API後使用，本人以外挑選10個
  //computed: {
  //filteredUserLIst () {
  //  return this.userList.filter(user => user.id !== this.userId).slice(0, 10)
  // }
  // },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.user-container {
  position: relative;
}

.btn-isFollowed {
  position: absolute;
  right: 15px;
  top: 8px;
}

.btn-unFollow {
  position: absolute;
  right: 20px;
  top: 8px;
}
</style>