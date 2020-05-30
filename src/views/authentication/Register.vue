<template>
 <div class="text-center">
 <form id="custom-register" ref='form'>
  <div class="form-group w-50">
    <input type="text" class="form-control" v-model='userName' :rules="nameRules" placeholder="Username" required>
  </div>
  <div class="form-group w-50">
    <input type="text" class="form-control" v-model='firstName' placeholder="First Name" required>
  </div>
  <div class="form-group w-50">
    <input type="text" class="form-control" v-model="lastName" placeholder="Last Name" required>
  </div>
  <div class="form-group w-50">
    <input type="email" class="form-control" v-model='emailAddress' placeholder="Email Address" required>
  </div>
  <div class="form-group w-50">
    <input type="password" class="form-control" :rules='passwordRules' v-model='password' placeholder="Password" required>
  </div>
  <div class="form-group w-50">
    <input type="password" class="form-control" v-model='confirmPassword' placeholder='Confirm Password' required>
  </div>
  <div class="row">
    <div class='col-6'><button @click="submit" :disabled='!valid' class="btn btn-primary btn-lg">Submit</button></div>
    <div class='col-6'><button @click="clear" class="btn btn-primary btn-lg">Reset</button></div>
  </div>
</form>
</div>
</template>
<script>
import axios from 'axios'

export default {
  data: () => ({
    userName: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
  }),
  methods: {
    submit(e) {
      e.preventDefault()
      let user = [this.userName, this.firstName, this.lastName].map((user) => {
       return user.charAt(0).toUpperCase() + user.slice(1)
      })
      return axios.post('http://localhost:8081/users',
       {
         userName: user[0],
         firstName: user[1],
         lastName: user[2],
         emailAddress: this.emailAddress,
         password: this.password,
       },
       { headers: {
            'Content-Type': 'application/json'
          }
       })
        .then(() => {
        this.$refs.form.reset();
        })
        .catch(() => {
        });
    },
    clear(e) {
      e.preventDefault()
      this.$refs.form.reset();
    },
  }
}
</script>