<template>
    <div>
<el-card>
    <div slot="header">添加分类</div>
    <el-form :model="formdata" label-width="100px" >
        <el-form-item label="分类标题" required>
<el-input v-model="formdata.title"> </el-input>
        </el-form-item>
          <el-form-item label="分类图标" required>
<upload v-model="formdata.icon"></upload>
        </el-form-item>
        <el-form-item>
            <el-button @click="handleSubmit" type = "primary">提交</el-button>
        </el-form-item>
    </el-form>
</el-card>
    </div>
</template>

<script>
import upload from "@/components/upload";
    export default {
        components:{
            upload,
        },
        data(){
            return{
                formdata:{
                    title:'',
                    icon:''
                }
            }
        },
        methods:{
            handleSubmit(){
                this.$axios.post('/admin/catagory',this.formdata).then(res=>{
                   if (res.code == 200) {
          this.$message.success(res.msg);
          setTimeout(() => {
            this.$router.push("/layout/swiperList");
          }, 1000);
        } else {
          this.$message.error(res.msg);
        }
                })
            }
        }
    }
</script>

<style scoped>

</style>