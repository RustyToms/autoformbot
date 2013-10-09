AFB.Views.FormShow = Backbone.View.extend({
  render: function(){
    this.$el.html(JST['forms/show_form']());
    this.$el.find('form').prepend(this.model.get('form_text'));
    return this;
  }
});