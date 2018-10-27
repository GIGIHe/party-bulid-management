<template>
  <div>
    <el-upload class="avatar-uploader" action="https://upload-z1.qiniup.com" :on-success="handleAvatarSuccess" :show-file-list="false" :data="formdata">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      formdata: {
        token: ""
      },
      imageUrl: this.value
    };
  },
  methods: {
    getToken() {
      axios.get("http://upload.yaojunrong.com/getToken").then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.formdata.token = res.data.data;
          this.$store.commit('CHANGE_TOKEN',res.data.data)
        }
      });
    },
    handleAvatarSuccess(e) {
      //   console.log(e);
      this.imageUrl = e.url;
      this.$emit("input", this.imageUrl);
    }
  },
  watch: {
    value(val) {
      return (this.imageUrl = val);
    }
  },
  created() {
    this.getToken();
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px solid #eee;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>