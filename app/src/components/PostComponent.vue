<template>
  <div class="container">
    <h1>The Latest Posts</h1>
    <p>
      By:
      <a href="https://github.com/jacques-andre">Jacques</a>
      &
      <a href="https://github.com/Isaque-mb">Isaque</a>
    </p>
    <!-- CREATE POST -->
    <div class="create-post">
      <label for="create-post" id="say-something">
        <b>Speak Your Mind...</b>
      </label>
      <textarea
        rows="2"
        cols="4"
        id="create-post"
        v-model="text"
        maxlength="230"
        placeholder="Get Typing..."
        lazy
      ></textarea>
      <button v-on:click="createPost" id="button-post">Post</button>
    </div>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="post-container">
      <div
        class="post"
        v-for="(post,index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
      >
        <div class="user-info">
          <p>
            <span id="user-name">@user:</span>
          </p>
          <span id="moment">{{moment().format("MMM Do") }}</span>
        </div>
        <!-- <a class="deleteX" v-on:click="deletePost(post._id)">x</a> -->
        <p class="post-text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require("moment");
import PostService from "../PostService";

export default {
  name: "PostComponent",
  data() {
    return {
      moment: moment,
      posts: [], //posts requested from back-end will be placed in this array
      error: "", //pretty self explanatory
      text: "" //text in the post
    };
  },

  async created() {
    //runs when component is initialized
    try {
      this.posts = await PostService.getPosts(); // fills post by requesting back-end through PostService.js
    } catch (err) {
      this.error = err.message; //sets variable error
    }
  },

  methods: {
    async createPost() {
      await PostService.insertPost(this.text); // input
      this.posts = await PostService.getPosts();
      this.text = "";
    },
    async deletePost(id) {
      await PostService.deletePost(id); // input
      this.posts = await PostService.getPosts();
      console.log("post_deleted");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  height: 4rem;
  resize: none;
  margin: 0;
  padding: 20px 5px;
  margin-top: 2rem;
}
.post-container {
  margin: 5rem;
}
.post {
  margin-top: 2rem;
  display: flex;
  border: 2px solid black;
  border-radius: 6px;
  word-wrap: break-word;
  overflow: auto;
}
.post-text {
  font-weight: 300;
  padding-left: 0.2rem;
  padding: 0 1.4rem;
  word-wrap: break-word;
  overflow: auto;
}
.user-info {
  padding: 0 0 0 1.6rem;
  margin: 0;
}
#user-name {
  font-weight: 600;
}
#moment {
  white-space: nowrap !important;
  position: relative;
  bottom: 5px;
  font-size: 1.3rem;
  font-style: italic;
  font-weight: 600;
}
button {
  cursor: pointer;
}
</style>
