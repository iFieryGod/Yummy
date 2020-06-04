<template>
<div class="text-center">
 <form ref="form" id="login-form">
  <div class="form-group w-50">
    <label class="label font-weight-bold text-justify">Provide your email address</label>
    <input type="text" class="form-control" v-model.trim="email" placeholder="Email Address" :class="{error: validation.hasError('email'), valid: validation.isTouched('email') && !validation.hasError('email')}" required>
    <div class="error" v-if="validation.hasError('email')">{{ validation.firstError('email')}}</div>
  </div>
  <div class="form-group w-50">
    <label class='label font-weight-bold'>Password</label>
    <input type="password" class="form-control" v-model.trim="password" placeholder="Password" minlength="5" maxlength="12" :class="{error: validation.hasError('password'), valid: validation.isTouched('password') && !validation.hasError('password')}">
    <div class="error" v-if="validation.hasError('password')">{{ validation.firstError('password')}}</div>
  </div>
  <div class="row">
    <div class="col"><button type="submit" @click.prevent="submit" class="btn btn-primary btn-lg" :disabled="validation.countErrors() > 0">Login</button></div>
    <div class="col"> <button class='btn btn-danger btn-lg' @click="clear">Reset</button></div>
  </div>
</form>
</div>
</template>
<script>
import axios from 'axios'
import { Validator } from 'simple-vue-validator'
export default {
  data: () => ({ 
    email: '',
    password: '',
  }),
  validators: {
    'email': function (value) {
      return Validator.value(value).required().email();
    },
    'password': function (value) {
      return Validator.value(value).required().minLength(6);
    },
  },
  methods: {
   async submit() {
       this.$validate()
      .then((success) => {
        if(success) {
          console.log(success + 'success')
          return axios.post('http://localhost:8081/users/login', {
          emailAddress: this.email,
          password: this.password
        },
        { headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
        console.log(response)
         window.localStorage.setItem('auth', response.data.token); 
         this.$swal(
          'Great!',
          'You have been logged in',
          'success',
        );
        setTimeout(() => {
          this.$router.push('/')
        }, 3000)
        })
        .catch((error) => {
         console.log(error) 
         this.$swal('Oops', 'It seems you made a mistake. Try again', 'error',);
         this.password = '' 
        })
        }
     })
     .catch((err) => {
       console.error(err)
       throw err;
     })
    },
    clear() {
      this.$refs.form.reset()
      this.email = '',
      this.password = ''
    }
  }
}
</script>