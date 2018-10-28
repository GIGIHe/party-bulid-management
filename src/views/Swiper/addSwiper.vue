<template>
    <div class="wrap">
        <el-card>
            <div slot=" header">添加轮播图</div>
            <el-form :model="formdata" label-width="100px">
                <el-form-item label="轮播图标题" required>
                    <el-input v-model="formdata.title"></el-input>
                </el-form-item>
                <el-form-item label="轮播图" required>
                    <template slot-scope="scope">
                        <upload v-model="formdata.imgUrl"></upload>
                    </template>
                </el-form-item>
                <el-form-item label="轮播图分类" required>
                    <template slot-scope="scope">
                        <el-select v-model="formdata.newsId" placeholder="请选择">
                            <el-option v-for="item in news" :key="item._id" :label="item.title" :value="item._id">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="是否显示" required v-model="formdata.status">
                    <el-switch v-model="num" active-text="显示" inactive-text="不显示" @change="handleStatus">
                    </el-switch>
                </el-form-item>
                <el-form-item label="轮播图排序" required>
                    <el-input-number v-model="formdata.sort" @change="handleChange" :min="1" :max="10"></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit" v-if="isShow">提交</el-button>
                    <el-button type="primary" @click="handleSubmit" v-else>保存</el-button>
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
        imgUrl: "",
        title: "",
        newsId: "",
        status: "",
        sort: ""
      },
      news: [],
      num: true,
      isShow: true
    };
  },
  methods: {
    handleChange(val) {
      // console.log(val);
    },
    handleStatus(e) {
      if (e) {
        this.formdata.status = 1;
      } else {
        this.formdata.status = 0;
      }
    },
    getnews() {
      this.$axios.get("/admin/news").then(res => {
        if (res.code == 200) {
          this.news = res.data;
        }
      });
    },
    getnewsItem(){
        let id = this.$route.query.id
this.$axios.get(`/admin/swiper/${id}`).then(res=>{
    if(res.code == 200){
        this.formdata = res.data//提交和修改的同样格式的数据
    }
})
    },
    handleSubmit() {
      this.$axios.post("/admin/swiper", this.formdata).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          setTimeout(() => {
            this.$router.push("/layout/swiperList");
          }, 1000);
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "editSwiper") {
        this.isShow = false;
       
      } else {
        this.isShow = true;
      }
    }
  },
  created() {
    this.getnews();
    if(this.$route.name == "editSwiper"){
          this.isShow = false;
 this.getnewsItem()
      } else {
        this.isShow = true;
        this.formdata = null
      
    }
  }
};
</script>

<style scoped lang = "scss">
</style>