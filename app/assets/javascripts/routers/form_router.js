AFB.Routers.FormRouter = Backbone.Router.extend({
  initialize: function($rootEl){
    console.log('formrouter initialized');
    this.$rootEl = $rootEl;
  },

  routes: {
    '' : "index",
    'index' : "index",
    'forms/new' : "formNew",
    "forms/:id" : "formShow",
    "forms/:id/edit" : "formEdit"
  },

  index: function(){
    console.log("in FormRouter#index");
    this.$rootEl.empty();
    this.view && this.view.remove();
    this.view = new AFB.Views.FormIndex({
      collection: AFB.formCollection
    })
    this.$rootEl.html(this.view.render().$el)
  },

  formNew: function(){
    this.$rootEl.empty();
    console.log("In FormRouter#formNew");
    this.model = new AFB.Models.Form();
    this.setUpModel()
    AFB.formCollection.add(this.model);
    this.view && this.view.remove();
    this.view = new AFB.Views.FormMaster({
      el: this.$rootEl,
      model: this.model
    });
    this.view.render();
  },

  setUpModel: function(){
    var html = JST["forms/new_form_seed"]();
    this.model.set({
      account_id: window.ACCOUNT_ID,
      form_text: html,
      name: "Untitled Form"
    });
  },

  formShow: function(id) {
    this.$rootEl.empty();
    this.view && this.view.remove();
    console.log("in FormRouter#formShow for form #" + id);
    console.log(AFB.formCollection.get(id))
    this.view = showFormView = new AFB.Views.FormShow({
      model: AFB.formCollection.get(id),
      el: this.$rootEl
    })
    this.view.render();
  },

  formEdit: function(id) {
    console.log("in FormRouter#formEdit for form #" + id);
    this.view && this.view.remove();
    this.view = new AFB.Views.FormMaster({
      el: this.$rootEl,
      model: AFB.formCollection.get(id)
    });
    this.view.render();
  }
})