AFB.Views.FormSidebarInputs = Backbone.View.extend({
  initialize: function(){
    console.log("initializing FormSidebarInputs view")

  },

  render: function(){
    this.$el.empty();
    this.$el.html(JST['forms/inputs']())
    return this
  }
})