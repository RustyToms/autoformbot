AFB.Models.Form = Backbone.Model.extend ({

  updateAttribute: function(selector, attribute, value){
    console.log("updating form attribute values");
		console.log(attribute + ": " + value);
    $form = $(this.get('form_text'));
    console.log(selector);
    $form.find(selector).attr(attribute, value);
    this.set('form_text', $form.prop('outerHTML'));
  },

  updateHTML: function(selector, value){
    console.log("updating form element html");
		console.log(selector);
    $form = $(this.get('form_text'));
    $form.find(selector).html(value);
    this.set('form_text', $form.prop('outerHTML'));
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
    this.formRouter.openModel = this;
  },

  addField: function(field){
    var $form = $(this.get('form_text'));
    $field = $(field).append("<button class='delete-field' " +
      "style='position: absolute' >X</button>");
    $form.find('.fields-list').append($field, "<br>");
    this.set('form_text', $form.prop('outerHTML'));
    this.formRouter.openModel = this;
  },

  removeActiveEdits: function(){
    console.log('removing all editing classes');
    var $form = $(this.get('form_text'));
    $form.find('input').removeAttr('disabled');
    $form.find('.editing').removeClass('editing');
    $form.find('.move-handle').remove();
    $form.find('.delete-field').remove();
    $form.find('.ui-draggable').draggable('destroy');
    this.set('form_text', $form.prop('outerHTML'));
  },

  serverSave: function(){
    console.log('in Form model saving to the server');
    this.removeActiveEdits();
    var text = this.get('form_text');
    var name = $(text).find('.formName').text().trim();
    var that = this;
    this.save({
      name: name,
      form_text: text
    },{
      success: function(response, model){
        console.log("save successful");
        console.log(model);
        console.log(response);
        console.log(that.get('id'));
        AFB.Routers.FormRouter.myFlash('Form saved');
      },
      error: function(response, model){
        console.log("error: " + response.responseText);
        console.log(model);
        AFB.Routers.FormRouter.myFlash("error: " + response.responseText);
      }
    });

  },

	duplicateForm: function(callback){
		console.log("duplicating form");
    var that = this;

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
        newModel.updateFormAction();

        AFB.Routers.FormRouter.myFlash(newModel.get('name') + ' duplicated');
      },
      error: function(model, response){
        console.log("error: " + response.responseText);
        console.log(model);
        AFB.Routers.FormRouter.
          myFlash('Error duplicating ' + model.get('name'));
      }
    });
	},

  updateFormAction: function() {
    console.log("in Model Form#updateFormAction");
    this.updateAttribute('form#form-itable', 'action',
      '/results/' + this.get('id'));
  },
});