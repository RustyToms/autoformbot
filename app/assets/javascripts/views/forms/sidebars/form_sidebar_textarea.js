AFB.Views.FormSidebarTextarea = Backbone.View.extend({
  seed: (JST['forms/fields/textarea']()),

  addField: function(){
    this.model.addField(this.seed);
  },

  render: function(){
    console.log("rendering FormSidebarTextarea");
    this.$el.html(JST['forms/sidebars/textarea_options']({
      $field: $(this.field || this.seed),
      $textarea: $(this.field || this.seed).find('.textarea')
    }));

    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarTextarea#updateValues");
    if ($(event.target).attr('name') === 'textarea-label' ){
      var name = event.target.value;
      this.model.updateAttribute('.editing textarea', 'name', name);
    }
    this.model.updateValues(event);
  }
});