window.AFB = AutoFormBot = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl, form){
    console.log("AutoFormBot initialized")
    var formModel = new AFB.Models.Form(form)

    new AFB.Routers.FormRouter($rootEl, formModel);

    Backbone.history.start();

    Backbone.history.navigate("forms/new", {trigger: true});

  }
}

