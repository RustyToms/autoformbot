AFB.Routers.FormRouter = Backbone.Router.extend({
  initialize: function($rootEl, form){
    console.log('formrouter initialized');
    this.$rootEl = $rootEl;
    this.model = form;
  },

  routes: {
    'forms/new': "formNew"
  },

  formNew: function(){
    that = this;
    console.log("In FormRouter#formNew")
    var newForm = new AFB.Views.FormNew({
      model: that.model
    });
    this.$rootEl.append(newForm.render().$el);
  },

  formSidebarInputs: function(){
    console.log("In FormRouter#formSidebarInputs");
  },

  formEdit: function(){
    console.log("In FormRouter#formEdit");
  }
})