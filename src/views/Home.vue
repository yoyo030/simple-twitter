<template>

  <div class="container d-flex justify-content-center w100">
      <div class="w100 leftSection"><NavBar /></div>
      <div class="w100 centerSection">
        <h4 class="setting-title main-title">首頁</h4>
      </div>
      <div class="w100 rightSection"><RecommandedList /></div>
    </div>


</template>



<script>
import NavBar from "../components/NavBar.vue";
import RecommandedList from "../components/RecommandedList.vue";



export default {
  name: "UserProfile",
  components: { 
    NavBar,
    RecommandedList },
};
</script>
