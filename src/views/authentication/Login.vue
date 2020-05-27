<template>
<div class="text-center">
 <form id="login-form" v-on:submit='onSubmit'>
  <div class="form-group w-50">
    <label for="username" class="label font-weight-bold">Username</label>
    <input type="text" class="form-control" id="username" placeholder="Username">
  </div>
  <div class="form-group w-50">
    <label for="password" class='label font-weight-bold'>Password</label>
    <input type="password" class="form-control" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-primary btn-lg">Login</button>
</form>
</div>
</template>
<script>
import * as auth from '../../services/authServices'
export default {
  name: 'login',
  methods: {
    onSubmit: function(event) {
      event.preventDefault();
      auth.login();
      this.push({ name: 'Home' });
    }
  }
}
</script>