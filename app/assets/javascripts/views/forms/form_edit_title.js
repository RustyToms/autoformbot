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
    var name = $('#new-form-name').val()
    this.model.set('name', name);
  }
})