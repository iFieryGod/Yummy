<template>
  <nav class="navbar navbar-expand-lg navbar-dark custom-bg-dark">
    <router-link to="/" class='navbar-brand'>
      <img style="max-height: 25px" src="../assets/ice-cream3.png" alt="ice-cream-badge">
    <span id="app-name">yummy</span>
    </router-link>
  <div class="nav nav-tabs ml-auto" id="nav-tab" role="tablist">
        <router-link to="/" class="nav-item" data-toggle="tab" role="tab" aria-controls="nav-home" aria-selected="true">
         <span class='nav-link'>Home</span> 
        </router-link>
         <router-link to="/task" class="nav-item" data-toggle="tab" role="tab" aria-controls="nav-home" aria-selected="true">
         <span class='nav-link'>Blog</span> 
        </router-link>
         <router-link to="/task/new" class="nav-item" data-toggle="tab" role="tab" aria-controls="nav-home" aria-selected="true">
         <span class='nav-link'>Post</span> 
        </router-link>
         <router-link to="/users" class="nav-item" data-toggle="tab" role="tab" aria-controls="nav-home" aria-selected="true">
         <span class='nav-link'>Users</span> 
        </router-link>
         <router-link to="/login" class="nav-item" data-toggle="tab" role="tab" aria-controls="nav-home" aria-selected="true">
         <span class='nav-link'>Login</span> 
        </router-link>
         <router-link to="/register" class="nav-item" data-toggle="tab" role="tab" aria-controls="nav-home" aria-selected="true">
         <span class='nav-link'>Register</span> 
        </router-link>
        <router-link to="/register" class="nav-item" data-toggle="tab" role="tab" aria-controls="nav-home" aria-selected="true">
         <span class='nav-link'>Goran</span> 
        </router-link>
  </div>
</nav>
</template>
