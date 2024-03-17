<template>
  <el-card class="article-card">
    <div class="card-content">
      <div class="left-content">
        <div class="article-info">
          <div>
            <h2 class="article-title">{{ title }}</h2>
            <p class="publish-time">{{ publishTime }}</p>
          </div>
        </div>
        <div class="article-stats">
          <div class="icon-stat">
            <el-tooltip content="浏览量">
              <img src="../../../public/image/icon/view.svg" alt="view icon" class="input-icon"/>
            </el-tooltip>
            <span>{{ views }}</span>
          </div>
          <div class="icon-stat">
            <el-tooltip content="点赞量">
              <img src="../../../public/image/icon/like_disable.svg" alt="thumb icon" class="input-icon"/>
            </el-tooltip>
            <span>{{ likes }}</span>
          </div>
          <div class="icon-stat">
            <el-tooltip content="评论量">
              <img src="../../../public/image/icon/comment.svg" alt="comment icon" class="input-icon"/>
            </el-tooltip>
            <span>{{ comments }}</span>
          </div>
          <div class="icon-stat">
            <el-tooltip content="收藏量">
              <img src="../../../public/image/icon/collect_disable.svg" alt="star icon" class="input-icon"/>
            </el-tooltip>
            <span>{{ collects }}</span>
          </div>
          <div class="icon-stat">
            <el-tooltip content="转发量">
              <img src="../../../public/image/icon/share.svg" alt="star icon" class="input-icon"/>
            </el-tooltip>
            <span>{{ forwards }}</span>
          </div>
        </div>
      </div>
      <div class="right-content">
        <img src="http://localhost:8080/user-profile/get-avatar/xiaoliangzi" class="author-avatar" alt="作者头像" @click="goToUserProfile(author)">
        <p class="author-name">{{ author }}</p>
      </div>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'

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
      forwards:''
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

      Cookies.set('article-title', this.title)
      Cookies.set('article-author', this.author)
      Cookies.set('article-id', articleId)
    }).catch(error => {
      console.log(error)
    })
  },

  methods: {
    goToUserProfile(username) {
      this.$router.push({ name: 'UserProfile', params: { username: username } });
    },
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
.author-avatar {
  width: 100px;  /* 将头像大小调小 */
  height: 100px;  /* 将头像大小调小 */
  border-radius: 50%;  /* 将头像变为圆形 */
  margin-bottom: 30px;
  margin-right: 20px;
}

.article-actions .el-button {
  color: #333; /* 按钮文字颜色 */
}

.article-actions .el-button:hover {
  color: #fff; /* 鼠标悬停时的文字颜色 */
  background-color: #333; /* 鼠标悬停时的背景颜色 */
}

.article-stats {
  display: flex;
  flex-direction: row;  /* 设置为水平排列 */
  justify-content: flex-start;  /* 从左开始排列 */
  align-items: center;
}

.input-icon {
  width: 15px;  /* 将图标大小调小 */
  height: 15px;  /* 将图标大小调小 */
  padding: 0 10px;
}

.icon-stat {
  margin-right: 10px;  /* 添加右边距 */
}

.card-content {
  display: flex;
  justify-content: space-between;
}

.left-content {
  display: flex;
  flex-direction: column;
}

.right-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.author-avatar,
.author-name {
  margin: auto;
}

</style>