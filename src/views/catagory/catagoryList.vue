<template>
    <div>
        <el-card>
            <div slot="header">分类列表</div>
            <el-table :data="tableData">
                <el-table-column prop="title" label="分类标题">
                </el-table-column>
                <el-table-column label="分类图标">
                    <template slot-scope="scope">
                        <img :src="scope.row.icon" class="icon">
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" size="small" @click="handleRem(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="count" :page-size="4" @current-change="handlepage"></el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      count: 0,
      pn: 1
    };
  },
  methods: {
    getData() {
      this.$axios.get("/admin/catagory", { pn: this.pn, size: 5 }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.count = res.count;
        }
      });
    },
    handlepage(page) {
      // console.log(page);
      this.pn = page;
      this.getData();
    },
    handleRem(id) {
        console.log(id);
      this.$axios.delete(`/admin/catagory/${id}`).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.getData();
        }
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.icon {
  width: 50px;
  height: 50px;
}
</style>