<template>
  <el-header class="index-top-navigation">
    <el-menu mode="horizontal" class="top-menu">
      <el-menu-item index="1" class="top-menu-element">量子论坛</el-menu-item>
      <el-menu-item index="2" class="top-menu-element">首页</el-menu-item>
      <el-menu-item index="3" class="top-menu-element">发现</el-menu-item>
      <el-menu-item index="4" class="top-menu-element">问答</el-menu-item>
      <el-menu-item index="5" class="top-menu-element">视频</el-menu-item>
      <el-menu-item index="6" class="top-menu-element">关于</el-menu-item>
      <el-menu-item index="7" class="top-menu-element">个人中心</el-menu-item>
      <el-input class="search-input" placeholder="搜索"></el-input>
    </el-menu>
  </el-header>
</template>

<script>

</script>

<style scoped>
.index-top-navigation {
  background-color: black;
}

el-menu {
  background-color: black;
}

el-menu-item {
  color: white;
}

.search-input {
  color: white;
  background-color: black;
  font-size: 16px;
}

.top-menu{
  background-color: black;

  font-size: 16px;
}

.top-menu-element{
  color: white;
}
</style>