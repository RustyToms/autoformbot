AFB.Views.FormSidebarDropdown = Backbone.View.extend({
  field: (JST['forms/fields/dropdown']()),


  addField: function(){
    var form = this.model.get('form_text');
    $form = $(form).append(this.field);
    form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form);
  },

  render: function(){
    console.log("rendering FormSidebarDropdown");
    this.$el.html(JST['forms/sidebars/dropdown_options']({
      field: this.options.field
    }));
    return this;
  }
})
