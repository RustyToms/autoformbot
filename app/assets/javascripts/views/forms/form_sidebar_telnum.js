AFB.Views.FormSidebarTelnum = Backbone.View.extend({
  field: (
    "<div class='formEl editing' id='telnum'" +
      "data-sidebar='FormSidebarTelnum' >" +
         "<input type='text' size='3' maxlength=3 style='text-align: center'>-"+
         "<input type='text' size='3' maxlength=3 style='text-align: center'>-"+
         "<input type='text' size='4' maxlength=4 style='text-align: center'>" +
      "</div>"
  ),

  addField: function(){
    var form = this.model.get('form_text');
    $form = $(form).append(this.field);
    form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form);
  },

  render: function(){
    console.log("rendering FormSidebarTelnum");
    this.$el.html("<div class='sidebar'><h2>Nothing here yet</h2></div>")
    return this;
  }
})
