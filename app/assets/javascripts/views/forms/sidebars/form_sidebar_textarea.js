AFB.Views.FormSidebarTextarea = Backbone.View.extend({
  field: (JST['forms/fields/textarea']()),

  addField: function(){
    this.model.addField(this.field);
  },

  render: function(){
    console.log("rendering FormSidebarTextarea");
    this.$el.html(JST['forms/sidebars/textarea_options']({
      field: (this.options.field || this.field)
    }));

    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarTextarea#updateValues");
    if ($(event.target).attr('name')=== 'textarea-label' ){
      var name = 'results[' + event.target.value + ']'
      this.model.updateAttribute('.editing textarea', 'name', name);
    }
    this.model.updateValues(event);
  }
})