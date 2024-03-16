<template>
  <v-md-preview :text="markdownContent"></v-md-preview>
</template>

<script>
import axios from 'axios';
import '@kangc/v-md-editor/lib/style/preview.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';


export default {
  data() {
    return {
      markdownContent: ' ',
    };
  },
  mounted() {
    this.fetchMarkdownContent();
  },
  watch: {
    markdownContent(newContent) {
      this.$emit('contentChanged', newContent);
    }
  },
  methods: {
    fetchMarkdownContent() {
      axios.get(`http://localhost:8080/blog/article-detail/${this.$route.params.id}`)
          .then(response => {
            this.markdownContent = response.data.content;
            console.log(this.markdownContent);
          })
          .catch(error => {
            console.error('Error fetching Markdown content:', error);
          });
    },
  },
};
</script>