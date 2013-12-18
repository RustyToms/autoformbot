AFB.Views.FormEditTitle = Backbone.View.extend({

  render: function(){
    console.log("rendering FormEditTitle view");

		var $form = $(this.model.get('form_text'));
		var title = $form.find('.editing .formName').first().text();
		var description = $form.find('.editing .formDescription').text();

    this.$el.html(JST['forms/sidebars/edit_title']({
      title: title,
      description: description
    }));
    return this;
  },

  updateValues: function(event){
    console.log("in FormEditTitle#updateValues");
    if ( $(this.field).find(':focus').length < 1){
      this.model.updateValues(event);
    }
    if ($(event.target).attr('name')=='formName'){
      this.model.set({name: $(event.target).val()}, {silent: true});
    }
  }
});