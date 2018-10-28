<template>
    <div class="login-wrap bg-c">
        <div class="form-box">
            <h2 class="cl-w fw">党建E家后台管理</h2>
            <el-form :model="formdata"  status-icon label-width="70px" :rules="rules" ref="formdata" label-position="left">
                <el-form-item label="用户名" required prop="username">
                    <el-input v-model="formdata.username" />
                </el-form-item>
                <el-form-item label="密码" required prop="password">
                    <el-input type="password" v-model="formdata.password" @keyup.enter.native="handleSubmit"/>
                </el-form-item>
                <el-button type="primary" class="btn" @click="handleSubmit">登录</el-button>
            </el-form>
        </div>

    </div>
</template>

<script>
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value || value.length < 5) {
        callback(new Error("请输入合法的密码"));
      } else {
        callback();
      }
    };
    return {
      formdata: {
        username: "2018",
        password: "123456"
      },
      rules: {
        username: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods:{
      handleSubmit(){
         this.$axios.post('/admin/adminUser/login',this.formdata).then(res=>{
                   if(res.code == 200){
                     this.$store.commit('CHANGE_USER',res.data)
                     this.$message.success(res.msg);
                     setTimeout(() => {
                       this.$router.push('/layout')
                     }, 1000);
                   }else{
                     this.$message.error(res.msg)
                   }
         }).catch(err=>{
           this.$message.error(err)
         })
      }
  }
};
</script>

<style scoped lang = "scss">
.login-wrap {
  height: 100vh;
  /* 解决margin塌陷 */
  overflow: hidden;
  .form-box {
    border: 1px solid #f1f1f1;
    border-radius: 4px;
    height: 300px;
    width: 400px;
    margin: 100px auto;
    padding: 4px;
    box-sizing: border-box;
  }
  /deep/ .el-form-item__label {
    color: #fff;
  }
  .btn {
    width: 150px;
    display: block;
    margin: 0 auto;
  }
}
</style>