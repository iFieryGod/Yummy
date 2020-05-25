<template>
 <header class="py-2 bg-primary text-white" id="main-header">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1><i class="fa fa-pencil"></i> Post</h1>
        </div>
      </div>
    </div>
  <section class="py-4 mb-4" id="actions">
    <div class="container">
      <div class="row">
        <div class="col-md-3 mb-3"><a class="btn btn-primary btn-block" href="#" data-toggle="modal" data-target="#addPost"><i class="fas fa-plus"></i> Add Post</a></div>
        <div class="col-md-6 ml-auto">
          <div class="input-group">
            <input class="form-control" type="text" placeholder="Search" /><span class="input-group-btn">
              <button class="btn btn-primary">Search</button></span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="modal fade" id="addPost">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h1 class="modal-title"><i class="fa fa-pencil"></i> Add Post</h1>
          <button class="close" data-dismiss="modal"><span>×</span></button>
        </div>
        <div class="modal-body">
          <form action="/post" method="post" enctype="multipart/form-data">
            <div class="form-group">
              <label for="title">Title</label>
              <input class="form-control" name="title" type="text" required/>
            </div>
            <div class="form-group">
              <label for="image">Upload Image</label>
              <div class="custom-file">
                <input class="custom-file-input" type="file" name="image" id="image"/>
                <label class="custom-file-label" for="image">Choose file</label>
              </div>
              <small class="form-text text-muted">Max Size 5mb</small>
            </div>
            <div class="form-group">
              <label for="body">Body</label>
              <textarea class="form-control" name="editor1" required></textarea>
              <button class="btn btn-primary mt-2" type="submit">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <section class="py-4 mb-4" id="action">
    <div class="container">
      <div class="row">
        <div class="col">
            <h4>Latest Post</h4>
            <table class="table table-responsive table-hover table-dark">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Comments</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-weight-bold"/>
                  <td class="text-wrap"></td>
                  <td>
                    <router-link to="/task/:id" class="btn btn-info">
                    <i class="fa fa-angle-double-right"></i>
                    <span>Edit</span> 
                    </router-link>
                  </td>
                  <form action="/" method="post">
                  <input type="hidden" name="_method" value="DELETE">
                  <td><button class="btn btn-danger text-white" type="submit"><i class="fa fa-remove"></i> Delete</button></td></form>
                </tr>
                <p>No Posts are yet available</p>
              </tbody>
            </table>
          </div>
      </div>
    </div>
  </section>
</header>

</template>