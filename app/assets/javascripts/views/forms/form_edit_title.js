AFB.Views.FormEditTitle = Backbone.View.extend({
  events: {
    "click #name-description-button" : "updateName"
  },

  initialize: function(){
    console.log("initializing FormEditTitle view")

  },

  render: function(){
    console.log("rendering FormEditTitle view")
    this.$el.empty();
    this.$el.html(JST['forms/edit_title']())
    return this
  },

  updateName: function(){
    console.log("updateName running")
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
    console.log("updateFormHtml running")
    this.$el.empty();
    this.$el.html(this.model.get('form_text'));
    $('#formName').html(this.newName);
    $('#formDescription').html(this.newDescription);
    this.model.set('form_text', this.$el.html());
  }
})