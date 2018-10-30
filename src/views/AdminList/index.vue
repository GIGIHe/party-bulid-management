<template>
    <div>
        <h2>管理员列表</h2>
        <el-table :data="list" stripe border>
            <el-table-column label="用户名">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top-start" transition	>
                        <div class="popover-style">
                            <p>昵称:{{scope.row.nickname}}</p>
                            <p>工作地点:{{scope.row.job}}</p>
                        </div>
                        <el-tag slot="reference" size="medium">{{scope.row.username}}</el-tag>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
            </el-table-column>
            <el-table-column  label="头像" width="80">
                <template slot-scope="scope">
                    <img :src="scope.row.img" class="img">
                </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" :formatter = "formatsex">
            </el-table-column>
            <el-table-column prop="desc" label="签名">
            </el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.row._id)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleRem(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev,pager,next" :total="count"  :page-size = "1"   @current-change="handleCurrentChange">
        </el-pagination>
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
        .get("/admin/adminUser/user",{pn:this.pn,size:4})
        .then(res => {
          this.list = res.data;
          this.count = res.count
        });
    },
    handleCurrentChange(page) {
      console.log(page);
      this.pn = page;
      this.getData()
    },
    handleEdit(id) {
        this.$router.push({name:"editAdmin",query:{id}})
    },
    handleRem(id) {
    console.log(id);
        this.$axios.delete(`/admin/adminUser/user/${id}`).then(res=>{
            if(res.code == 200){
                this.$message.success(res.msg)
                this.getData()
            }else{
                this.$message.error(res.msg)
            }
        })
    },
    //不需要created，本来就是属性
    formatsex:function(row, column, cellValue, index) {
     console.log('formatter: ',row, column, cellValue, index)
    return  cellValue == 1?'男': cellValue == 1?'女':''
}
  },
//   computed:{
//  formatsex:function(row, column, cellValue, index) {
//      console.log(row, column, cellValue, index)
//     return  cellValue == 1?'男':'女'
// }
//   },
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