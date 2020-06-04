<template>
 <header>
    <div class="container-fluid bg-warning">
      <div class="row">
        <div class="col-md-6 m-auto text-center">
          <h1>Get Posted</h1>
          <p class="text-center font-weight-bold">The world needs to know about your Drip. Let them know right here.</p>
        </div>
      </div>
    </div>
  <section class="py-3" id='blog-body'>
    <div class="container-fluid">
      <div class="row row-cols-1 row-cols-md-1 no-gutters my-2">
        <div class="card-columns" style="display: inline-block">
          <div class="card my-2 mx-2" v-for="post in posts" :key="post._id">
            <div class="card text-center">
              <h4 class="card-title text-dark">{{ post.title }}</h4>
              <a href="#"><img class="img-fluid card-img-top" :src="require(`@/assets/${post.img}`)"/></a>
              <div class='card-body'>
                <small class="text-muted">Written by Goran</small>
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
    link: '@/assets/' 
  }),
  mounted() {
    this.fetchPosts();
 },
  methods: {
    fetchPosts(){
      const token = window.localStorage.getItem('auth');
      return axios.get('http://localhost:8081/posts', {
        headers: { Authorization: `${token}` }
      })
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