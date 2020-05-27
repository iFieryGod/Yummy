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
              <form>
                <div class="form-group">
                  <label for="name" class="col-form-label">Name</label>
                  <input class="form-control" name="name" type="text" value="">
                </div>
                <div class="form-group">
                  <label for="lastName" class="col-form-label">Lastname</label>
                  <input class="form-control" name="lastName" type="text" value="">
                </div>
                <div class="form-group">
                  <label for="email" class="col-form-label">Email</label>
                  <input class="form-control" name="email" type="email" value="">
                </div>
                <div class="form-group">
                  <label for="password" class="col-form-label">Password</label>
                  <input class="form-control" type="password" name="password" value="">
                </div>
                <div class="form-group">
                  <label for="password" class="col-form-label">Confirm Password</label>
                  <input class="form-control" name="password" type="password" value="">
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