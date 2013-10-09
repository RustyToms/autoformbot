AFB.Routers.FormRouter = Backbone.Router.extend({
  initialize: function($rootEl, form){
    console.log('formrouter initialized');
    this.$rootEl = $rootEl;
    this.model = form;
  },

  routes: {
    '': "formNew"
  },

  formNew: function(){
    console.log("In FormRouter#formNew")
    this.model.set('form_text', JST["forms/edit_form"]({
      form: this.model
    }));

    var newForm = new AFB.Views.FormMaster({
      model: this.model
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