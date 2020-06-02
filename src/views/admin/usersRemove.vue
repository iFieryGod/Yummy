<template>
  <div class='container mt-5' style='width: 450px'>
    <div class="card text-center">
    <div class="card-header text-dark">
     Username: <span class="font-weight-bold text-dark">{{user.userName}}</span>
    </div>
    <div class="card-body">
      <h5 class="card-title text-dark">{{user.firstName}} {{user.lastName}}</h5>
      <p class="card-text text-dark">You are about to delete: <span class="text-danger">{{user.emailAddress}}</span></p>
      <p class="card-text font-weight-bold text-dark">Are you sure you want to delete this account <span class="text-dark font-weight-bold" style="font-size: 2rem;">?</span></p>
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
    user: {},
  }),
  mounted() {
    this.fetchOneUser();
  },
  methods: {
    onSubmit() {
      return axios.delete(`http://localhost:8081/users/remove/${this.$route.params.id}`)
      .then(() => {
        this.$swal(
          'Great!',
          `${this.user.userName} has been deleted`,
          'success',
        );
        this.$router.push('/users')
      })
      .catch(() => {
        this.$swal('Oops', `${this.user.userName} Account was not deleted`, 'Error')
      })
    },
    clear(){
      this.$router.push('/users')
    },
    async fetchOneUser() {
      return axios.get(`http://localhost:8081/users/${this.$route.params.id}`)
      .then((response) => {
        this.user = response.data
      })
      .catch(() => {
      });
    },
  }
}
</script>