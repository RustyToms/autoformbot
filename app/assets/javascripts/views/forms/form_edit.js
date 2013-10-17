AFB.Views.FormEdit = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClickForm",
    "click #save-button" : "serverSaveForm",
    "click .edit-manual button" : "manualFormEdit",
		"click .duplicate-form button" : "duplicateForm"
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

    if(this.$el.find('.form-edit-box').html()){
      console.log("replacing previous text")
      this.$el.find('.form-edit-box').replaceWith($formText.prop('outerHTML'));
    } else {
      console.log("adding formText for the first time")
      this.$el.prepend($formText.prop('outerHTML'));
    }

    return this;
  },

  localSaveForm: function(){
    var $form = this.$el.find('.form-edit-box');
		var name = this.$el.find('.formName').text().trim();
    var form = $form.prop('outerHTML');
    this.model.set({
    	form_text: form,
			name: name
    });
  },

  serverSaveForm: function(){
    this.$el.find(".form-edit-box label, h2, p").removeAttr('contenteditable');
    this.localSaveForm();
    this.model.removeActiveEdits();

    console.log("in FormEdit#serverSaveForm")
    var name = this.$el.find('.formName').text().trim();
		var text = this.model.get('form_text')
		this.model.save({
			name: name,
      form_text: text
		},{
      success: function(response){
        console.log("save successful");
				console.log(response);
      },
      error: function(model, response){
        console.log("error: " + response.responseText);
        console.log(model)
      }
    });
    this.parentView.render();
  },

  parseClickForm: function(event) {
    console.log("in parseClickForm");
    $target = $(event.target);
		
    if($target.hasClass('delete-field')){
			
      $target.closest(".formEl").remove();
      this.localSaveForm();
      this.parentView.render();
			
    } else if (!$target.closest(".formEl").hasClass('editing')){

      $formEl = $target.closest(".formEl");
      $formEl.addClass("start-editing");
      this.localSaveForm();

      this.model.removeActiveEdits();

      var sidebarName = $formEl.data("sidebar");
      console.log("new sidebar should be " + sidebarName);
      sidebar = new AFB.Views[sidebarName]({
        model: this.model,
        field: $formEl
      });
      this.parentView.render(sidebar);
			
    }
  },

  parseKey: function(event){
    console.log("in parseKey");
    console.log(event.charCode);
    console.log(event.locale);
    if ((event.charCode) == "13"){
      event.preventDefault();

    }
  },
	
	duplicateForm: function(event){
		console.log("duplicating form");
		event.preventDefault();
		
		var newModel = new AFB.Models.Form({
			form_text: this.model.get('form_text'),
			name: this.model.get('name'),
			account_id: window.ACCOUNT_ID
		});
		
		AFB.formCollection.add(newModel);
		newModel.save({},{
      success: function(response){
        console.log("save successful");
				console.log(response);
      },
      error: function(model, response){
        console.log("error: " + response.responseText);
        console.log(model)
      }
    });
	}
});
