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
    // checkIt2 = this.$rootEl;
    this.$rootEl.html(this.view.render().$el)
    // checkIt3 = this.$rootEl;
  },

  formNew: function(){
    this.$rootEl.empty();
    console.log("In FormRouter#formNew");
    this.model = new AFB.Models.Form();
    this.setUpModel()
    AFB.formCollection.add(this.model);
    this.view && this.view.remove();
    this.view = new AFB.Views.FormMaster({
      model: this.model
    });
    this.$rootEl.html(this.view.render().$el);
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
    })
    this.$rootEl.html(this.view.render().$el);
  },

  formEdit: function(id) {
    console.log("in FormRouter#formEdit for form #" + id);
    this.view && this.view.remove();
    this.view = new AFB.Views.FormMaster({
      model: AFB.formCollection.get(id)
    });
    this.$rootEl.html(this.view.render().$el);
  }
})