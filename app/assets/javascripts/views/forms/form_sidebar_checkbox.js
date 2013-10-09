AFB.Views.FormSidebarCheckbox = Backbone.View.extend({
  initialize: function(){
    this.$el.html(
      "<div class='formEl' id='checkbox' >" +
        "<input type='checkbox' />" +
      "</div>"
    )
  },

  render: function(){
    console.log("rendering FormSidebarCheckbox");
    var form = this.model.get('form_text');
    $form = $(form).append(this.$el.html());
    form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form)
  }
})
