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
                  <th scope="col">First Name</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">#</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <router-link to="/users/:id" class="btn btn-warning btn-sm">
                    <i class="fa fa-angle-double-right fa-xs"></i>
                     <span class='font-weight-bold'>Edit</span> 
                    </router-link>
                  </td>  
                  <td>
                    <router-link to="/task/remove" class="btn btn-danger btn-sm" type="submit">
                    <i class="fa fa-remove fa-xs"></i>
                     <span class='font-weight-bold'>Delete</span> 
                    </router-link>
                    </td>
                </tr>
                <div>There are no users available</div>
              </tbody>
            </table>
        </div>
      </div>
    </div>
  </section>
  </header>  
</template>