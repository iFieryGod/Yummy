<template>
 <div class="text-center">
 <form id="custom-register" ref='form' @submit.prevent='onSubmit()'>
  <div class="form-group w-50">
    <label for="userName">UserName</label>
    <input type="text" class="form-control" v-model.trim='userName' :class="{error: validation.hasError('userName'), valid: validation.isTouched('userName') && !validation.hasError('userName')}">
    <div class="error" v-if="validation.hasError('userName')">{{ validation.firstError('userName')}}</div>
  </div>
  <div class="form-group w-50">
    <label for="firstName">FirstName</label>
    <input type="text" class="form-control" v-model.trim='firstName' :class="{error: validation.hasError('firstName'), valid: validation.isTouched('firstName') && !validation.hasError('firstName')}">
    <div class="error" v-if="validation.hasError('firstName')">{{ validation.firstError('firstName')}}</div>
  </div>
  <div class="form-group w-50">
    <label for="lastName">LastName</label>
    <input type="text" class="form-control" v-model="lastName"  :class="{error: validation.hasError('lastName'), valid: validation.isTouched('lastName') && !validation.hasError('lastName')}">
    <div class="error" v-if="validation.hasError('lastName')">{{ validation.firstError('lastName')}}</div>
  </div>
  <div class="form-group w-50">
    <label for="mail">Email</label>
    <input type="email" class="form-control" v-model.trim='mail' :class="{error: validation.hasError('mail'), valid: validation.isTouched('mail') && !validation.hasError('mail')}" required>
    <div class="error" v-if="validation.hasError('mail')">{{ validation.firstError('mail')}}</div>
  </div>
  <div class="form-group w-50">
    <label for="password">Password</label>
    <input type="password" class="form-control" v-model.trim='password' minlength="5" maxlength="12" :class="{error: validation.hasError('password'), valid: validation.isTouched('password') && !validation.hasError('password')}">
    <div class="error" v-if="validation.hasError('password')">{{ validation.firstError('password')}}</div>
  </div>
  <div class="form-group w-50">
    <label for="confirmPassword">Confirm Password</label>
    <input type="password" class="form-control" v-model.trim='confirmPassword' :class="{error: validation.hasError('confirmPassword'), valid: validation.isTouched('confirmPassword') && !validation.hasError('confirmPassword')}">
    <div class="error" v-if="validation.hasError('confirmPassword')">{{ validation.firstError('confirmPassword')}}</div>
  </div>
  <div class="row">
    <div class='col-6'><button class="btn btn-primary btn-lg" type='submit' :disabled="validation.countErrors() > 0">Submit</button></div>
    <div class='col-6'><button @click="clear" class="btn btn-primary btn-lg">Reset</button></div>
  </div>
</form>
</div>
</template>
<script>
import axios from 'axios'
import { Validator } from 'simple-vue-validator'
export default {
  data: () => ({
    userName: '',
    firstName: '',
    lastName: '',
    mail: '',
    password: '',
    confirmPassword: ''
  }),
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
    mail(value){
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
    onSubmit() {
      this.$validate()
      .then((success) => {
        if(success){
        let user = [this.userName, this.firstName, this.lastName].map((user) => {
              return user.charAt(0).toUpperCase() + user.slice(1)
        })
        return axios.post('http://localhost:8081/users',
       {
         userName: user[0],
         firstName: user[1],
         lastName: user[2],
         emailAddress: this.mail,
         password: this.password,
       },
       { headers: {
            'Content-Type': 'application/json'
          }
       })
        .then(() => {
        this.$swal(
          'Great!',
          'User added successfully!',
          'success',
        );  
        this.$refs.form.reset();
        this.userName = '',
        this.firstName = '',
        this.lastName = '',
        this.mail = '',
        this.password = '',
        this.confirmPassword = '',
        this.$router.push('/login')
        })
        .catch(() => {
          this.$swal('Oh no!', 'Could not add user', 'error',);
        });
        }
      }).catch(() => {
      }); 
    },
    clear(e) {  
      e.preventDefault()
      this.$refs.form.reset();
      this.userName = '',
      this.firstName = '',
      this.lastName = '',
      this.mail = '',
      this.password = '',
      this.confirmPassword = ''
    },
  }
}
</script>