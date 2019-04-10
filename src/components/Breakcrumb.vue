<template>
    <Breadcrumb>
        <BreadcrumbItem to=">" v-for="(item,index) in routerInfor" :key="index">
            <Icon type="ios-cafe"></Icon> {{item}}
        </BreadcrumbItem>
    </Breadcrumb>
</template>
<script>
    export default {
        
        computed:{
            // 面包屑数据
            routerInfor(){
                var arr = this.$route.matched.map(v=>{
                    return v.meta
                })
                return arr;
            }
        }
    }
</script>