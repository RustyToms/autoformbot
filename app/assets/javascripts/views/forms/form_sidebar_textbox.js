AFB.Views.FormSidebarTextbox = Backbone.View.extend({
  initialize: function(){
    this.$el.html(
      "<div class='formEl' id='textbox' >" +
        "<input type='text' />" +
      "</div>"
    )
  },

  render: function(){
    console.log("rendering FormSidebarTextbox");
    var form = this.model.get('form_text');
    $form = $(form).append(this.$el.html());
    form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form)
  }
})