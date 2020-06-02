<template>
<header class="py-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <h1><i class="fas fa-user-edit"></i> Edit</h1>
        </div>
      </div>
    </div>
  <section class="py-4 mb-4">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <router-link to="/taskAll" class="btn btn-warning">
            <i class="fa fa-arrow-left"></i>
            <span class='font-weight-bold'>Back To Blog</span> 
          </router-link>
        </div>
      </div>
    </div>
  </section>
  <section class="mb-3" id="editPost">
    <div class="row">
      <div class="col-md-9">
        <div class="container">
          <div class="card">
            <div class="card-header">
              <h4 class="text-dark">Edit Post</h4>
            </div>
            <div class="card-body">
              <form ref="form" @submit.prevent='editPost()'>
                <div class="form-group">
                  <label class="col-form-label">Title</label>
                  <input class="form-control" type='text' v-model="post.title" :class="{error: validation.hasError('post.title'), valid: validation.isTouched('post.title') && !validation.hasError('post.title')}">
                   <div class="error" v-if="validation.hasError('post.title')">{{ validation.firstError('post.title')}}</div>
                </div>
                <div class="form-group">
                  <label for="file" class="col-form-label">Image Upload</label>
                  <input class="form-control-file" type="file" name="image"><small class="form-test text-muted">Max Size 3MB</small>
                </div>
                <div class="form-group">
                  <label for="message" class="col-form-label">Body</label>
                  <textarea class="form-control" v-model="post.description" :class="{error: validation.hasError('post.description'), valid: validation.isTouched('post.description') && !validation.hasError('post.description')}"></textarea>
                  <div class="error" v-if="validation.hasError('post.description')">{{ validation.firstError('post.description')}}</div>
                  <button class="font-weight-bold btn btn-warning mt-2 text-white" type="submit" :disabled="validation.countErrors() > 0">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <h3 class="text-center"></h3>
        <img src="/" class="d-block img-fluid mb-3 mr-auto ml-auto">
        <div class="container">
          <h4>Related Posts</h4>
          <div class="row">
            <div class="col-6">
              <h5></h5>
              <img src="/" class="d-block img-fluid mb-3 mr-auto" style="width: 120px; height: 80px;">
            <div class="col-6">
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
import { Validator } from 'simple-vue-validator'
export default {
  data: () => ({
    post: {},
  }),
  mounted() {
    this.fetchPost();
  },
  validators: {
    'post.title': function(value){
      return Validator.value(value).required();
    },
    'post.description': function (value) {
      return Validator.value(value).required();
    }
  },
  methods: {
    editPost(){
      this.$validate()
      .then((success) => {
        if(success){
          let post = [this.post.title, this.post.description].map((post) => {
            return post.charAt(0).toUpperCase() + post.slice(1)
          })
          return axios.put(`http://localhost:8081/task/${this.$route.params.id}`, {
            title: post[0],
            description: post[1],
          })
          .then(() => {
            this.$swal(
            'Awesome!',
            'Post updated successfully!',
            'success',
            );
            this.$router.push('/task/new')
          })
          .catch(() => {
            this.$swal(
              'Ouch!',
              'Your post could not be updated',
              'error',
            );
          })
        }
      })
      .catch(() => {
      })
    },
    async fetchPost() {
      return axios.get(`http://localhost:8081/task/${this.$route.params.id}`)
      .then((response) => {
        this.post = response.data
      })
      .catch(() => {
      })
    }
  }
}
</script>