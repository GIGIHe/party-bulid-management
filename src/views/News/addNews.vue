<template>
  <div>
    <el-card class="card">
      <div slot="header">添加新闻</div>
      <el-form :model="formdata" label-width="80px" class="form-wrap">
        <el-form-item label="新闻标题" required>
          <el-input v-model="formdata.title" :disabled="!isShow"></el-input>
        </el-form-item>
        <el-form-item label="新闻作者">
          <el-select v-model="formdata.author">
            <el-option v-for="item in user" :key="item._id" :value="item._id" :label="item.nickname"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="新闻内容">
          <RichText v-model="richText"></RichText>
        </el-form-item>
        <el-form-item label="新闻头图">
          <upload v-model="formdata.img"></upload>
        </el-form-item>
        <el-form-item label="新闻分类">
          <el-select placeholder="请选择" v-model="formdata.type">
            <el-option :value="item._id" v-for="(item) in catagory" :key="item._id" :label="item.title"></el-option>
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
import RichText from "@/components/RichText";
export default {
  components: {
    upload,
    RichText
  },
  data() {
    return {
      formdata: {
        title: "",
        author: "",
        type: "",
        img: "",
        content: "",
        contentText: ""
      },
      richText:{},
            user: [],
      catagory: [],
      isShow: true
    };
  },
  methods: {
    getUser() {
      this.$axios.get("/admin/adminUser/user").then(res => {
        if (res.code == 200) {
          this.user = res.data;
        }
      });
    },
    getType() {
      this.$axios.get("/admin/catagory").then(res => {
        this.catagory = res.data;
      });
    },
    handleSubmit() {
      this.$axios.post("/admin/news", this.formdata).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          setTimeout(() => {
            this.$router.push("/layout/newsList");
          }, 1000);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleSave() {}
  },
  watch:{
richText(val){
  console.log(val);
  this.formdata.contentText =val.contentText,
  this.formdata.content = val.content
}
  },
  created() {
    this.getUser();
    this.getType();
  }
};
</script>

<style scoped lang ="scss">
.card {
  margin-bottom: 20px;
  /deep/ .ql-container {
    min-height: 300px;
  }
  /deep/ .ql-editor img {
    width: 400px;
    height: 300px;
    display: block;
  }
}
.form-wrap {
  margin: 0 auto;
}
</style>