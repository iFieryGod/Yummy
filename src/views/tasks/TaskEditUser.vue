<template>
  <header class="py-4">
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
          <router-link to="/users" class="btn btn-warning">
            <i class="fa fa-arrow-left"></i>
            <span class='font-weight-bold'>Back To Users</span> 
          </router-link>
        </div>
      </div>
    </div>
  </section>
  <section class="mb-3" id="editUsers">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="card w-75">
            <div class="card-header">
              <h4 class='text-dark'>Edit User</h4>
            </div>
            <div class="card-body">
              <form ref='form' @submit.prevent='editUser()'>
                <div class="form-group">
                  <label for="name" class="col-form-label">Username</label>
                  <input class="form-control" type="text" v-model="user.userName" :class="{error: validation.hasError('user.userName'), valid: validation.isTouched('user.userName') && !validation.hasError('user.userName')}">
                  <div class="error" v-if="validation.hasError('user.userName')">{{ validation.firstError('user.userName')}}</div>
                </div>
                <div class="form-group">
                  <label for="name" class="col-form-label">First name</label>
                  <input class="form-control" type="text" v-model="user.firstName" :class="{error: validation.hasError('user.firstName'), valid: validation.isTouched('user.firstName') && !validation.hasError('user.firstName')}">
                  <div class="error" v-if="validation.hasError('user.firstName')">{{ validation.firstError('user.firstName')}}</div>
                </div>
                <div class="form-group">
                  <label for="lastName" class="col-form-label">Last name</label>
                  <input class="form-control" type="text" v-model="user.lastName" :class="{error: validation.hasError('user.lastName'), valid: validation.isTouched('user.lastName') && !validation.hasError('user.lastName')}">
                  <div class="error" v-if="validation.hasError('user.lastName')">{{ validation.firstError('user.lastName')}}</div>
                </div>
                <div class="form-group">
                  <label for="email" class="col-form-label">Email Address</label>
                  <input class="form-control" type="email" v-model="user.emailAddress" :class="{error: validation.hasError('user.emailAddress'), valid: validation.isTouched('user.emailAddress') && !validation.hasError('user.emailAddress')}">
                  <div class="error" v-if="validation.hasError('user.emailAddress')">{{ validation.firstError('user.emailAddress')}}</div>
                </div>
                <div class="form-group">
                <div>
                  <button class='font-weight-bold btn btn-warning mt-2 text-white' type="submit" :disabled="validation.countErrors() > 0">Save Changes</button> 
                  </div>
                </div>
              </form>
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
    user: {},
  }),
  mounted() {
    this.fetchUsers();
  },
  validators: {
    'user.firstName': function(value) {
      return Validator.value(value).required().minLength(4);
    },
    'user.userName': function(value) {
      return Validator.value(value).required().minLength(4)
    },
    'user.lastName': function(value) {
      return Validator.value(value).required().minLength(4);
    },
    'user.emailAddress': function(value){
      return Validator.value(value).required().email();
    }
  },
  methods: {
    editUser() {
      this.$validate()
      .then((success) => {
        if(success){
          let user = [this.user.userName, this.user.firstName, this.user.lastName].map((user) => {
              return user.charAt(0).toUpperCase() + user.slice(1)
        })
        const token = window.localStorage.getItem('auth');
        return axios.put(`http://localhost:8081/users/${this.$route.params.id}`, {
        userName: user[0],
        firstName: user[1],
        lastName: user[2],
        emailAddress: this.user.emailAddress,
      }, { headers: { Authorization: `${token}` } })
      .then(() => {
        this.$swal(
          'Great!',
          'User updated successfully!',
          'success',
        );
        this.$router.push('/users')
      })
      .catch(() => {
        this.$swal('Oh no!', 'Could not update user', 'error',);
        })
        }
      }).catch(() =>{
      })
      
    },
    async fetchUsers() {
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