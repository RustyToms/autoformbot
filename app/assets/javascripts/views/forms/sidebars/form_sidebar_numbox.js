AFB.Views.FormSidebarNumbox = Backbone.View.extend({
  $seed: $(JST['forms/fields/numbox']()),

  addField: function(){
    this.model.addField(this.$seed);
  },

  render: function(){
    console.log("rendering FormSidebarNumbox");
    this.$el.html(JST['forms/sidebars/numbox_options']({
      $field: $((this.field) || this.$seed)
    }));

    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarNumbox#updateValues");
    if ($(event.target).attr('name')=== 'numbox-label' ){
      var name = event.target.value;
      this.model.updateAttribute('.editing .numbox', 'name', name);
    }
    this.model.updateValues(event);
  }
});