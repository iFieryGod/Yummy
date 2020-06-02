<template>
 <header>
    <div class="container">
      <div class="row">
        <div class="col-md-6 m-auto text-center">
          <h1>Get Posted</h1>
          <p class="text-center">The world needs to know about your Drip. Let them know right here.</p>
        </div>
      </div>
    </div>
  <section class="py-3">
    <div class="container">
      <div class="row row-cols-1 row-cols-md-3">
        <div class="col">
          <div class="card-group my-3" v-for="post in posts" :key="post._id">
            <div class="card text-center">
              <a href="#"><img class="img-fluid card-img-top" src=""></a>
              <div card-body>
                <h4 class="card-title text-dark">{{ post.title }}</h4><small class="text-muted">Written by Goran</small>
                <hr>
                <p class="card-text mb-2 text-dark">{{ post.description }}</p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Date</small>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
  </section>
  </header>
</template>
<script>
import axios from 'axios'
export default {
  data: () => ({
    posts: [], 
  }),
  mounted() {
    this.fetchPosts();
 },
  methods: {
    async fetchPosts(){
      return axios.get('http://localhost:8081/posts')
      .then((response) => {
        this.posts = response.data
      })
      .catch((error) => {
        console.log(error)
      });
    },
  },
}
</script>