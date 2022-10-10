<template>
  <div class="w-100 mx-0 px-0 d-flex">
    <AdminNavBar />
    <AdminTweetList />
  </div>
</template>

<script>
import AdminNavBar from '../components/AdminNavBar.vue'
import AdminTweetList from '../components/AdminTweetList.vue'

export default {
  components: {
    AdminNavBar,
    AdminTweetList
  }
}
</script>