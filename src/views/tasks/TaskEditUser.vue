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
              <form ref='form' @submit.prevent='onSubmit()'>
                <div class="form-group">
                  <label for="name" class="col-form-label">Username</label>
                  <input class="form-control" name="name" type="text" v-model="user.userName" :class="{error: validation.hasError('userName'), valid: validation.isTouched('userName') && !validation.hasError('userName')}">
                  <div class="error" v-if="validation.hasError('userName')">{{ validation.firstError('userName')}}</div>
                </div>
                <div class="form-group">
                  <label for="name" class="col-form-label">First name</label>
                  <input class="form-control" name="name" type="text" v-model="user.firstName" :class="{error: validation.hasError('firstName'), valid: validation.isTouched('firstName') && !validation.hasError('firstName')}">
                  <div class="error" v-if="validation.hasError('firstName')">{{ validation.firstError('firstName')}}</div>
                </div>
                <div class="form-group">
                  <label for="lastName" class="col-form-label">Last name</label>
                  <input class="form-control" name="lastName" type="text" v-model="user.lastName" :class="{error: validation.hasError('lastName'), valid: validation.isTouched('lastName') && !validation.hasError('lastName')}">
                  <div class="error" v-if="validation.hasError('lastName')">{{ validation.firstError('lastName')}}</div>
                </div>
                <div class="form-group">
                  <label for="email" class="col-form-label">Email Address</label>
                  <input class="form-control" name="email" type="email" v-model="user.emailAddress" :class="{error: validation.hasError('emailAddress'), valid: validation.isTouched('emailAddress') && !validation.hasError('emailAddress')}">
                  <div class="error" v-if="validation.hasError('emailAddress')">{{ validation.firstError('emailAddress')}}</div>
                </div>
                <div class="form-group">
                  <label for="password" class="col-form-label">Password</label>
                  <input class="form-control" type="password" name="password" minlength="6" maxlength="12" v-model="user.password" :class="{error: validation.hasError('password'), valid: validation.isTouched('password') && !validation.hasError('password')}">
                  <div class="error" v-if="validation.hasError('password')">{{ validation.firstError('password')}}</div>
                </div>
                <div class="form-group">
                  <label for="confirmPassword" class="col-form-label">Confirm Password</label>
                  <input class="form-control" type="password" name="confirmPassword" v-model="user.password" :class="{error: validation.hasError('confirmPassword'), valid: validation.isTouched('confirmPassword') && !validation.hasError('confirmPassword')}">
                  <div class="error" v-if="validation.hasError('confirmPassword')">{{ validation.firstError('confirmPassword')}}</div>
                </div>
                <div class="form-group">
                <router-link to="/taskAll" class="btn btn-warning mt-2">
                  <span class='font-weight-bold'>Save Changes</span> 
                  </router-link>
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
    user: [],
  }),
  mounted() {
    // this.fetchUser();
    this.fetchUsers();
  },
  validators: {
    firstName (value) {
      return Validator.value(value).required().minLength(4);
    },
    userName (value) {
      return Validator.value(value).required().minLength(4);
    },
    lastName(value) {
      return Validator.value(value).required().minLength(4);
    },
    emailAddress(value){
      return Validator.value(value).required().email();
    },
    password(value) {
      return Validator.value(value).required().minLength(6);
    },
    'confirmPassword, password': function(confirmPassword, password) {
      if(this.submitted || this.validation.isTouched('confirmPassword') || this.validation.isTouched('password')) {
        return Validator.value(confirmPassword).required().match(password);
      }
      return true;
    }
  },
  methods: {
    async fetchUsers() {
      return axios.get(`http://localhost:8081/users/${this.$route.params.id}`)
      .then((response) => {
        console.log(response)
        this.user = response.data
      })
      .catch(() => {
      });
    },
    async onSubmit() {
      return axios.post(`http://localhost:8081/users/${this.$route.params.id}`, {
        userName: this.user.userName,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        emailAddress: this.user.emailAddress,
        password: this.user.password
      })
      .then((response) => {
        this.user = response.data
      })
      .catch(() => {
        })
    }
  }
}
</script>