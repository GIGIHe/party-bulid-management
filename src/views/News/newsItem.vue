<template>
    <div class="wrap">
        <el-card class="card">
            <h3 class="title">
                <i class=" iconfont icon-title"></i>{{newsData.title}}</h3>
            <div class="detail clearfix" v-if="newsData">
                <div class="fl author">
                    <i class="  iconfont icon-shuqian-"></i>
                    <span>{{newsData.author.nickname}}</span>
                </div>
                <div class="fl create-time ">
                    <i class="  iconfont icon-shijian"></i>
                    <span>{{newsData.created_at}}</span>
                </div>
                <div class="fl catagory ">
                    <img :src="newsData.type.icon" class="icon">
                    <span>{{newsData.type.title}}</span>
                </div>
                <div class="fl ">
                    <i class="iconfont icon-yuedushuliang"></i>
                    <span class="readnum">{{newsData.looknumber}}</span>
                </div>

            </div>
            <div class="img-content clearfix">
                <img :src="newsData.img" class="fl">
                <div class="content fl" v-html="newsData.content"></div>
            </div>

            <!-- <div v-for="(value, key,index) in newsData" :key="index">
    <h3>{{value}}</h3>
    </div> -->
        </el-card>
    </div>
</template>

<script>
import '@/style/common.css'
export default {
  data() {
    return {
      newsData: ""
    };
  },
  methods: {
    getData() {
      let id = this.$route.query.id;
      this.$axios.get(`/admin/news/${id}`).then(res => {
        if (res.code == 200) {
          this.newsData = res.data;
        } else {
          this.$message.error(error);
        }
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style>
.icon-title,
.icon-shuqian-,
.catagory
{
 color: red;
 font-size: 12px;
}
.icon-yuedushuliang{
  font-size: 12px;
  font-weight: 700;
}
.card{
    min-height: 100vh;
}
</style>

<style scoped lang = "scss">
 .detail {
    margin-bottom: 20px;
    width: 400px;
    height: 40px;
    line-height: 40px;
  }
.title {
  font-size: 20px;
  font-family: "Helvetica Neue";
  font-weight: 600;
  color: #303133;
}
.img-content {
  .content {
    margin-top: 30px;
    margin-left: 20px;
  }
  img{
    width: 100px;
    height: 100px;
  }
}
.author,
 .create-time,
  .catagory {
     margin-right: 8px;
     font-size: 12px;
  }
  .readnum{
    font-size: 12px;
    color: #f00;
    font-weight: 700;
  }
  .catagory{
    color: #606266;
  }
    .icon{
width: 20px;
height: 20px;
vertical-align: middle
    }
</style>