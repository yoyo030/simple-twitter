<template>
  <div class="admin-main">
    <h4 class="setting-title main-title">使用者列表</h4>
    <div class="tweet-list scrollbar d-flex">
    <div
     class="card"
     v-for="user in users"
     :key="user.id">
      <div class="background-img">
        <img
          src="../assets/images/bg-img.png"
          class="card-img-background"
          alt=""
        />
      </div>
      <div class="avatar">
        <img src="../assets/images/logo-gray.png"
         class="card-img-avatar"
         alt="" />
      </div>
      <div class="card-body">
        <h5 class="card-title cursor-pointer">{{ user.name }}</h5>
        <p class="card-text">{{ user.account | addPrefix }}</p>
        <div class="click-on-condition">
          <div class="tweet-count ">
            <img src="../assets/images/tweet.png" alt="" class="reply__card cursor-pointer" />
            {{ user.tweetCount }}
          </div>
          <div class="like-count ">
            <img src="../assets/images/like.png" alt="" class="like__card cursor-pointer" />
            {{ user.likeCount }}
          </div>
        </div>
        <div class="follow-condition">
          <div class="following-count">
            <span class="following-count__number"
              >{{ user.followingCount }}個</span
            >跟隨中
          </div>
          <div class="follows-count">
            <span class="follows-count__number"
              >{{ user.followerCount }}位</span
            >跟隨者
          </div>
        </div>
      </div>
    </div>
    </div>
    
  </div>
</template>


<script>
import adminAPI from "./../apis/admin.js";
import { Toast } from "./../utils/helpers";


export default {
  name: "adminUsersCard",
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    //待串接API後抓取所有user資料
    async fetchUser() {
      try {
        const response  = await adminAPI.getUsers()
        console.log(response)
        const data = response.data;       
        if (data.status && data.status !== "success") {
          throw new Error(data.message);
        }
        this.users = data;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "warning",
          title: `無法載入使用者資訊，請稍後再試!`,
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


<style  lang="scss" scoped>
/*AdminUsersCard限定樣式^^*/
.admin-main {
  width: 80%;
  border-right: 1px solid #e6ecf0;
  border-left: 1px solid #e6ecf0;
}
.main-title {
  margin-bottom: 0;
}
.tweet-list {
  height: 90vh;
  padding: 15px 0 15px 15px;
  flex-wrap: wrap;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 249px;
  margin: 0 16px 16px 0;
  .card-img-background {
    width: 245px;
    height: 140px;
    border-radius: 10px 10px 0px 0px;
  }
  .card-img-avatar {
    width: 100px;
    height: 100px;
    position: absolute;
    border-radius: 100%;
    border: 4px white solid;
    top: 68px;
    right: 72.5px;
  }
  .card-body {
    text-align: center;
    .card-title {
      margin-top: 30px;
      font-size: 15px;
      font-weight: 900;
    }
    .card-text {
      margin-top: 2px;
      color: #657786;
      font-size: 15px;
    }
    .click-on-condition {
      margin-top: 12px;
      display: flex;
      justify-content: center;
      font-size: 15px;
      font-weight: 500;
      .tweet-count {
        display: flex;
        margin-right: 16.95px;
      }
      .like-count {
        display: flex;
      }
      .reply__card {
        width: 19.75px;
        height: 19.75px;
        margin-right: 7.15px;
        margin-top: 2px;
      }
      .like__card {
        width: 19.75px;
        height: 19.75px;
        margin-top: 2px;
        margin-right: 7.15px;
      }
    }
    .follow-condition {
      margin-top: 12px;
      display: flex;
      justify-content: center;
      font-size: 14px;
      font-weight: 500;
      .following-count {
        color: #657786;
        margin-right: 5px;
        &__number {
          color: #1c1c1c;
        }
      }
      .follows-count {
        color: #657786;
        &__number {
          color: #1c1c1c;
        }
      }
    }
  }
}
</style>