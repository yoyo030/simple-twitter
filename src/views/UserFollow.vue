<template>
  <div class="container d-flex justify-content-center w100">
      <div class="w100 leftSection"><NavBar /></div>

<div class="w100 centerSection" >UserFollow</div>
<div class="w100 rightSection" >popularList</div>
</div>

</template>



<script>

import NavBar from '../components/NavBar.vue';
export default {
    name: "UserFollow",
    components: { NavBar }
}
</script>
