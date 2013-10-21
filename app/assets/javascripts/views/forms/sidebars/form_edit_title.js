AFB.Views.FormEditTitle = Backbone.View.extend({

  render: function(){
    console.log("rendering FormEditTitle view")
		var $form = $(this.model.get('form_text'));
		var title = $form.find('.editing .formName').text().trim();
		var description = $form.find('.editing .formDescription').text().trim();
		console.log(title);
    this.$el.html(JST['forms/sidebars/edit_title']({
    	title: title,
			description: description
    }))
    return this
  },

  updateValues: function(event){
    console.log("in FormEditTitle#updateValues");
    this.model.updateValues(event);
  }
})