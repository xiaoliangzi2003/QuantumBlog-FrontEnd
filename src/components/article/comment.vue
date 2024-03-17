<template>
  <form @submit.prevent="submitComment">
    <textarea v-model="content" placeholder="请文明交流"></textarea>
    <button type="submit">发表</button>
  </form>
  <div v-for="comment in comments" :key="comment.id" class="comment-card">
    <div class="comment-user">
      <img :src="`http://localhost:8080/user-profile/get-avatar/${comment.commentator}`" class="comment-avatar" alt="评论者头像">
      <p class="comment-username">{{ comment.commentator }}</p>
    </div>
    <p class="comment-content">{{ comment.content }}</p>
    <div class="comment-right">
      <p class="comment-time">{{ new Date(comment.createTime * 1000).toLocaleString() }}</p>
      <div class="comment-actions">
        <div class="like-action">
          <img src="../../../public/image/icon/like_disable.svg" alt="like icon" class="icon" @click="likeComment(comment.id)">
          <span class="like-count">{{ comment.likes }}</span>
        </div>
        <div class="reply-action">
          <img src="../../../public/image/icon/comment.svg" alt="comment icon" class="icon" @click="replyComment(comment.id)">
        </div>
      </div>
    </div>
  </div>
  <el-button type="text" @click="loadMoreComments">加载更多评论</el-button>
</template>

<script>
import axios from 'axios';
import Cookies from "js-cookie";

export default {
  data() {
    return {
      content: '',
      comments: [],
      pageNum: 1,
      pageSize: 50,
    };
  },
  created() {
    this.loadComments();
  },
  methods: {
    submitComment() {
      const comment = {
        content: this.content,
        commentator: Cookies.get('username'),
        parentCommentator: null,
        articleTitle: Cookies.get('article-title'),
        author: Cookies.get('article-author'),
      };
      axios.post('http://localhost:8080/comment/add-comment', comment)
        .then(response => {
          if (response.data.statusCode === 200) {
            console.log('Comment published successfully');
            this.content = '';
            this.comments.unshift(response.data.data);
          } else {
            console.error('Failed to publish comment: ' + response.data.message);
          }
        })
        .catch(error => {
          console.error('Error publishing comment:', error);
        });
    },
    loadComments() {
      const request = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        title: Cookies.get('article-title'),
        author: Cookies.get('article-author'),
      };
      axios.post('http://localhost:8080/comment/get-comment-list', request)
          .then(response => {
            if (response.data.statusCode === 200) {
              this.comments = this.comments.concat(response.data.data);
              this.pageNum++;
            } else {
              console.error('Failed to load comments: ' + response.data.message);
            }
          })
          .catch(error => {
            console.error('Error loading comments:', error);
          });
    },
    loadMoreComments() {
      this.loadComments();
    },
  },
};
</script>

<style scoped>
.like-count{
  margin-left: -20px;

}
.like-action{
  margin-right: 15px;
}
.icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-right: 30px;
  margin-top: 20px;
}

.comment-card {
  display: flex;
  flex-direction: row;
  align-items: start;
  margin: 20px auto auto auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  width: 60%; /* Set the width to 60% */
}

.comment-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
}

.comment-content {
  flex-grow: 1;
  margin-left: 30px;
  margin-top: 30px;
}

.comment-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.comment-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.comment-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-username {
  font-weight: bold;
  margin-bottom: 10px;
}

.comment-content {
  flex-grow: 1;
  margin-right: 10px;
}

.comment-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.comment-time {
  font-size: 12px;
  color: #999;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto auto auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  width: 60%; /* Set the width to 60% */
}

textarea {
  font-family: Arial, sans-serif;
  font-size: 16px;
  width: 100%;
  min-height: 100px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
}

button {
  width: 100px;
  height: 30px;
  background-color: #1684ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #126cd6;
}

</style>