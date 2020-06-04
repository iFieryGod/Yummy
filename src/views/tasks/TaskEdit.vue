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
          <router-link to="/task/new" class="btn btn-warning">
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
              <form ref="form" @submit.prevent='editPost'>
                <div class="form-group">
                  <label class="col-form-label">Title</label>
                  <input class="form-control" type='text' v-model="post.title" :class="{error: validation.hasError('post.title'), valid: validation.isTouched('post.title') && !validation.hasError('post.title')}">
                   <div class="error" v-if="validation.hasError('post.title')">{{ validation.firstError('post.title')}}</div>
                </div>
                 <div class="form-group">
                   <label class="col-form-label">Upload Image</label>
                   <div class="dropbox">
                   <input class="custom-file-input" accept="image/*" type="file" ref='file' @change="onSelect"/>
                   <p>Drag you files here</p>
                   </div>
                  <small class="form-text text-muted">Max Size 5mb</small>
                  <div class="message">
                  <p class="text-dark">{{ message }}</p>
                  </div>
                  <div>
                  <img v-show="showPreview" v-bind:src="previewImage" class="uploading-image">
                  <p class='text-dark' v-show="showPreview">You are about to replace the picture you previously uploaded</p>
                  </div>
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
        <div class='container-fluid'>
          <h3 class="text-center">{{ post.title }}</h3>
        <img v-if="doNotShow" :src="require(`@/assets/${post.img}`)" class="img-fluid mb-3">
        <img v-else v-bind:src="previewImage" class="img-fluid mb-3">
        </div>
        <div class="container">
          <h4>Related Posts</h4>
          <div class="row">
            <div class="col-6">
              <h5></h5>
              <img src="#" class="d-block img-fluid mb-3 mr-auto" style="width: 120px; height: 80px;">
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
    title: '',
    description: '',
    file: '',
    message: '',
    previewImage: '',
    showPreview: false,
    doNotShow: true,
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
    onSelect() {
      const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
      const file = this.$refs.file.files[0];
      this.file = file;
      if(!allowedTypes.includes(file.type)){
        this.message = 'Only images are required!!'
      }
      if(file.size>5000000){
        this.message = 'Too large, max size allowed is 5mb'
      }
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.addEventListener("load", function () {
        this.showPreview = true;
        this.doNotShow = false;
        this.previewImage = reader.result;
      }.bind(this), false);
      
      if(file){

        if( /\.(jpe?g|png|gif)$/i.test( this.file.name)){

          reader.readAsDataURL( this.file)
        }
      }
    },
    editPost(){
      this.$validate()
      .then((success) => {
        if(success){
          let post = [this.post.title, this.post.description].map((post) => {
            return post.charAt(0).toUpperCase() + post.slice(1)
          })
        const formData = new FormData();
          formData.append('img', this.file)
          formData.append('title', post[0])
          formData.append('description', post[1])
          return axios.put(`http://localhost:8081/task/${this.$route.params.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
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
    clear() {
      this.$refs.form.reset()
    },
    async fetchPost() {
      const token = window.localStorage.getItem('auth');
      return axios.get(`http://localhost:8081/task/${this.params.id}`,
       { headers: { Authorization: `${token}` } })
      .then((response) => {
        this.post = response.data
      })
      .catch(() => {
      })
    }
  }
}
</script>
<style scoped>
.dropbox {
  outline: 2px dashed darkslategrey; /* the dashed box */
  outline-offset: -10px;
  border-radius: 7px;
  background: rgb(240, 240, 44);
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}
.custom-file-input {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.dropbox:hover {
  background: rgba(236, 236, 48, 0.863);
}
.dropbox p {
  font-size: 1.2rem;
  text-align: center;
  padding: 50px 0;
  color: black;
}
.uploading-image {
  display: flex;
  width: 18rem;
  border-radius: 7px;
}
</style>