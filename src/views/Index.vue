<template>
  <el-container direction="vertical" class="index-container">
    <el-header class="index-top-navigation">
      <el-menu mode="horizontal">
        <el-menu-item index="1">量子论坛</el-menu-item>
        <el-menu-item index="2">首页</el-menu-item>
        <el-menu-item index="3">发现</el-menu-item>
        <el-menu-item index="4">问答</el-menu-item>
        <el-menu-item index="5">视频</el-menu-item>
        <el-menu-item index="6">关于</el-menu-item>
        <el-menu-item index="7">个人中心</el-menu-item>
        <el-input class="search-input" placeholder="搜索"></el-input>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="20%">
        <!-- Left aside content goes here -->
      </el-aside>
      <el-main>
        <div class="articles" @scroll.passive="handleScroll">
          <el-card class="article" v-for="article in articles" :key="article.id" @click="goToArticleDetail(article)">
            <h2 class="article-title">{{ article.title }}</h2>
            <p class="article-date">{{ formatDate(article.createTimeStamp) }}</p>
            <div class="article-stats">
              <div class="icon-stat">
                <el-tooltip content="浏览量">
                  <img src="../../public/image/icon/view.svg" alt="view icon" class="input-icon"/>
                </el-tooltip>
                <span>{{ article.views }}</span>
              </div>
              <div class="icon-stat">
                <el-tooltip content="点赞量">
                  <img src="../../public/image/icon/like_disable.svg" alt="thumb icon" class="input-icon"/>
                </el-tooltip>
                <span>{{ article.likes }}</span>
              </div>
              <div class="icon-stat">
                <el-tooltip content="评论量">
                  <img src="../../public/image/icon/comment.svg" alt="comment icon" class="input-icon"/>
                </el-tooltip>
                <span>{{ article.comments }}</span>
              </div>
              <div class="icon-stat">
                <el-tooltip content="收藏量">
                  <img src="../../public/image/icon/collect_disable.svg" alt="star icon" class="input-icon"/>
                </el-tooltip>
                <span>{{ article.collects }}</span>
              </div>
              <div class="icon-stat">
                <el-tooltip content="转发量">
                  <img src="../../public/image/icon/share.svg" alt="star icon" class="input-icon"/>
                </el-tooltip>
                <span>{{ article.forwards}}</span>
              </div>
            </div>
            <p class="article-author">作者: {{ article.author }}</p>
            <p class="article-category">分类: {{ article.category }}</p>
            <div class="article-tags">
              <el-tag v-for="tag in article.tags.split(',')" :key="tag">{{ tag }}</el-tag>
            </div>
          </el-card>
        </div>
      </el-main>
      <el-aside width="20%">
        <!-- Right aside content goes here -->
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>

import axios from "axios";

export default {
  name: 'Index',
  data() {
    return {
      articles: [],
      pageNum: 1,
      pageSize: 10,
      loading: false
    }
  },
  methods: {
    goToArticleDetail(article) {
      this.$router.push(`/article-detail/${article.id}`);
    },

    formatDate(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },

    loadMoreArticles() {
      if (this.loading) return; // If already loading, do nothing
      this.loading = true;
      let url= "http://localhost:8080/blog/getArticleList";
      let data={
        pageNum:this.pageNum,
        pageSize:this.pageSize
      }
      axios.post(url, data)
          .then(response => {
            if (response.data.statusCode === 200) {
              this.articles = this.articles.concat(response.data.data);
              this.pageNum++;
            } else {
              console.error('Failed to load articles: ' + response.data.message);
            }
          })
          .catch(error => {
            console.error('Failed to load articles: ' + error);
          })
          .finally(() => {
            this.loading = false;
          });
    },
    handleScroll(event) {
      const { target } = event;
      // If scrolled to bottom, load more articles
      if (Math.ceil(target.scrollTop) + target.clientHeight >= target.scrollHeight) {
        this.loadMoreArticles();
      }
    }
  },
  mounted() {
    this.loadMoreArticles();
  }
}
</script>

<style scoped>
.icon-stat {
  display: flex;
  align-items: center;
}

.input-icon {
  width: 20px;
  height: 20px;
  padding: 0 5px;
}

.article-title {
  text-align: center;
}

.article-date {
  position: absolute;
  top: 10px;
  right: 10px;
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
  position: absolute;
  bottom: 10px;
  right: 10px;
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
  margin-bottom: 10px;
  position: relative; /* 添加这一行 */
  padding: 20px; /* 添加这一行，给内容一些空间 */
  box-sizing: border-box; /* 添加这一行，确保padding不会增加元素的总宽度 */
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