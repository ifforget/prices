<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
  background-color: #fff;
  color: green;
  font-size: 16px;
}
.layout-nav {
  width: 300px;
  margin: 0 auto;
  margin-right: 10px;
}
.Menu {
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <Icon type="ios-bug"/>后台管理
          </div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-bug"/>{{user.username}}  
            </MenuItem>
            <MenuItem name="2">{{user.realname}}</MenuItem>
            <MenuItem name="3"><span class="logout" @click="logout">退出</span></MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider class="Menu" hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <Submenu :name="`${index+1}`" v-for="(item,index) in meuns" :key="index">
              <template slot="title">
                <Icon type="item.icon"></Icon>
                {{item.title}}
              </template>
              <MenuItem
                :name="`${index+1}-${subIndex+1}`"
                v-for="(subItem,subIndex) in item.group"
                :key="subIndex"
              >
                <router-link :to="subItem.path">{{subItem.title}}</router-link>
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <Vreakcrumb></Vreakcrumb>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <!-- 匹配到所有组件 -->
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
// 导入vuex的数据
import {mapState} from "vuex";

//导入组件面包屑
import Vreakcrumb from "../components/Breakcrumb.vue";
export default {
  data() {
    return {
      meuns: [
        {
          icon: "ios-analytics",
          title: "购物商城",
          group: [
            { path: "/admin/CategoryList", title: "商品管理" },
            { path: "/admin/category-list", title: "栏目管理" }
          ]
        },
        {
          icon: "ios-aperture",
          title: "会员管理",
          group: [{ path: "/admin/user-list", title: "会员列表" }]
        },
        {
          icon: "md-aperture",
          title: "订单信息",
          group: [{ path: "/admin/price", title: "订单详细列表" }]
        }
      ]
    };
  },

  methods: {
       // 退出
    logout(){
      console.log("哈哈")
      this.$axios({
        url: "/admin/account/logout",
        // 由于在8080端口下去请求8899端口，涉及到跨域
        withCredentials: true
      }).then(res => {
        if(res.data.status === 0){
          // replace和push方法一样，都可以跳转，直接替换掉当前页面
          this.$router.replace("/login");
        }
      })
    }
  },

  components: {
    Vreakcrumb
  },
  computed: {
  
    ...mapState({
      // key的值自己定义的属性，在页面根据这个值来渲染
      // “user”是vuex中定义的属性
      user: "user"
    })
  }
};
</script>