<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
 
  mounted(){ 
   
    //请求判断当前用户是否登录状态
    this.$axios({
      url:"/admin/account/islogin",
      //夸域
      withCredentials:true
    }).then(res=>{
      //如果没有登录跳转到登录界面
       
      if(res.data.code == "nologin"){
          this.$router.push("/login")
             
      }
    })
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
}

</style>
