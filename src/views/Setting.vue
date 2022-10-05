<template>
<div class="d-flex justify-content-center w100">
<div class="d-flex w100">
<div class="w100 leftSection" ><NavBar /></div>
<div class="w100 centerSection" >Setting</div>
<div class="w100 rightSection" >popularList</div>
</div>
</div>
</template>


<style scoped lang="scss">
@import "@/assets/styles/_Setting.scss";
</style>
<script>

import NavBar from '../components/NavBar.vue';
export default {
    name: "UserProfile",
    components: { NavBar }
}
</script>
