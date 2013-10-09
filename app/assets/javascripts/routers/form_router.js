AFB.Routers.FormRouter = Backbone.Router.extend({
  initialize: function($rootEl){
    console.log('formrouter initialized');
    this.$rootEl = $rootEl;
  },

  routes: {
    '' : "index",
    'index' : "index",
    'forms/new' : "formNew"
  },

  index: function(){
    console.log("in FormRouter#index");
    this.$rootEl.empty();
    var indexForm = new AFB.Views.FormIndex({
      collection: AFB.formCollection
    })
    this.$rootEl.html(indexForm.render().$el)
  },

  formNew: function(){
    this.$rootEl.empty();
    console.log("In FormRouter#formNew");
    this.model = new AFB.Models.Form();
    this.setUpModel()
    AFB.formCollection.add(this.model);

    var newForm = new AFB.Views.FormMaster({
      el: this.$rootEl,
      model: this.model,
    });
    newForm.render();
  },

  setUpModel: function(){
    var html = JST["forms/new_form_seed"]();
    this.model.set({
      account_id: window.ACCOUNT_ID,
      form_text: html
    });
  },

  formSidebarInputs: function(){
    console.log("In FormRouter#formSidebarInputs");
  },

  formEdit: function(){
    console.log("In FormRouter#formEdit");
  }
})