AFB.Views.FormEdit = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClickForm",
		"keyup" : "updateSidebar"
  },

  initialize: function(){
    this.parentView = this.options.parentView;
    var that = this;
    console.log('FormEdit View initialized');
    this.listenTo(this.model, 'change', function(){
      that.render();
    });
  },

  render: function(){
    console.log("rendering FormEdit view");
    var $formText = $(this.model.get('form_text'));
    
		$formText.find("label, h2, p").
			attr('contenteditable', 'true');
		var $form = this.$el.find('.form-edit-box');
    if($form.html()){
      console.log("replacing previous text");
      $form.replaceWith($formText.prop('outerHTML'));
    } else {
      console.log("adding formText for the first time");
      this.$el.prepend($formText.prop('outerHTML'));
    }
    this.$el.find('.form-edit-box').before("<link href='/assets/form-edit.css'" +
      " rel='stylesheet' type='text/css'>");

    return this;
  },

  parseClickForm: function(event) {
    console.log("in parseClickForm");
    $target = $(event.target);
		
    if($target.hasClass('delete-field')){
			
      $target.closest(".formEl").remove();
      this.localSaveForm();
      this.parentView.render();
			
    } else if (!$target.closest(".formEl").hasClass('editing')){
      this.parentView.removeActiveEdits(this.parentView);
			
      var $formEl = $target.closest(".formEl");
			$formEl.addClass("editing").
      append("<button class='delete-field'>X</button>");
      this.parentView.localSaveForm(this.parentView);

      var sidebarName = $formEl.data("sidebar");
      console.log("new sidebar should be " + sidebarName);
      var sidebar = new AFB.Views[sidebarName]({
        model: this.model,
        field: $formEl
      });
      
      this.parentView.swapSidebar(sidebar);
    }
  },
  
	updateSidebar: function(){
		console.log("updating sidebar");
		this.parentView.localSaveForm(this.parentView);
		this.parentView.updateSidebar();
	}
});