AFB.Views.FormSidebarTextarea = Backbone.View.extend({
  field: ("<div class='formEl editing' id='textarea'" +
            "data-sidebar='FormSidebarTextarea'>" +
            "<label for='textarea' id='textarea-label'></label>" +
            "<textarea rows='10' cols='50' id='textarea'></textarea>" +
          "</div>"),

  addField: function(){
    var form = this.model.get('form_text');
    $form = $(form).append(this.field);
    form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form)
  },

  render: function(){
    console.log("rendering FormSidebarTextarea");
    this.$el.html(JST['forms/textarea_options']({
      field: this.options.field
    }));

    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarTextarea#updateValues");
    AFB.Views.FormMaster.updateValues(event, this.model);
  }
})