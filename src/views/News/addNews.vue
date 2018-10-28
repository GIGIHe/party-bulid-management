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
                    <quill-editor v-model="formdata.content" ref="myQuillEditor" :options="editorOption" @change="onEditorChange($event)">
                    </quill-editor>
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
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);
export default {
  components: {
    upload,
    quillEditor
  },
  data() {
    return {
      formdata: {
        title: "",
        content: "",
        contentText: "",
        author: "",
        type: "",
        img: ""
      },
      user: [],
      catagory: [],
      isShow: true,
      // 富文本框参数设置
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: "file",
            action: "https://upload-z1.qiniup.com",
            response: res => {
              // response 为一个函数用来获取服务器返回的具体图片地址
              return res.url;
            },
            change: (xhr, formData) => {
              // xhr.setRequestHeader('myHeader','myValue')
              formData.append("token", this.$store.state.token);
            } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
          },
          toolbar: {
            container: container,
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id);
              }
            }
          }
        }
      }
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
        this.$axios.post('/admin/news',this.formdata).then(res=>{
            if(res.code == 200){
                this.$message.success(res.msg)
                setTimeout(() => {
                    this.$router.push('/layout/newsList')
                }, 1000);
            }else{
                this.$message.error(res.msg)
            }
        })
    },
    handleSave() {},
    onEditorChange({ editor, html, text }) {
      //   console.log("editor change!", editor, html, text);
      this.formdata.contentText = text; //不能将text赋值给content.因为上面v-model：content
      this.formdata.contentText= this.formdata.contentText.substring(0,10) + '...'
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