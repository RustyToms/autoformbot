AFB.Views.FormSidebarDropdown = Backbone.View.extend({
  initialize: function(){
    this.$el.html(
      "<div class='formEl' id='dropdown' >" +
        "<select>" +
          "<option>Option1</option>" +
          "<option>Option2</option>" +
          "<option>Option3</option>" +
        "</select>" +
      "</div>"
    )
  },

  render: function(){
    console.log("rendering FormSidebarDropdown");
    var form = this.model.get('form_text');
    $form = $(form).append(this.$el.html());
    form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form)
  }
})
