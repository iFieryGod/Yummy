<template>
   <div class='container mt-5' style='width: 450px'>
    <div class="card text-center">
    <div class="card-header text-dark">
     <span class="font-weight-bold text-dark">{{post.title}}</span>
    </div>
    <div class="card-body">
      <h5 class="card-title text-dark">You are about to delete:</h5>
      <p class="card-text text-dark"><span class="text-danger">{{post.description}}</span></p>
      <p class="card-text font-weight-bold text-dark">Are you sure you want to delete this post<span class="text-dark font-weight-bold" style="font-size: 2rem;">?</span></p>
    </div>
    <div class="card-footer text-muted">
      <button class="btn btn-primary mr-5 text-white" @click='onSubmit()'>Yes</button>
      <button class="btn btn-danger ml-5 text-white" @click='clear()'>NO</button>
    </div>
  </div>
  </div>   
</template>
<script>
import axios from 'axios'
export default {
  data: () => ({
    post: {},
  }),
  mounted() {
      this.fetchPost();
  },
  methods: {
    onSubmit() {
      return axios.delete(`http://localhost:8081/task/remove/${this.$route.params.id}`)
      .then(() => {
        this.$swal(
          'Done',
          `${this.post.title} successfully deleted`,
          'success'
        )
        this.$router.push('/task/new')
      })
      .catch(() => {
        this.$swal(
          'Error',
          'An error occurred while deleting',
          'error'
        )
      });
    },
    async fetchPost() {
      return axios.get(`http://localhost:8081/task/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data)
        this.post = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    },
    clear(){
      this.$router.push('/task/new');
    }
  }
}
</script>