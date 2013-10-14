AFB.Views.FormEditTitle = Backbone.View.extend({
  events: {
    "keyup" : "updateValues"
  },

  initialize: function(){
    console.log("initializing FormEditTitle view")
  },

  render: function(){
    console.log("rendering FormEditTitle view")
    this.$el.empty();
    this.$el.html(JST['forms/sidebars/edit_title']())
    return this
  },

  updateValues: function(event){
    console.log("in FormEditTitle#updateValues");
    AFB.Views.FormMaster.updateValues(event, this.model);
  }
})