AFB.Views.FormEdit = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClickForm",
  //   "click #save-button" : "serverSaveForm",
		// "click .duplicate-form button" : "duplicateForm",
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
    myModel = this.model
    console.log("rendering FormEdit view");
    var $formText = $(this.model.get('form_text'));
    
		$formText.find("label, h2, p").
			attr('contenteditable', 'true');
		var $form = this.$el.find('.form-edit-box');
    if($form.html()){
      console.log("replacing previous text")            
      $form.replaceWith($formText.prop('outerHTML'));
    } else {
      console.log("adding formText for the first time")
      this.$el.prepend($formText.prop('outerHTML'));
    }
    this.$el.find('.form-edit-box').before("<link href='/assets/form-edit.css'" +
      " rel='stylesheet' type='text/css'>");

    return this;
  },

  // localSaveForm: function(){
  //   var $form = this.$el.find('.form-edit-box');
		// var name = this.$el.find('.formName').text().trim();
  //   var form = $form.prop('outerHTML');
  //   this.model.set({
  //   	form_text: form,
		// 	name: name
  //   },{silent: true});
  // },

  // serverSaveForm: function(){
		// var that = this;
  //   this.$el.find(".form-edit-box label, h2, p").removeAttr('contenteditable');
		// this.removeActiveEdits();
  //   this.localSaveForm();

  //   console.log("in FormEdit#serverSaveForm")
  //   var name = this.$el.find('.formName').text().trim();
		// var text = this.model.get('form_text')
		// this.model.save({
		// 	name: name,
  //     form_text: text
		// },{
  //     success: function(response, model){
  //       console.log("save successful");
		// 		console.log(model);
		// 		console.log(response);
		// 		console.log(that.model.get('id'));
  //     },
  //     error: function(response, model){
  //       console.log("error: " + response.responseText);
  //       console.log(model)
  //     }
  //   });
  //   this.parentView.render();
  // },

  parseClickForm: function(event) {
    console.log("in parseClickForm");
    $target = $(event.target);
		
    if($target.hasClass('delete-field')){
			
      $target.closest(".formEl").remove();
      this.localSaveForm();
      this.parentView.render();
			
    } else if (!$target.closest(".formEl").hasClass('editing')){
	    this.parentView.removeActiveEdits(this.parentView);
			
      $formEl = $target.closest(".formEl")
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
	
	// removeActiveEdits: function(){
 //    console.log('removing all editing classes');
	// 	var $old = this.$el.find('.editing');
 //    $old.find('.delete-field').remove();
	// 	$old.removeClass('editing');
	// },
  
	updateSidebar: function(){
		console.log("updating sidebar");
		this.parentView.localSaveForm(this.parentView);
		this.parentView.updateSidebar();
	}
	
	// duplicateForm: function(event){
	// 	this.model.duplicateForm();
	// }
});
