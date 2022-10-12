<template>
  <div class="recommended-list">
    <div class="list-container">
      <div class="list-header">
        <h4>推薦跟隨</h4>
      </div>
      <div v-for="user in userList" :key="user.id">
        <div class="user-container d-flex">

           <router-link :to="{ name: 'user-profile', params: { id: user.id }}" class=""
          ><img
          v-if="user.avatar != undefined"
          :src="user.avatar"
          class="user-img"
          alt=""
        />
        <img
          v-else
          src="../assets/images/logo-gray.png"
          class="user-img"
          alt=""
        /></router-link
        >
         
          <span class="info">
            <div class="name">
              {{ user.name }}
            </div>
            <div class="account">
              {{ user.account | addPrefix }}
            </div>
          </span>
          <button
            v-if="user.isFollowed"
            class="btn-isFollowed"
            @click.stop.prevent="unFollowed(user.id)"
          >
            正在跟隨
          </button>
          <button
            v-else
            class="btn-unFollow"
            @click.stop.prevent="followed(user.id)"
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
export default {
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
    async followed(userId) {
      try {
        let followedResponse = await authorizationAPI.followed();
        let followedData = followedResponse.data;
        //console.log(followedData);

        if (followedData.status && followedData.status !== "success") {
          throw new Error(followedData.message);
        }

        this.userList = this.userList.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowed: true,
            };
          }
          return user;
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    },
    async unFollowed(userId) {
      try {
        let unfollowedResponse = await authorizationAPI.unfollowed(userId);
        let unfollowedData = unfollowedResponse.data;
        console.log(unfollowedData);

        if (unfollowedData.status && unfollowedData.status !== "success") {
          throw new Error(unfollowedData.message);
        }

        this.userList = this.userList.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowed: false,
            };
          }
          return user;
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
  //串接API後使用，本人以外挑選10個
  //computed: {
  //filteredUserLIst () {
  //  return this.userList.filter(user => user.id !== this.userId).slice(0, 10)
  // }
  // },
};
</script>

<style scoped>


.user-container   {
  position: relative;
}

.btn-isFollowed {
 position: absolute;
 right: 5px;
 top: 8px
}

.btn-unFollow {
 position: absolute;
 right: 20px;
 top: 8px

}


</style>