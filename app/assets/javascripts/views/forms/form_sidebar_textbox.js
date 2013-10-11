AFB.Views.FormSidebarTextbox = Backbone.View.extend({
  events: {
    "keyup input" : "updateValues"
  },

  field: ("<div class='formEl editing' id='textbox'" +
            "data-sidebar='FormSidebarTextbox'>" +
            "<label for='textbox' id='textbox-label'></label>" +
            "<input type='text' id='textbox'/>" +
          "</div>"),

  initialize: function(){
  },

  addField: function(){
    var form = this.model.get('form_text');
    $form = $(form).append(this.field);
    form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form)
  },

  render: function(){
    console.log("rendering FormSidebarTextbox");
    this.$el.html(JST['forms/textbox_options']());

    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarTextbox#updateValues");
    AFB.Views.FormMaster.updateValues(event, this.model);
  }
})