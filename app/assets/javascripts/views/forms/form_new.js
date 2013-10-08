AFB.Views.FormNew = Backbone.View.extend({

  initialize: function(){
    console.log('FormNew View initialized');
    this.model.set('form_text', JST["forms/edit_form"]({
      form: this.model
    }));
  },

  render: function(){
    masterView = new AFB.Views.FormMaster({
      model: this.model
    });
    masterView.render();
  }
})