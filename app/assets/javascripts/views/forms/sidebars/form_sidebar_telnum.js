AFB.Views.FormSidebarTelnum = Backbone.View.extend({
  $seed: $(JST['forms/fields/telnum']()),

  addField: function(){
    this.model.addField(this.$seed);
  },

  render: function(){
    console.log("rendering FormSidebarTelnum");
    this.$el.html(JST['forms/sidebars/telnum_options']({
      $field: ($(this.field) || this.$seed)
    }));
    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarTelnum#updateValues");
    if ($(event.target).attr('name')=== 'telnum-label' ){
      var name = event.target.value;
      this.model.updateAttribute('.editing .telnum', 'name', name);
    } else if($(event.target).data('attribute') === 'maxlength' ){
      console.log('adjusting field size');
      var size = parseInt(event.target.value, 10) + 3;
      this.model.updateAttribute('.editing .telnum', 'size', size);
    }
    this.model.updateValues(event);
  }
});
