<template>
  <div class="hello">
    <section id="showcase">
    <div class="carousel slide" id="myCarousel" data-ride="carousel">
      <ol class="carousel-indicators">
        <li class="active" data-target="#myCarousel" data-slide-to="0"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item carousel-image-1 active">
          <div class="container">
            <div class="carousel-caption d-none d-sm-block text-right mb-5">
              <h1 class="display-2 text-danger">View More</h1>
              <p class="text-justify">Get access to whats Hot and Trending for all styles of fashion. See what people think and share your opinion. What are you waiting for?</p><a class="btn btn-danger btn-lg text-white" id="signUpNow" href="/sign-up">Sign UP Now</a>
            </div>
          </div>
        </div>
        <div class="carousel-item carousel-image-2">
          <div class="container">
            <div class="carousel-caption d-none d-sm-block mb-5">
              <h1 class="display-2 text-primary">SHOW OFF</h1>
              <p class="text-justify">Advertise your own unique collection of clothes and accessories. Build a follower base and see whose got an eye on your art. Get started now why wait?</p><a class="btn btn-primary btn-lg text-white" href="/sign-up">Learn More</a>
            </div>
          </div>
        </div>
        <div class="carousel-item carousel-image-3">
          <div class="container">
            <div class="carousel-caption d-none d-sm-block text-right mb-5">
              <h1 class="display-2 text-success">Empower Others</h1>
              <p class="text-justify">Whats really powerful about our platform is our growing community of up-and-coming artist who push the boundries of modern style and create a fresh approach to the future of art and design.</p><a class="btn btn-success btn-lg text-white" href="/sign-up">Join Us</a>
            </div>
          </div>
        </div>
      </div><a class="carousel-control-prev" href="#myCarousel" data-slide="prev"><span class="carousel-control-prev-icon"></span></a><a class="carousel-control-next" href="#myCarousel" data-slide="next"><span class="carousel-control-next-icon"></span></a>
    </div>
  </section>
  <section class="py-3" id="info">
    <div class="container">
      <h1 class="py-3 display-4 text-white font-weight-bold" id="post-heading">Latest Post</h1>
      <div class="row mt-4" v-for="post in posts" :key="post._id">
        <div class="col-md-6 align-self-center blog-post-messages">
          <h3>{{ post.title }}</h3>
          <p class="lead mt-2">{{ post.description }}</p>
          <small class="text-white">- Date posted: {{$moment(post.created_at).format('MMMM Do YYYY')}}</small>
          <p class="text-white">Author:</p>
          <a class="btn btn-warning btn-lg my-1 text-white" href="#">Read More</a>
        </div>
        <div class="col-md-6 blog-pictures-right"><a href="#" data-toggle="lightbox">
        <img id="home-images" class="img-fluid" :src="require(`@/assets/${post.img}`)" alt=""></a></div>
      </div>
    </div>
  </section>
  <section class="p5" id="home-heading">
    <div class="dark-overlay">
      <div class="row">
        <div class="col">
          <div class="container pt-5">
            <h3 class="text-warning">Maxwell Osborne [18] and Damon Osborne [17] of Public School, est. 2020</h3>
            <p class="d-none d-md-block text-justify font-italic">"We always had it in our minds that we might somehow go into clothing—our family business was children's wear—and around 2009, we saw a need in the market for the vision that we had. We thought, Let's make a few shirts, a few pants, a few different things, and it ended up turning into a full collection. We had no idea what we were doing because we never worked anywhere and we'd never trained. The first few years we didn't really understand how things worked—the logistics, running a business, being a designer, having a mindset of how to not only build a brand but to build a business. It took us at least four or five seasons to figure it that out."</p>
            <p class="text-justify font-italic">"The day-to-day operations of a startup that's moving really rapidly is challenging. We're a small team. We have nine employees. We should probably have fifteen. Like: we're too small for the size of our business, but the size of our business keeps growing that it's taking up all of our energy just to keep growing the size of the business."</p>
            <p class="text-justify font-italic">"We need more capital to create more inventory because we can't satisfy the demand. The market is absorbing our inventory faster than we can make it, and we need to find a way to get ahead of the demand."</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="text-center p-5 text-white" id="news-letter">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="text-warning">Sign up for news letter</h1>
          <p class="text-justify">You're now part of a community that connects global designers with local artists across the world. Find a place to expose your inventory. Discover new things to do. Or share your work.</p>
          <form class="form-inline justify-content-center" method="post">
            <input class="form-control mb-2 mr-2" type="text" placeholder="Enter Name">
            <input class="form-control mb-2 mr-2" type="email" placeholder="Enter Email">
            <button class="btn btn-primary mb-2" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data: () => ({
    posts: [],
  }),
  props: {
    msg: String
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    date: function ( timestamp ) {
      return this.$moment(timestamp).format('YYYY-MM-DD')
    },
    async fetchPosts(){
      return axios.get('http://localhost:8081/home')
      .then((response) => {
        this.posts = response.data
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#home-images {
  width: 32rem;
  max-height: 26rem;
}
@media (max-width: 768px) {
  .blog-post-messages{
    order: 2;
  }
  .blog-pictures-right{
    order: 1;
  }
}
</style>
