AFB.Views.FormSidebarDropdown = Backbone.View.extend({
  field: (
    "<div class='formEl editing' id='dropdown' " +
     "data-sidebar='FormSidebarDropdown' >" +
      "<select>" +
        "<option>Option1</option>" +
        "<option>Option2</option>" +
        "<option>Option3</option>" +
      "</select>" +
    "</div>"
  ),

  addField: function(){
    var form = this.model.get('form_text');
    $form = $(form).append(this.field);
    form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form);
  },

  render: function(){
    console.log("rendering FormSidebarDropdown");
    this.$el.html("<div class='sidebar'><h2>Nothing here yet</h2></div>")
    return this;
  }
})
