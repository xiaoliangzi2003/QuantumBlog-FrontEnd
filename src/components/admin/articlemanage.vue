<template>
  <div class="article-manage">
    <el-table :data="articles" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="publishDate" label="发布日期"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ArticleManage',
  data() {
    return {
      articles: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        title: `文章${i + 1}`,
        author: `作者${i + 1}`,
        publishDate: `日期${i + 1}`,
        status: i % 2 === 0 ? '已发布' : '草稿'
      }))
    }
  }
}
</script>

<style scoped>
.article-manage {
  padding: 20px;
}
</style>