<template>
  <el-container direction="vertical" class="index-container">
    <Navigation/>
    <el-carousel :interval="4000" arrow="always">
      <el-carousel-item v-for="(image, index) in images" :key="index">
        <img :src="image" class="banner-image"  alt="">
      </el-carousel-item>
    </el-carousel>
    <el-container>
      <el-aside width="20%">
      </el-aside>
      <el-main>
        <Articles />
      </el-main>
      <el-aside width="20%">
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
import axios from "axios";
import Articles from "../components/article/article-list.vue"
import Navigation from "../components/index/header.vue"

export default {
  name: 'Index',
  components: {Navigation, Articles},
  data() {
    return {
      images: []
    }
  },
  created() {
    // 在这里初始化 images 数据属性
    this.images = [
        'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=600',
    ];
  }
}
</script>

<style scoped>
.banner-image {
  width: 100vw; /* 设置宽度为浏览器的宽度 */
  height: 300px; /* 设置高度为300px */
  object-fit: cover; /* 视频保持宽高比，同时填充元素的整个内容框 */
}

.index-container {
  height: 100vh;
}
.index-top-navigation {
  background-color: black;
}

el-menu {
  background-color: black;
}

el-menu-item {
  color: black;
}

.search-input {
  color: white;
  background-color: black;
  font-size: 16px;
}
</style>