AFB.Views.FormShow = Backbone.View.extend({
  render: function(){
    this.$el = $(this.model.get('form_text'));
		this.$el.append(JST['forms/show_form']());
    return this;
  }
});