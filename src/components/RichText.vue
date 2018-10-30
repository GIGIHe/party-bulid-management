<template>
    <div class="wraper">
        <quill-editor v-model="formdata.content" ref="myQuillEditor" :options="editorOption" @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);
export default {
  components: {
    quillEditor
  },
  props: {
    value: Object
  },
  data() {
    return {
      formdata: {
        content: "",
        contentText: ""
      },
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
    onEditorChange({ editor, html, text }) {
      //   console.log("editor change!", editor, html, text);
      this.contentText = html;
      this.formdata.contentText = text; //不能将text赋值给content.因为上面v-model：content
      this.formdata.contentText =
        this.formdata.contentText.substring(0, 10) + "...";
        this.$emit("input", {...this.formdata});
    }
  },
  watch: {
    value(val) {
      return this.formData = val;
    }
  }
};
</script>

<style lang="scss">
.wraper {
  /deep/ .ql-container {
    min-height: 300px;
  }
  /deep/ .ql-editor img {
    width: 400px;
    height: 300px;
    display: block;
  }
}
</style>