AFB.Views.FormEditTitle = Backbone.View.extend({
  // events: {
  //   "keyup" : "updateValues"
  // },
  render: function(){
    console.log("rendering FormEditTitle view")
		var $form = $(this.model.get('form_text'));
		var title = $form.find('.editing .formName').text().trim();
		var description = $.trim($form.find('.editing .formDescription').text());
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