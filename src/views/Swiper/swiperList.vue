<template>
    <div>
        <el-card>
            <div slot="header">轮播图列表</div>
            <el-table :data="list" stripe border>
                <el-table-column label="轮播图" width="100">
                    <template slot-scope="scope">
                        <img :src="scope.row.imgUrl" class="img">
                    </template>
                </el-table-column>
                    <el-table-column prop="title" label="轮播图标题"></el-table-column>
                        <el-table-column prop="newsId.title" label="新闻标题">
                    </el-table-column>
                    <el-table-column prop="sort" label="轮播图排序">
                    </el-table-column>
                    <el-table-column prop="status" label="是否显示">
                    </el-table-column>
                    <el-table-column  label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="handleEdit(scope.row._id)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleRem(scope.row._id)">删除</el-button>
                        </template>
                    </el-table-column>
            </el-table>
            <el-pagination background layout="prev,pager,next" :total="count" :page-size="2" @current-change="handleCurrentChange">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      count:0,
      pn:1
    };
  },
  methods: {
    getSwiper() {
      this.$axios.get("/admin/swiper",{pn:this.pn,size:4}).then(res => {
        if (res.code == 200) {
          this.list = res.data;
          this.count = res.count
        }
      });
    },
    handleEdit(id){
this.$router.push({name:'editSwiper',query:{id}})
    },
    handleRem(id){
 this.$axios.patch(`/admin/swiper/${id}`).then(res=>{
     if(res.code == 200){
         this.$message.success(res.msg)
         this.getSwiper()
     }else{
         this.$message.error('删除失败')
     }
 })
    },
    handleCurrentChange(page){
this.pn = page;
this.getSwiper()
    },
  },
  created(){
      this.getSwiper();
  }
};
</script>

<style scoped>
</style>