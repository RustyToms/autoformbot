AFB.Models.Form = Backbone.Model.extend ({
  updateAttribute: function(selector, attribute, value){
    console.log("updating form attribute values");
		console.log(attribute + ": " + value);
    $form = $(this.get('form_text'));
    console.log(selector);
    $form.find(selector).attr(attribute, value);
    console.log($form.find(selector).attr('name'));
    this.set('form_text', $form.prop('outerHTML'));
    console.log($(this.get('form_text')).find(selector).attr('name'));
  },

  updateHTML: function(selector, value){
    console.log("updating form element html");
		console.log(selector);
    $form = $(this.get('form_text'));
    $form.find(selector).html(value);
    this.set('form_text', $form.prop('outerHTML'));
    console.log($(this.get('form_text')).find(selector).html());
  },
	
	updateCSS: function(selector, key, value){
		console.log("updating form element CSS");
		console.log(selector);
		console.log(key + ": " + value);
		
		if(key === 'font-size'){
			value = value + 'px';
		}
		
    $form = $(this.get('form_text'));
    $form.find(selector).css(key, value);
    this.set('form_text', $form.prop('outerHTML'));
	},
	
	updateProp: function(selector, prop, shouldCreate) {
		console.log("updating form element property");
		console.log(selector);
		console.log(prop + shouldCreate);
			
    $form = $(this.get('form_text'));
		if (shouldCreate){
			$form.find(selector).attr(prop, "true");
		} else {
      $form.find(selector).removeAttr(prop);
		}
		
    this.set('form_text', $form.prop('outerHTML'));
	},

  removeActiveEdits: function(){
    console.log('removing all editing classes');
    var $form = $(this.get('form_text'));
    $form.find('.editing').removeClass('editing');
    $form.find('.delete-field').remove();
    this.set('form_text', $form.prop('outerHTML'));
  },

  updateValues: function(event) {
    console.log("in formmodel#updateValues");

    var selector = '.editing .' + $(event.target).attr('name');
    var value = $(event.target).val();
    var attribute = $(event.target).data('attribute');
		var cssAttribute = $(event.target).data('css');

    if (attribute) {
      this.updateAttribute(selector, attribute, value);
    } else if(cssAttribute) {
			this.updateCSS(selector, cssAttribute, value);
		} else {
      this.updateHTML(selector, value);
    }
  },

  addField: function(field){
    var $form = $(this.get('form_text'));
    $form.find('.fields-list').append(field);
    this.set('form_text', $form.prop('outerHTML'));
  },
	
	duplicateForm: function(callback){
		console.log("duplicating form");
		
		var newModel = new AFB.Models.Form({
			form_text: this.get('form_text'),
			name: this.get('name'),
			account_id: window.ACCOUNT_ID
		});
		
		AFB.formCollection.add(newModel);
		newModel.save({},{
      success: function(response){
        console.log("save successful");
				console.log(response);
				callback && callback(newModel);
      },
      error: function(model, response){
        console.log("error: " + response.responseText);
        console.log(model);
      }
    });
	}
});