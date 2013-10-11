AFB.Views.FormSidebarCheckbox = Backbone.View.extend({
  field: (
    "<div class='formEl editing' id='checkbox'" +
      "data-sidebar='FormSidebarCheckbox' >" +
      "<input type='checkbox' />" +
    "</div>"
  ),

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
