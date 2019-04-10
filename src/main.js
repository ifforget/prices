import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import VueRouter from "vue-router";
// 导入vuex的store
import store from "./store";
//引入iview和样式
import iView from 'iview';
import 'iview/dist/styles/iview.css';
//注册路由
Vue.use(VueRouter)

Vue.use(iView)

// 当前是开发环境,可以忽略
Vue.config.productionTip = false;

//挂载vue构造函数的原型链.每个组件都可以通过this.$axios来调用
Vue.prototype.$axios = axios;

//设置axios的基础路径url
axios.defaults.baseURL ="http://localhost:8899";

// 导入axios
import axios from "axios"


//引入组件
import Login from "./pages/Login.vue"
import Price from "./pages/Price.vue"
import CategoryList from "./pages/CategoryList.vue"
import Admin from "./pages/Admin.vue"

//路由配置
const routes = [
  {path:"/",redirect:"/admin"},
  {path:"/login",component:Login,meta:"登录"},
  {path:"/admin",
    component:Admin,
    meta:"管理后台",
    redirect:"/admin/CategoryList",
    children:[
      {path:"CategoryList",component:CategoryList,meta:"商品管理"},
      {path:"price",component:Price,meta:"订单详细列表"}
    ]
  }
]
//路由对象
const router = new VueRouter({routes})




new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
