<template>
<header class="py-2">
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
          <router-link to="/taskAll" class="btn btn-warning">
            <i class="fa fa-arrow-left"></i>
            <span class='font-weight-bold'>Back To Blog</span> 
          </router-link>
        </div>
      </div>
    </div>
  </section>
  <section class="mb-3" id="editPost">
    <div class="row">
      <div class="col-md-9">
        <div class="container">
          <div class="card">
            <div class="card-header">
              <h4 class="text-dark">Edit Post</h4>
            </div>
            <div class="card-body">
                <div class="form-group">
                  <label class="col-form-label">Title</label>
                  <input class="form-control" name="title" type="text" value="">
                </div>
                <div class="form-group">
                  <label for="file" class="col-form-label">Image Upload</label>
                  <input class="form-control-file" type="file" name="image"><small class="form-test text-muted">Max Size 3MB</small>
                </div>
                <div class="form-group">
                  <label for="message" class="col-form-label">Body</label>
                  <textarea class="form-control" name="editor1"></textarea>
                  <router-link to="/taskAll" class="btn btn-warning mt-2">
                  <span class='font-weight-bold'>Save Changes</span> 
                  </router-link>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <h3 class="text-center"></h3>
        <img src="/" class="d-block img-fluid mb-3 mr-auto ml-auto">
        <div class="container">
          <h4>Related Posts</h4>
          <div class="row">
            <div class="col-6">
              <h5></h5>
              <img src="/" class="d-block img-fluid mb-3 mr-auto" style="width: 120px; height: 80px;">
            <div class="col-6">
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
  </section>
</header>
</template>