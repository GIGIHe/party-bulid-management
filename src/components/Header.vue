<template>
    <div class="wrap">
        <div class="top clearfix">
            <el-dropdown class="fr drop-menu mr">
                <span class="el-dropdown-link">
                    <img :src="$store.state.userInfo.img" class="img-box" alt="">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click="handleLogin">登录</el-dropdown-item>
                    <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <h2 class="fl ml common-title">党建E家后台管理系统</h2>

        </div>
        <el-breadcrumb separator-class="el-icon-arrow-right ">
            <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/layout/addAdmin'}">添加管理员</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/adminList' }">管理列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
import "../style/common.css";
export default {
  methods: {
    handleLogin() {
      this.$router.push("/layou");
    },
    handleLogout() {
      this.$message.info("退出登录，请重新登录");
      setTimeout(() => {
        this.$router.push("/");
      }, 1000);
    }
  }
};
</script>

<style scoped lang = "scss">
.wrap {
  height: 80px;
  .top {
    height: 50px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  .drop-menu {
    line-height: 50px;
  }
  .img-box {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .common-title {
    width: 800px;
    line-height: 50px;
    font-weight: 500;
    margin: 0 auto;
  }
  .mr {
    margin-left: 10px;
  }
}
</style>