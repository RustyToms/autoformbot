AFB.Views.FormSidebarCheckbox = Backbone.View.extend({
  field: (JST['forms/fields/checkbox']()),

  addField: function(){
    var form = this.model.get('form_text');
    $form = $(form).append(this.field);
    form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form);
  },

  render: function(){
    console.log("rendering FormSidebarCheckbox");
    this.$el.html("<div class='sidebar'><h2>Nothing here yet</h2></div>")
    return this;
  }
})
