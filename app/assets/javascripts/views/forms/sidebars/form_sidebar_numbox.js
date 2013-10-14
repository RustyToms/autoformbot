AFB.Views.FormSidebarNumbox = Backbone.View.extend({
  field: (JST['forms/fields/numbox']()),

  addField: function(){
    var form = this.model.get('form_text');
    var $form = $(form).append(this.field);
    this.model.set('form_text', $form.prop('outerHTML'))
  },

  render: function(){
    console.log("rendering FormSidebarNumbox");
    this.$el.html(JST['forms/sidebars/numbox_options']({
      field: (this.options.field || this.field)
    }));

    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarNumbox#updateValues");
    AFB.Views.FormMaster.updateValues(event, this.model);
  }
})