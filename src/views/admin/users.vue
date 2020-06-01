<template>
  <header class="py-2 text-white" id="main-header">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1><i class="fa fa-users"></i> User Interface</h1>
        </div>
      </div>
    </div>
  <section class="actions py-4">
    <div class="col-md-6 ml-auto mr-auto mb-3">
      <div class="input-group">
        <input class="form-control" type="text" placeholder="Type here"><span class="input-group-btn"></span>
        <button class="btn btn-warning text-white font-weight-bold">Search</button>
      </div>
    </div>
  </section>
  <section class="py-4 mb-4" id="action">
    <div class="container">
      <div class="row">
        <div class="col">
            <h4>User Accounts</h4>
            <table class="table table-responsive-md table-hover table-dark">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">User Name</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">#</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user._id">
                  <td>{{ user.userName }}</td>
                  <td>{{ user.emailAddress }}</td>
                  <td>
                    <router-link v-bind:to="`/users/${user._id}`" class="btn btn-warning btn-sm">
                    <i class="fa fa-angle-double-right fa-xs"></i>
                     <span class='font-weight-bold'>Edit</span> 
                    </router-link>
                  </td>  
                  <td>
                    <router-link v-bind:to="`/users/remove/${user._id}`" class="btn btn-danger btn-sm">
                    <i class="fa fa-remove fa-xs"></i>
                     <span class='font-weight-bold'>Delete</span> 
                    </router-link>
                    </td>
                </tr>
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
    users: [],
  }),
  mounted() {
    this.fetchUsers();
  },
  methods: { 
    async fetchUsers() {
      return axios.get('http://localhost:8081/users')
      .then((response) => {
        this.users = response.data.user
      })
      .catch(() => {
      });
    },
  },
};
</script>