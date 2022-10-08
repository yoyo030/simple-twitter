<template>
  <div class="container d-flex justify-content-center w100">
    <div class="w100 leftSection"><NavBar /></div>
    <div class="w100 centerSection">



       <div class="setting-title main-title1">← John Doe</div>
       <img  src="../assets/images/bg-img.png" style="max-width:100%;
max-height:100%;margin-bottom:0px"/>
       <div class="main-titl" style="height:195px;position: relative">
        
        
        <div style="border:2px solid white;border-radius:50px;position: absolute;width:100px;height:100px;margin-left:16.13px;top:-50px "> <img  src="../assets/images/logo-gray.png" style="max-width:100%;
max-height:100%;"/></div>
       
       <div style="height:50px; ">
        <button type="button" style="float:right" class="button">編輯個人資料</button>
        </div>
       <div style="height:100px;padding-left:16.13px ">
        <div>John Doe</div>
        <div>@heyjoin</div>
        <div>1234</div>
        <div>12個追蹤中&nbsp;&nbsp;&nbsp;59位跟隨者</div>
       </div>
       <nav style="margin-top:20px">
  <ul>
    <li><a href="#">推文</a></li>
    <li><a href="#">回覆</a></li>
    <li><a href="#">喜歡的內容</a></li>
  
  </ul>
</nav>
       </div>
       </div>
    <div class="w100 rightSection">popularList</div>
  </div>
</template>



<script>
import NavBar from "../components/NavBar.vue";
export default {
  name: "UserProfile",
  components: { NavBar },
};
</script>

<style scoped>
.navbar-icon {
  width: 20px;
 
  bottom: 0px;
  margin: 0px 0px 0px 10px;
}
.main-title1 {
  padding: 24px;  
  border-bottom: 1px solid #E6ECF0;
}

ul {
 
  border-bottom: 1px solid #E6ECF0;
}
button {
  all: unset;
}
.button {
  float:right;
  padding: 3px 10px;
  margin:5px 5px;
  color: #FF6600;
  text-align: center;
  border-radius: 50px;
  border:1px solid #FF6600;

}
nav > ul {
  list-style: none; /* 移除項目符號 */

  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: row;
}

/* 滑鼠移到 <a> 時變成深底淺色 */
nav a:hover {
  color: #f75000;
  border-bottom: solid #f75000 2px;
}
nav a {
  color: inherit; /* 移除超連結顏色 */
  display: block; /* 讓 <a> 填滿 <li> */
  font-size: 1.2rem;
  padding: 10px 50px;
  text-decoration: none; /* 移除超連結底線 */
}

</style>