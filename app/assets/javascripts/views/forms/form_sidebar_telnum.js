AFB.Views.FormSidebarTelnum = Backbone.View.extend({
  initialize: function(){
    this.$el.html(
      "<div class='formEl' id='telnum' >" +
         "<input type='text' size='3' maxlength=3 style='text-align: center'>-"+
         "<input type='text' size='3' maxlength=3 style='text-align: center'>-"+
         "<input type='text' size='4' maxlength=4 style='text-align: center'>" +
      "</div>"
    )
  },

  render: function(){
    console.log("rendering FormSidebarTelnum");
    var form = this.model.get('form_text');
    $form = $(form).append(this.$el.html());
    form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form)
  }
})
