<template>
    <div>
     <el-card>
         <div slot="header">新闻列表</div>
        <el-table :data="list" stripe border>
              <el-table-column label="新闻头图" width="100">
                <template slot-scope="scope">
                    <img :src="scope.row.img" class="img">
                </template>
            </el-table-column>
            <el-table-column label="新闻标题">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top-start" transition	>
                        <div class="popover-style">
                            <p class="text">新闻内容:{{scope.row.contentText}}</p>
                        </div>
                        <el-tag slot="reference" size="medium">{{scope.row.title}}</el-tag>
                    </el-popover>
                </template>
            </el-table-column>
              <el-table-column prop="type.title" label="新闻分类">
            </el-table-column>
            <el-table-column prop="author.nickname" label="新闻作者">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleDET(scope.row._id)">详情</el-button>
                    <el-button type="danger" size="small" @click="handleRem(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev,pager,next" :total="count"  :page-size = "2" @current-change="handleCurrentChange">
        </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pn:1,
      count:1
    };
  },
  methods: {
    getData() {
      this.$axios
        .get("/admin/news", { pn: this.pn, size: 4 })
        .then(res => {
          this.list = res.data;
          this.count = res.count
        });
    },
    handleCurrentChange(pn) {
      console.log(pn);
      this.pn = pn;
      this.getData()
    },
    handleDET(id) {
        this.$router.push({name:"newsItem",query:{id}})
    },
    handleRem(id) {
        this.$axios.delete(`/admin/news/${id}`).then(res=>{
            if(res.code == 200){
                this.$message.success(res.msg)
                this.getData()
            }else{
                this.$message.error(res.msg)
            }
        })
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.popover-style{
    color: blueviolet;
    font-weight: 600;
}

</style>