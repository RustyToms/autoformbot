AFB.Views.FormSidebarTelnum = Backbone.View.extend({
  field: (JST['forms/fields/telnum']()),

  addField: function(){
    this.model.addField(this.field);
  },

  render: function(){
    console.log("rendering FormSidebarTelnum");
    this.$el.html(JST['forms/sidebars/telnum_options']({
      field: (this.options.field || this.field)
    }));
    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarTelnum#updateValues");
    if ($(event.target).attr('name')=== 'telnum-label' ){
      var name = 'results[' + event.target.value + ']'
      this.model.updateAttribute('.editing .textbox', 'name', name);
    } else if($(event.target).data('attribute') === 'maxlength' ){
      console.log('adjusting field size');
      var size = parseInt(event.target.value) + 3;
      this.model.updateAttribute('.editing .telnum', 'size', size);
    }
    this.model.updateValues(event);
  }
})
