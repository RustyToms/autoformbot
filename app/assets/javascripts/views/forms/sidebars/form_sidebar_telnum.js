AFB.Views.FormSidebarTelnum = Backbone.View.extend({
  field: (JST['forms/fields/telnum']()),

  addField: function(){
    this.model.addField(this.field);
  },

  render: function(){
    console.log("rendering FormSidebarTelnum");
    this.$el.html("<div class='sidebar'><h2>Nothing here yet</h2></div>")
    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarTextarea#updateValues");
    if ($(event.target).attr('name')=== 'telnum-label' ){
      var name = 'results[' + event.target.value + ']'
      this.model.updateAttribute('.editing .textbox', 'name', name);
    }
    this.model.updateValues(event);
  }
})
