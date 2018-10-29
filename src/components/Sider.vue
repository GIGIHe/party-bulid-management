<template>
    <div class="sider-menu">
        <el-menu default-active="2" class="menu" background-color="#545c64" text-color="#fff" :router=true active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>首页</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/layout">首页</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>管理员</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/layout/adminList">管理员列表</el-menu-item>
                    <el-menu-item index="/layout/addAdmin">添加管理员</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-news"></i>
                    <span>新闻管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/layout/newsList">新闻列表</el-menu-item>
                    <el-menu-item index="/layout/addNews">添加新闻</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-star-on"></i>
                    <span>轮播图管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/layout/swiperList">轮播图列表</el-menu-item>
                    <el-menu-item index="/layout/addSwiper">添加轮播图</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
             <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-share"></i>
                    <span>分类管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/layout/catagoryList">分类列表</el-menu-item>
                    <el-menu-item index="/layout/addCatagory">添加分类</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                    <i class="el-icon-date"></i>
                    <span>发帖管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/layout/topicList">主题列表</el-menu-item>
                    <el-menu-item index="/layout/addTopic">添加主题</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang = "scss">
.sider-menu {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  z-index: 999;
  overflow: hidden;
  width: 200px;
  background-color: #545c64;
  .menu {
    border-right: 1px;
  }
  /deep/ .el-submenu .el-menu-item {
    min-width: 100%;
  }
}
</style>