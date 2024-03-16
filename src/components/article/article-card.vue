<template>
  <el-card class="article-card">
    <div class="article-info">
      <img :src="authorAvatar" class="author-avatar" alt="作者头像">
      <div>
        <h2 class="article-title">{{ title }}</h2>
        <p class="author-name">{{ authorName }}</p>
        <p class="publish-time">{{ publishTime }}</p>
      </div>
    </div>
    <div class="article-stats">
      <p>浏览量: {{ views }}</p>
      <p>点赞数: {{ likes }}</p>
      <p>转发数: {{ shares }}</p>
      <p>评论数: {{ comments }}</p>
    </div>
    <div class="article-actions">
      <el-button icon="el-icon-thumb" @click="likeArticle">点赞</el-button>
      <el-button icon="el-icon-message" @click="commentArticle">评论</el-button>
      <el-button icon="el-icon-share" @click="shareArticle">转发</el-button>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ArticleCard',
  data() {
    return {
      title: '',
      author: '',
      publishTime: '',
      authorAvatar: '',
      views: '',
      likes: '',
      shares: '',
      comments: '',
      collects:'',
      forwords:''
    }
  },

  created() {
    let articleId = this.$route.params.id

    axios.get(`http://localhost:8080/blog/get-article-brief-info/${articleId}`
    ).then(response => {
      let article = response.data.data
      this.title = article.title
      this.author = article.author
      this.publishTime = article.publishTime
      this.authorAvatar = article.authorAvatar
      this.views = article.views
      this.likes = article.likes
      this.shares = article.shares
      this.comments = article.comments
      this.collects=article.collects
      this.forwards=article.forwards
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    likeArticle() {
      // 点赞文章的逻辑
    },
    commentArticle() {
      // 评论文章的逻辑
    },
    shareArticle() {
      // 转发文章的逻辑
    }
  }
}
</script>

<style scoped>
.article-stats {
  background-color: #f2f2f2; /* 浅灰色背景 */
  color: #333; /* 深色文字 */
  padding: 10px;
  border-radius: 5px;
}

.article-actions {
  background-color: #f2f2f2; /* 浅灰色背景 */
  color: #333; /* 深色文字 */
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
}

.article-actions .el-button {
  color: #333; /* 按钮文字颜色 */
}

.article-actions .el-button:hover {
  color: #fff; /* 鼠标悬停时的文字颜色 */
  background-color: #333; /* 鼠标悬停时的背景颜色 */
}
</style>