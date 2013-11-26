AFB.Views.FormSidebarTextbox = Backbone.View.extend({
  $seed: $(JST['forms/fields/textbox']()),

  addField: function(){
    this.model.addField(this.$seed);
  },

  render: function(){
    console.log("rendering FormSidebarTextbox");
    this.$el.html(JST['forms/sidebars/textbox_options']({
      $field: $((this.field) || this.$seed)
    }));

    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarTextbox#updateValues");
    if ($(event.target).attr('name') === 'textbox-label' ){
      var name = event.target.value;
      this.model.updateAttribute('.editing .textbox', 'name', name);
    }
    if ( $(this.field).find(':focus').length < 1){
      this.model.updateValues(event);
    }
  }
});