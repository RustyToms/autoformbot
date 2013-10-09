AFB.Views.FormSidebarTextbox = Backbone.View.extend({
  initialize: function(){
    this.$el.html(
      "<label for='textbox' id='textbox-label'></label>" +
      "<div class='formEl' id='textbox' >" +
        "<input type='text' />" +
      "</div>"
    )
  },

  render: function(){
    console.log("rendering FormSidebarTextbox");
    this.addToForm();
    this.$el.html(JST['forms/textbox_options']());

    return this;
  },

  addToForm: function(){
    var form = this.model.get('form_text');
    $form = $(form).append(this.$el.html());
    form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form)
  }
})