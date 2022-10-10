<template>
  <div class="w-100 mx-0 px-0 d-flex">
    <AdminNavBar />
    <AdminUsersCard />
  </div>
</template>

<script>
import AdminNavBar from '../components/AdminNavBar.vue'
import AdminUsersCard from '../components/AdminUsersCard.vue'

export default {
  components: {
    AdminNavBar,
    AdminUsersCard
  }
}
</script>