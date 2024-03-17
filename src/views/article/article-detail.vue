<template>
  <el-container direction="vertical">
    <index-header></index-header>
    <el-container>
      <el-aside width="20%">
      </el-aside>
      <el-main class="main-board">
        <article-card ref="articleCard"></article-card>
        <detail ref="detail" @contentChanged="renderToc"></detail>
      </el-main>
      <el-aside width="20%">Aside</el-aside>
    </el-container>
    <el-footer>
      <CommentForm :articleId="$route.params.id" :commentatorId="commentatorId" class="comment-form"/>
    </el-footer>
  </el-container>
</template>

<script>
import Detail from '../../components/article/detail.vue';
import IndexHeader from '../../components/index/header.vue';
import ArticleCard from "../../components/article/article-card.vue";
import CommentForm from '../../components/article/comment.vue';
import Cookies from "js-cookie";

export default {
  data() {
    return {
      markdownContent: '',
      commentatorId: Cookies.get('username') || '',
    }
  },
  components: {
    ArticleCard,
    Detail,
    IndexHeader,
    CommentForm,
  },
  methods: {
  }
};
</script>

<style scoped>

.main-board{
  display: flex;
  flex-direction: column;
}

.el-main {
  margin: 0 auto;
  width: 60% !important;
}

.el-aside {
  width: 20% !important;
}

.comment-form{
  margin-top: 20px;
}
</style>