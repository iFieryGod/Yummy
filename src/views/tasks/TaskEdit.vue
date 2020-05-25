<template>
<header class="py-2 text-white edit-page-color" id="main-header">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1><i class="fas fa-user-edit"></i> Edit</h1>
        </div>
      </div>
    </div>
  <section class="py-4 mb-4 bg-light" id="actions">
    <div class="container">
      <div class="row">
        <div class="col-md-3 mr-auto"><a class="btn edit-page-color text-white" href="/blog"><i class="fa fa-arrow-left"></i> Back To Blog </a></div>
      </div>
    </div>
  </section>
  <section class="mb-3" id="post">
    <div class="row">
      <div class="col-md-9">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-header">
                  <h4>Edit Post</h4>
                </div>
                <div class="card-body">
                  <form action="/" method="post" enctype="multipart/form-data">
                    <input type="hidden" name="_method" value="PUT">
                    <div class="form-group">
                      <label for="title">Title</label>
                      <input class="form-control" name="title" type="text" value="">
                    </div>
                    <div class="form-group">
                      <label for="file">Image Upload</label>
                      <input class="form-control-file" type="file" name="image"><small class="form-test text-muted">Max Size 3MB</small>
                    </div>
                    <div class="form-group">
                      <label for="message">Body</label>
                      <textarea class="form-control" name="editor1"></textarea>
                      <button class="btn edit-page-color text-white mt-2" type="submit">Save Changes</button>
                    </div>
                  </form>
                </div>
              </div>
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
  </section>
</header>
</template>