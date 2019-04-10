<template>
  <div class="user">
    <Form
      class="form"
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="60"
    >
      <FormItem label="用户名" prop="uname">
        <Input v-model="formValidate.uname" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="密码" prop="upwd">
        <Input v-model="formValidate.upwd" type="password" placeholder="Enter your password"></Input>
      </FormItem>
      <FormItem label="City" prop="city">
        <Select v-model="formValidate.city" placeholder="Select your city">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        uname: "",
        upwd: "",
        city: ""
      },
      ruleValidate: {
        uname: [
          {
            required: true,
            message: "The name cannot be username",
            trigger: "blur"
          }
        ],
        upwd: [
          {
            required: true,
            message: "The name cannot be passsword",
            trigger: "blur"
          }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$axios({
        url: "/admin/account/login",
        data: this.formValidate,
        method: "POST",
        // 由于在8080端口下去请求8899端口，涉及到跨域
        withCredentials: true
      }).then(res => {
        const {status,message } = res.data;
        if (status == 1) {
          this.$Message.error("Fail!");
        } else {
          this.$Message.success("Success!");
          this.$router.push("/admin");
          // 修改vuex中user的值
          // 调用setUser方法修改user的值，并且需要传递一个用户对象
          // this.$store.commit调用mutations里面的方法
          this.$store.commit("setUser", {
            username: message.uname,
            realname: message.realname
          });
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },

    onSubmit() {}
  }
};
</script>
<style scoped>
.user {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}
.form {
  margin: 200px auto;
  width: 350px;
}
</style>
