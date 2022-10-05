<template>


 
 
   <nav>
   <img class="navbar-logo" src="../assets/images/ac-logo.png" />
   <ul>

    <li><a href="#"><img class="navbar-icon" src="../assets/images/home.png" />推文清單</a></li>
    <li><a href="#"><img class="navbar-icon" src="../assets/images/info.png" />使用者列表</a></li>

    <li style="position: absolute;
       bottom: 0;"><a href="#"><img class="navbar-logo" src="../assets/images/sign-out.png" />登出</a></li>
  
  </ul>
</nav>



</template>


<style scoped lang="scss">
@import "@/assets/styles/_NavBar.scss";
</style>

<script>
export default {
  name: 'NavBar',
}
</script>

