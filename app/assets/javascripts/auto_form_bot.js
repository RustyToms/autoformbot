window.AFB = AutoFormBot = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl, forms){
    console.log("AutoFormBot initialized");
    AFB.formCollection = new AFB.Collections.Forms(forms);

    new AFB.Routers.FormRouter($rootEl);

    Backbone.history.start();
  }
};

