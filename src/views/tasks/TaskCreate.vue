<template>
 <header class="py-2 text-white" id="main-header">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1><i class="fa fa-pencil"></i> Post</h1>
        </div>
      </div>
    </div>
  <section class="py-4 mb-4" id="actions">
    <div class="container">
      <div class="row">
        <div class="col-md-3 mb-3"><a class="btn btn-warning btn-block text-white font-weight-bold" href="#" data-toggle="modal" data-target="#addPost"><i class="fas fa-plus"></i> Add Post</a></div>
        <div class="col-md-6 ml-auto">
          <div class="input-group">
            <input class="form-control" type="text" placeholder="Type here" /><span class="input-group-btn">
              <button class="btn btn-warning text-white font-weight-bold">Search</button></span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="modal fade" id="addPost">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-warning text-white">
          <h1 class="modal-title"><i class="fa fa-pencil"></i> Add Post</h1>
          <button class="close" data-dismiss="modal"><span>×</span></button>
        </div>
        <div class="modal-body">
          <form ref='form'>
            <div class="form-group">
              <label for="title" class="col-form-label">Title</label>
              <input class="form-control" v-model='title' type="text" required/>
            </div>
            <!-- <div class="form-group">
              <label for="image" class="col-form-label">Upload Image</label>
              <div class="custom-file">
                <input class="custom-file-input" type="file" name="image" id="image"/>
                <label class="custom-file-label" for="image">Choose file</label>
              </div>
              <small class="form-text text-muted">Max Size 5mb</small>
            </div> -->
            <div class="form-group">
              <label for="body" class="col-form-label">Body</label>
              <textarea class="form-control" v-model='description' required></textarea>
            </div>
            <button class="btn btn-warning mt-2 text-white font-weight-bold" @click="submit">Save Changes</button>
              <button class="btn btn-warning mt-2 ml-2 text-white font-weight-bold" @click="clear">Reset Form</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <section class="py-4 mb-4" id="action">
    <div class="container">
      <div class="row">
        <div class="col">
            <h4>Latest Post</h4>
            <table class="table table-responsive-md table-hover table-dark">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Comments</th>
                  <th scope="col">#</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="post in posts" :key="post._id">
                  <td class="font-weight-bold">{{ post.title }}</td>
                  <td class="text-wrap">{{ post.description }}</td>
                  <td>
                    <router-link v-bind:to="`/task/${post._id}`" class="btn btn-warning btn-sm">
                    <i class="fa fa-angle-double-right"></i>
                    <span class="font-weight-bold">Edit</span> 
                    </router-link>
                  </td>
                  <td>
                     <router-link v-bind:to="`/task/remove/${post._id}`" class="btn btn-danger btn-sm">
                    <i class="fa fa-remove fa-xs"></i>
                     <span class="font-weight-bold">Delete</span> 
                    </router-link>
                  </td>
                </tr>
                <p v-show="posts.length <= 0">No Posts are yet available</p>
              </tbody>
            </table>
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
    title: '',
    description: '',
    posts: [],
  }),
  mounted() {
    this.fetchPosts();
 },
  methods: {
    submit(e) {
        e.preventDefault();
        return axios.post('http://localhost:8081/posts',
          {  title: this.title,
             description: this.description
          },
          { headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(() => {
          // Thinking of adding a function to route back to the home page or taskCreate page
          // this.$router.push({ name: 'Home'})
          this.$refs.form.reset();
        }).catch(() => {
        });
    },
    clear() {
      this.$refs.form.reset();
    },
    async fetchPosts(){
      return axios.get('http://localhost:8081/posts')
      .then((response) => {
        this.posts = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    },
  },
};
</script>