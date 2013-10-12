AFB.Views.FormSidebarTextarea = Backbone.View.extend({
  field: (JST['forms/fields/textarea']()),

  addField: function(){
    var form = this.model.get('form_text');
    $form = $(form).append(this.field);
    form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form)
  },

  render: function(){
    console.log("rendering FormSidebarTextarea");
    this.$el.html(JST['forms/sidebars/textarea_options']({
      field: this.options.field
    }));

    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarTextarea#updateValues");
    AFB.Views.FormMaster.updateValues(event, this.model);
  }
})