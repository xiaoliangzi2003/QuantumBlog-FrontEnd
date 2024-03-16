<template>
  <el-container direction="vertical">
    <index-header></index-header>
    <el-container>
      <el-aside width="20%">
        <div v-html="contentWithToc" ></div>
      </el-aside>
      <el-main class="main-board">
        <article-card ref="articleCard"></article-card>
        <detail ref="detail" @contentChanged="renderToc"></detail>
      </el-main>
      <el-aside width="20%">Aside</el-aside>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import Detail from '../../components/article/detail.vue';
import IndexHeader from '../../components/index/header.vue';
import ArticleCard from "../../components/article/article-card.vue";
import MarkdownIt from 'markdown-it'
import markdownItTocAndAnchor from 'markdown-it-toc-and-anchor'

export default {
  data() {
    return {
      contentWithToc: ''
    }
  },
  components: {
    ArticleCard,
    Detail,
    IndexHeader
  },
  methods: {
    renderToc() {
      const md = new MarkdownIt()
      md.use(markdownItTocAndAnchor, {
        toc: true,
        tocFirstLevel: 1,
        tocLastLevel: 6,
        anchorLink: true,
        anchorLinkSymbol: '#',
        anchorLinkSpace: true,
        anchorClassName: 'anchor',
        tocClassName: 'table-of-contents',
        wrapperClass: 'markdown-body',
      })
      const titleRegexp = /(#+)\s(.+)/g;
      let match;
      let titles = '';
      while ((match = titleRegexp.exec(this.$refs.detail.markdownContent)) !== null) {
        titles += match[0] + '\n';
      }

      // 渲染标题
      this.contentWithToc = md.render(titles)
    }
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
</style>