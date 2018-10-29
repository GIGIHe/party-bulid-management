<template>
  <div class="wrap">
    <el-card>
      <div slot="header">发表主题</div>
      <el-form :model="formdata" label-width="100px">
        <el-form-item label="主题内容" required>
          <!-- <RichText v-model="formdata.richData"></RichText> -->
          <el-input v-model="formdata.content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="是否公开" required v-model="formdata.type">
          <el-switch v-model="num" active-text="公开" inactive-text="不公开" @change="handleStatus">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import RichText from "@/components/RichText";
export default {
  components: {
    RichText
  },
  data() {
    return {
      formdata: {
        type: 1,
        content:''
        // richData: {
        //   content: "",
        //   contentText: ""
        // }
      },
      num: true
    };
  },
  methods: {
    handleSubmit() {
      this.$axios.post("/admin/topic", this.formdata).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg);
        }
      });
    }
  },
  computed: {
    handleStatus(e) {
      if (e) {
        return (this.type = 1);
      } else {
        return (this.type = 0);
      }
    }
  }
};
</script>

<style scoped>
</style>