<template>
  <el-container direction="vertical">
    <index-header></index-header>
    <el-container>
      <el-aside></el-aside>
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>User Profile</span>
          </div>
          <div class="user-profile">
            <img :src="avatar" class="avatar">
            <div class="user-info">
              <h2>{{ username }}</h2>
              <p>{{ birthday }}</p>
              <p>{{ gender }}</p>
              <p>{{ signature }}</p>
              <p>{{ address }}</p>
              <p>{{ socialAccounts }}</p>
            </div>
          </div>
        </el-card>
        <el-tabs v-model="activeTab" @tab-click="handleClick" class="art-tabs">
          <el-tab-pane label="动态" name="activities">
            <!-- 在这里添加动态列表 -->
          </el-tab-pane>
          <el-tab-pane label="文章" name="articles">
            <el-card class="article" v-for="article in articles" :key="article.id" @click="goToArticleDetail(article)">
              <h2 class="article-title">{{ article.title }}</h2>
              <p class="article-summary">{{ article.summary+'...' }}</p>
              <div class="article-stats">
                <div class="icon-stat">
                  <el-tooltip content="浏览量">
                    <img src="../../../public/image/icon/view.svg" alt="view icon" class="input-icon"/>
                  </el-tooltip>
                  <span>{{ article.views }}</span>
                </div>
                <div class="icon-stat">
                  <el-tooltip content="点赞量">
                    <img src="../../../public/image/icon/like_disable.svg" alt="thumb icon" class="input-icon"/>
                  </el-tooltip>
                  <span>{{ article.likes }}</span>
                </div>
                <div class="icon-stat">
                  <el-tooltip content="评论量">
                    <img src="../../../public/image/icon/comment.svg" alt="comment icon" class="input-icon"/>
                  </el-tooltip>
                  <span>{{ article.comments }}</span>
                </div>
                <div class="icon-stat">
                  <el-tooltip content="收藏量">
                    <img src="../../../public/image/icon/collect_disable.svg" alt="star icon" class="input-icon"/>
                  </el-tooltip>
                  <span>{{ article.collects }}</span>
                </div>
                <div class="icon-stat">
                  <el-tooltip content="转发量">
                    <img src="../../../public/image/icon/share.svg" alt="star icon" class="input-icon"/>
                  </el-tooltip>
                  <span>{{ article.forwards}}</span>
                </div>
              </div>
              <div class="article-info">
                <p class="article-author">作者: {{ article.author }}</p>
                <p class="article-category">分类: {{ article.category }}</p>
                <div class="article-tags">
                  <el-tag class="article-tag" v-for="tag in article.tags.split(',')" :key="tag">{{ tag }}</el-tag>
                </div>
              </div>
            </el-card>
            <div v-if="hasMore" @click="loadUserArticles" class="load-more">点击加载更多</div>
          </el-tab-pane>
          <el-tab-pane label="回答" name="answers">
            <!-- 在这里添加回答列表 -->
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <el-aside></el-aside>
    </el-container>
  </el-container>
</template>

<script>
import IndexHeader from '@/components/index/header.vue';
import axios from 'axios';

export default {
  components: {
    IndexHeader
  },
  data() {
    return {
      username: '',
      avatar: '',
      birthday: '',
      gender: '',
      signature: '',
      address: '',
      socialAccounts: '',
      activeTab: 'articles',
      articles: [],
      pageNum: 1,
      pageSize: 10,
      hasMore: true
    }
  },
  created() {
    this.username = this.$route.params.username;
    this.loadUserArticles();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    loadUserArticles() {
      axios.post('http://localhost:8080/blog/article-list-by-author', {
        author: this.username,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(response => {
        if (response.data.statusCode === 200) {
          this.articles = this.articles.concat(response.data.data.articleList);
          this.pageNum++;
          if (response.data.data.articleList.length < this.pageSize) {
            this.hasMore = false;
          }
        } else {
          console.error('Failed to load articles: ' + response.data.message);
        }
      }).catch(error => {
        console.error('Failed to load articles: ' + error);
      });
    },
    goToArticleDetail(article) {
      this.$router.push(`/article-detail/${article.id}`);
    }
  }
}
</script>

<style scoped>
.article-summary{
  margin-left: 20px;
}

.art-tabs{
  margin-top: 20px;

}
.user-profile {
  display: flex;
  align-items: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.article-author,
.article-category {
  display: block;  /* 修改为 block 或其他合适的值 */
}

.author-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
  text-align: right;
}

.article-tag{
  margin-right: 10px;
}
.load-more {
  text-align: center;
  padding: 10px;
  cursor: pointer;
}

.icon-stat {
  display: flex;
  align-items: center;
}

.input-icon {
  width: 20px;
  height: 20px;
  padding: 0 10px;
}

.article-title {
  text-align:left;
  margin-top: 0;
  margin-left: 20px;
}

.article-info{
  text-align: right;

}
.article-date {
  position: absolute;
  top: 10px;
  right: 10px;
  margin-right: 20px;
}

.article-stats {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 10px;
  left: 10px;

}

.article-author,
.article-category {
  display: none;  /* 隐藏作者和分类 */
}

.article-tags {

  margin-top:20px;
}

.index-container {
  height: 100vh;
}

.articles {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow-y: scroll; /* Allow vertical scrolling */
}

.articles::-webkit-scrollbar {
  display: none; /* Hide the scrollbar */
}

.article {
  width: 100%;
  margin-bottom: 5px;
  position: relative;
  padding-top: 0;
  box-sizing: border-box;
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