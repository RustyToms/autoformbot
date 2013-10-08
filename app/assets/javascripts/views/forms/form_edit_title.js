AFB.Views.FormEditTitle = Backbone.View.extend({
  events: {
    "click #name-description-button" : "updateName"
  },

  initialize: function(){
    console.log("initializing FormEditTitle view")

  },

  render: function(){
    this.$el.empty();
    this.$el.html(JST['forms/edit_title']())
    return this
  },

  updateName: function(){
    this.newName = $('#new-form-name').val();
    this.newDescription = $('#new-form-description').val();
    this.model.set('name', this.newName);
    this.updateFormHtml();
    masterView = new AFB.Views.FormMaster({
      model: this.model
    });
    masterView.render();

  },

  updateFormHtml: function(){
    this.$el.empty();
    this.$el.html(this.model.get('form_text'));
    console.log("newName is " + this.newName);
    $('#formName').html(this.newName);
    $('#formDescription').html(this.newDescription);
    console.log(this.$el.html());
    this.model.set('form_text', this.$el.html());
  }
})