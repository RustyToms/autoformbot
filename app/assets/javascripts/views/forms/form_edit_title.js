AFB.Views.FormEditTitle = Backbone.View.extend({
  initialize: function(){
    console.log("initializing FormEditTitle view")

  },

  render: function(){
    this.$el.empty();
    this.$el.html(JST['forms/edit_title']())
    return this
  }
})