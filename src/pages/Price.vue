<template>
  <div class="box">
    <!-- 搜索框 -->
    <template>
      <div class="header">
        <Input
          @on-search="chvalue"
          v-model="value"
          style="width:350px;float:right"
          :search="true"
          placeholder="Enter something..."
        />
      </div>
    </template>
    <!--按钮-->
    <div>
      <Drawer title="Create" v-model="value3" width="750" :mask-closable="false" :styles="styles">
        <Form :model="formData">
          <Row :gutter="32">
            <Col span="8">
              <FormItem label label-position="top">
                <Input v-model="formData.accept_name">
                  <span slot="prepend">名字</span>
                </Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label label-position="top">
                <Input v-model="formData.address">
                  <span slot="prepend">区域</span>
                </Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label label-position="top">
                <Input v-model="formData.area">
                  <span slot="prepend">地址</span>
                </Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="8">
            <Col span="10">
              <FormItem label-position="top">
                  <Input v-model="formData.expressTitle">
                  <span slot="prepend">选择快递</span>
                </Input>
              </FormItem>
            </Col>
            <Col span="10">
              <FormItem label-position="top">
                <Input v-model="formData.email">
                  <span slot="prepend">email</span>
                </Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label-position="top">
                <Input v-model="formData.id"  disabled>
                  <span slot="prepend">id</span>
                </Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="7">
              <FormItem label="价格" label-position="top"  >
                <Input v-model="formData.order_amount" disabled></Input>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem label="电话" label-position="top">
                <Input v-model="formData.telphone"></Input>
              </FormItem>
            </Col>
            <Col span="10">
              <FormItem label="DateTime" label-position="top">
                <DatePicker
                  v-model="formData.time"
                  type="daterange"
                  placeholder="please select the date"
                  style="display: block"
                  placement="bottom-end"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="备注信息" label-position="top">
            <Input
             
              type="textarea"
              v-model="formData.message"
              :rows="4"
              placeholder="please enter the description"
            />
          </FormItem>
        </Form>
        <div class="demo-drawer-footer">
          <Button style="margin-right: 8px" @click="value3 = false">返回</Button>
          <Button type="primary" @click="changegoods">更改</Button>
        </div>
      </Drawer>
    </div>
    <!-- 表格开始 -->
    <Table class="boo" border :columns="columns12" :data="price">
      <template slot-scope="{ row }" slot="id">
        <strong>{{ row.id }}</strong>
      </template>
      <template id="reader" slot-scope="{ row}" slot="action">
        <Button type="primary" size="small" @click="show(row.id)">订单详细</Button>
        <Button type="error" size="small" @click="remove(row.id)">编辑</Button>
      </template>
    </Table>
    <!-- 分页器 -->
    <template>
      <Page :total="8"   :show-sizer="true" :page-size-opts="[2, 4, 8]"
        @on-change="handleSizeChange"
      @on-page-size-change="handleCurrentChange"
      />
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      order: "0",
      names: "ivanyb",
      index: "1",
      page: 10,
      value: "",
      current:"1",
      columns12: [
        {
          title: "订单号",
          slot: "id"
        },
        {
          title: "会员名称",
          key: "accept_name"
        },
          {
          title: "emali",
          key: "email"
        },
          {
          title: "电话",
          key: "telphone"
        },

        {
          title: "地址",
          key: "area"
        },
        {
          title: "支付方式",
          key: "paymentTitle"
        },
        {
          title: "快递",
          key: "expressTitle"
        },
        {
          title: "状态",
          key: "statusName"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      price: [],
      minute: [],
      //   按钮的
      value3: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      formData: {
      },
      demo:{
         orderinfo:{
       
      }
      }
     
    };
  },
  methods: {
        
    //    改变页数的时候触发
    //    val就是当前点击的页数
    //    1修改页面,2再次请求数据
    //条
    handleCurrentChange(val){
        this.page=val;
       
        this.goodsList()
    },
    // 修改页时间触发
    handleSizeChange(val){
         this.index=val
        this.goodsList()
    },
    //订单页面的刷新
    goodsList(){
          this.$axios({
      url: `/admin/order/getorderlist?orderstatus=${this.order}&vipname=${
        this.names
      }&pageIndex=${this.index}&pageSize=${this.page}`
    }).then(res => {
      const { message,status } = res.data;

      this.price = message.reverse();
    });
    },


    //查看详细
    show(index) {
      this.$axios({
        url: `/admin/order/getorderdetial/${index}`
      }).then(res => {
        const { goodslist } = res.data.message;
        this.minute = goodslist;

        this.$Modal.info({
          title: `商品详细`,
          content: `商品名称：${this.minute[0].goods_title}<br>
                   <img src="${this.minute[0].imgurl}" style="width:300px;"><br>
                    价格：<span style="color:red;"> ${this.minute[0].goods_price}¥</span><br>`
        });
      });
    },
    //订单编辑
    remove(index) {
      
      this.$axios({
        url: `/admin/order/getorderdetial/${index}`
      }).then(res => {

          const { orderinfo } = res.data.message;
          this.formData=orderinfo
          this.value3 = true;
          
      });
    },
    // 编辑数据后提交数据
    changegoods(){
      this.demo.orderinfo=this.formData
        this.$axios({
          url:"/admin/order/updateorder",
          method:"POST",
          data:this.demo
        }).then(res=>{
           this.value3 = !this.value3;
           this.goodsList()
        })
    },

    //判断获得value改变
    chvalue() {
      console.log(this.value)
      if (this.value == "待付款") {

        this.order = 1;
           this.goodsList()
      }
      if (this.value == "已待付款待发货") {
        this.order = 2;
      this.goodsList()
      }
      if (this.value == "已签收") {
        this.order = 4;
       this.goodsList()
      }
      if (this.value == "已取消") {
        this.order = 5;
      this.goodsList()
      }else{
        this.order = 0
        this.goodsList()
      }
      //请求订单的数据
      // this.$axios({
      //   url: `/admin/order/getorderlist?orderstatus=${this.order}&vipname=${
      //     this.names
      //   }&pageIndex=${this.index}&pageSize=${this.page}`
      // }).then(res => {
      //   const { message,status } = res.data;

      //   this.price = message.reverse();
      // });
      // this.goodsList()
    }
  },

  mounted() {}, 
  //请求获取数据
  beforeMount() {
    //请求订单的数据
    this.goodsList()
  },

  computed: {}
};
</script>
<style scoped>
.header {
  height: 40px;
  margin-bottom: 10px;
}
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
.box{
  width: 100%;
  top:0;
  bottom:0;
  margin-bottom:20px ;
}
.boo{
  height: 500px;
}
</style>

