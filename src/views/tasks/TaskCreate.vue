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
          <form enctype="multipart/form-data" ref='form' @submit.prevent='submit'>
            <div class="form-group">
              <label for="title" class="col-form-label">Title</label>
              <input class="form-control" v-model='title' type="text" required/>
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
              </div>
            </div>
            <div class="form-group">
              <label for="body" class="col-form-label">Body</label>
              <textarea class="form-control" v-model='description' required></textarea>
            </div>
            <button class="btn btn-warning mt-2 text-white font-weight-bold" type="submit">Save Changes</button>
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
    file: '',
    message: '',
    previewImage: '',
    showPreview: false,
    posts: [],
  }),
  mounted() {
    this.fetchPosts();
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
        this.previewImage = reader.result;
      }.bind(this), false);
      
      if(file){

        if( /\.(jpe?g|png|gif)$/i.test( this.file.name)){

          reader.readAsDataURL( this.file)
        }
      }
    },
   submit() {
      const formData = new FormData();
      formData.append('img', this.file)
      formData.append('title', this.title)
      formData.append('description', this.description)
      axios.post('http://localhost:8081/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        this.message = 'Uploaded!'
        this.$refs.form.reset();
      })
      .catch((error) => {
         console.log(error)
        this.message = error.response.data.error
      })
      },
    clear() {
      this.$refs.form.reset();
    },
    async fetchPosts(){
      const token = window.localStorage.getItem('auth');
      return axios.get('http://localhost:8081/posts', { headers: { Authorization: `${token}` }})
      .then((response) => {
        this.posts = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    },
  },
}
</script>
<style scoped>
.dropbox {
  outline: 2px dashed darkslategrey; /* the dashed box */
  outline-offset: -10px;
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
  width: 12rem;
}
</style>