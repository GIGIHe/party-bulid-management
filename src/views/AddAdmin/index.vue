<template>
    <div>
        <el-card class="card">
            <div slot="header">添加管理员</div>
            <el-form :model="formdata" label-width="80px" class="form-wrap">
                <el-form-item label="用户名" required>
                    <el-input v-model="formdata.username" :disabled="!isShow"></el-input>
                </el-form-item>
                <el-form-item label="密码" required>
                    <el-input v-model="formdata.password" type="password" :disabled="!isShow"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="formdata.nickname"></el-input>
                </el-form-item>
                <el-form-item label="个性签名">
                    <el-input v-model="formdata.desc"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formdata.phone"></el-input>
                </el-form-item>
                <el-form-item label="工作地点" v-if="!isShow">
                    <el-input v-model="formdata.job"></el-input>
                </el-form-item>
                <el-form-item label="用户头像">
                    <upload v-model="formdata.img"></upload>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="formdata.sex" placeholder="请选择">
                        <el-option value="1" label="男"></el-option>
                        <el-option value="0" label="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit" v-if="isShow">提交</el-button>
                    <el-button type="primary" @click="handleSave" v-else>保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import upload from "@/components/upload";
export default {
  components: {
    upload
  },
  data() {
    return {
      formdata: {
        username: "",
        nickname: "",
        img: "",
        password: "",
        desc: "",
        sex: "",
        phone: ""
      },
      isShow: true
    };
  },
  methods: {
    handleSubmit() {
      this.$axios
        .post("/admin/adminUser", this.formdata)
        .then(res => {
          if (res.code == 200) {
            this.$message.success("添加成功");
            setTimeout(() => {
              this.$router.push("/layout/adminList");
            }, 1000);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    handleSave() {
      let id = this.$route.query.id;
        console.log("baocun:",id);
      this.$axios
        .patch(`/admin/adminUser/user/${id}`, this.formdata)
        .then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.$router.push('/layout/adminList')
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 获取单个用户信息
    getData() {
      let id = this.$route.query.id;
    
      this.$axios.get(`/admin/adminUser/user/${id}`).then(res => {
        this.formdata = res.data;
        console.log("编辑用户信息: ", res);
      });
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "editAdmin") {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    }
  },
  created() {
    if (this.$route.name == "editAdmin") {
      this.isShow = false;
      this.getData();
    } else {
    //   this.formdata ={}
      this.formdata = {
        username: "",
        nickname: "",
        img: "",
        password: "",
        desc: "",
        sex: "",
        phone: ""
      };
       this.isShow = true;
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
.form-wrap {
  width: 700px;
  margin: 0 auto;
}
</style>