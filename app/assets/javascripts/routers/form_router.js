AFB.Routers.FormRouter = Backbone.Router.extend({
  initialize: function($rootEl){
    console.log('formrouter initialized');
    this.$rootEl = $rootEl;
  },

  routes: {
    'forms/new': "formNew"
  },

  formNew: function(){
    console.log("In FormRouter#formNew")
    var that = this;
  },

  formSidebarInputs: function(){
    console.log("In FormRouter#formSidebarInputs")
  },

  formEdit: function(){
    console.log("In FormRouter#formEdit")
  }
})