<template>
    <!-- 主界面 -->
    <div class="layout-wrap">
        <el-row>
            <el-col :span="4">
                <Sider></Sider>
            </el-col>
            <el-col :span="20" class="right">
                <el-row class="head-wrap">
                    <Header></Header>
                </el-row>
                <el-row>
                    <router-view></router-view>
                </el-row>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import Header from "@/components/Header";
import Sider from "@/components/Sider";
// import Index from "./index";
export default {
  components: {
    Header,
    Sider,
    // Index
  }
};
</script>

<style scoped lang = "scss">
.layout-wrap{
    height: 100%;
 
}
.right{
    margin-left: 200px;
    padding-left: 4px;
    box-sizing: border-box;
}
 
</style>