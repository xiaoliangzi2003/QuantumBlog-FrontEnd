<template>

  <el-container direction="vertical" class="manage-container">
    <el-header class="index-top-navigation">
      <el-menu mode="horizontal" class="horizontal-navigation">
        <el-menu-item index="1" class="navigation-item">量子论坛</el-menu-item>
        <el-menu-item index="2" class="navigation-item">首页</el-menu-item>
        <el-menu-item index="3" class="navigation-item">发现</el-menu-item>
        <el-menu-item index="4" class="navigation-item">问答</el-menu-item>
        <el-menu-item index="5" class="navigation-item">视频</el-menu-item>
        <el-menu-item index="6" class="navigation-item">关于</el-menu-item>
        <el-menu-item index="7" class="navigation-item">个人中心</el-menu-item>
        <el-input class="search-input" placeholder="搜索"></el-input>
      </el-menu>
    </el-header>

    <el-container>

      <el-aside width="20%" class="editor-aside">
        <el-menu class="editor-aside-menu">
          <a @click="publish" class="publish-link">发布</a>
        </el-menu>
      </el-aside>
      <el-main class="editor-main">
        <el-card class="box-card">
          <el-card class="article-brief">
            <el-form :model="form">
              <el-form-item label="文章标题">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="作者名">
                <el-input v-model="form.author" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="分类">
                <el-select v-model="form.category" placeholder="请选择">
                  <el-option
                      v-for="item in categories"
                      :key="item"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标签">
                <el-tag
                    v-for="(tag, index) in form.tags"
                    :key="index"
                    closable
                    @close="handleClose(index)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                    v-model="input"
                    @keyup.enter.native="handleInputConfirm"
                    placeholder="请输入标签，按Enter确认"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card class="editor-card">
            <article-editor theme="light" ref="articleEditor" class="article-editor"/>
          </el-card>
          <el-card class="publish-setting">
            <el-form-item label="是否公开">
              <el-switch v-model="form.isPublic"></el-switch>
            </el-form-item>
            <el-form-item label="是否定时发布">
              <el-switch v-model="form.isScheduled"></el-switch>
              <el-date-picker
                  v-if="form.isScheduled"
                  v-model="form.scheduleTime"
                  type="datetime"
                  class="day-picker"
                  placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <div class="bottom-clearfix">
              <el-button type="primary" @click="publish">发布</el-button>
            </div>
          </el-card>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ArticleEditor from '../../components/article/editor.vue'
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        title: '',
        author: 'xiaoliangzi',
        category: '',
        tags: [],
        isPublic: true,
        isScheduled: false,
        scheduleTime: '',
      },
      categories: ['知识' , '科学', '脑洞', '游戏', '财经', '心理', '故事', '职场', '旅行', '法律', '国际', '美食', '动画', '宠物', '时尚', '时事', '健康', '体育']
    };
  },
  components: {
    ArticleEditor
  },
  methods:{
    handleInputConfirm() {
      let input = this.input;
      if (input) {
        this.form.tags.push(input);
      }
      this.input = '';
    },
    handleClose(index) {
      this.form.tags.splice(index, 1);
    },
    publish(){
      if (!this.form.title || !this.form.author || !this.$refs.articleEditor.text) {
        this.$message.error('标题、作者和内容不能为空');
        return;
      }

      if (this.form.title.length > 30) {
        this.$message.error('标题长度不能超过30个字符');
        return;
      }

      let article={
        author: this.form.author,
        title: this.form.title,
        category: this.form.category,
        tags: this.form.tags.join(','),
        isPublic: this.form.isPublic,
        isScheduled: this.form.isScheduled,
        scheduleTime: this.form.scheduleTime,
        content:this.$refs.articleEditor.text,
      };
      axios.post('http://localhost:8080/blog/publish-article',article)
          .then(response=>{
            console.log(response.data)
          }).catch(error=>{
            console.log(error)
      });
    }
  }
}
</script>

<style scoped>

.day-picker{
  padding-left:5px;
}

.article-brief{
  margin-bottom: 20px;
}

.publish-setting{
  margin-top: 20px;
}

.editor-card{
  height: 100%;
}

.publish-link {
  color: #3498db; /* 设置文字颜色 */
  text-decoration: none; /* 去掉下划线 */
  font-size: 16px; /* 设置字体大小 */
  cursor: pointer; /* 当鼠标悬停时显示手形光标 */
}

.editor-aside-menu{
  background-color: transparent;
}
.editor-aside {
  background-color: #2c3e50; /* 更改为深灰色 */
  color: white; /* 更改为白色 */
  margin-top:0;
  padding-top:0;
}

.manage-container {
  height: 100vh;
  margin-bottom: 0;
  padding-bottom: 0;
}

.index-top-navigation {
  background-color: black;
  margin-bottom: 0;
  padding-bottom: 0;
  height: 70px;
}

.search-input {
  color: white;
  background-color: black;
  font-size: 16px;
}

.horizontal-navigation{
  background-color: black;
  margin-bottom: 0;
  color: white;
  border-bottom: none;
}

.navigation-item{
  color: white;
  height: auto;
}

.article-editor{
  margin: 0;
  padding-bottom: 0;
  padding-left: 0;
  background-color: #ecf0f1; /* 更改为浅灰色 */
  color: #2c3e50; /* 更改为深蓝色 */
  height: 80vh;
}

.editor-main{
  padding:10px;
  overflow: hidden;
}

.bottom-clearfix {
  text-align: right;
  margin-top: 20px;
}

.box-card{
  height: 100%;
  padding: 20px;
  margin: 0;
  box-shadow:0px 0px 10px 10px rgba(0,0,0,0.75);
  background-color: #ecf0f1; /* 更改为浅灰色 */
  color: #2c3e50; /* 更改为深蓝色 */

}
</style>