AFB.Views.FormSidebarTextbox = Backbone.View.extend({
  events: {
    "keyup input" : "updateValues"
  },

  initialize: function(){
    AFB.removeActiveEdits(this.model);
    this.$el.html(
      "<div class='formEl editing' id='textbox' >" +
        "<label for='textbox' id='textbox-label'></label>" +
        "<input type='text' id='textbox'/>" +
      "</div>"
    );
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
  },

  updateValues: function(event){
    console.log("in FormSidebarTextbox#updateValues");
    var $form = $(this.model.get('form_text'));

    var target = $(event.target).attr('name');
    var value = $(event.target).val()
    var attribute = $(event.target).data('attribute')
    if (attribute) {
      $form.find('.editing #' + target).attr(attribute, value);
    } else {
      $form.find('#' + target).html(value);
    }

    form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form)
  }
})