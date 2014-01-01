AFB.Models.Form = Backbone.Model.extend ({

  initialize: function(attributes){
    if (typeof attributes.notify_by === 'string'){
      this.attributes.notify_by = JSON.parse(attributes.notify_by);
    }
    if (typeof attributes.emails === 'string'){
      this.attributes.emails = JSON.parse(attributes.emails);
    }
  },

  parse: function(response){
    response.notify_by = JSON.parse(response.notify_by);
    response.emails = JSON.parse(response.emails);

    return response;
  },

  toJSON: function(options){
    var attributes = _.clone(this.attributes);
    if (typeof attributes.notify_by != 'string'){
      attributes.notify_by = JSON.stringify(attributes.notify_by);
    }
    if (typeof attributes.emails != 'string'){
      attributes.emails = JSON.stringify(attributes.emails);
    }
    return attributes;
  },

  localSaveCount: 0,

  updateAttribute: function(selector, attribute, value){
    console.log("updating form attribute values");
		console.log(attribute + ": " + value);
    $('.outer-wrapper').find(selector).attr(attribute, value);

    this.localSaveForm();
  },

  updateHTML: function(selector, value){
    console.log("updating form element html");
		console.log(selector);
    $('.outer-wrapper').find(selector).html(value);
    this.localSaveForm();
  },

	updateCSS: function(selector, key, value){
		console.log("updating form element CSS");
		console.log(selector);
		console.log(key + ": " + value);

		if(key === 'font-size'){
			value = value + 'px';
		}
    $('.outer-wrapper').find(selector).css(key, value);
    this.localSaveForm();
	},

	updateProp: function(selector, prop, shouldCreate) {
		console.log("updating form element property");
		console.log(selector);
		console.log(prop + shouldCreate);

    $form = $('.outer-wrapper').find(selector);
		if (shouldCreate){
			$form.find(selector).attr(prop, "true");
		} else {
      $form.find(selector).removeAttr(prop);
		}
    this.localSaveForm();
	},

  updateValues: function(event) {
    console.log("in formmodel#updateValues");
    var selector = '.editing ' + $(event.target).attr('name');
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
    $('form.form .fields-list').append(field);
    this.localSaveForm();
  },

  removeActiveEdits: function(){
    console.log('removing all editing classes');
    var $form = $(this.get('form_text'));
    this.standardEditRemoval($form);

    $form.find('input, textarea').removeAttr('disabled');
    $form.find('.move-handle').remove();
    $form.find(".label, label span").removeAttr('contenteditable');
    if (this.formRouter && this.formRouter.formMaster){
      this.formRouter.formMaster.mustPrepForm = true;
    }
    this.set('form_text', $form.prop('outerHTML'));
  },

  standardEditRemoval: function($form){
    console.log('Form.js#standardEditRemoval');
    $form.find('#form-filter').remove();
    $(document).off('click', this.stopEditing);
    $form.find('.editing').removeClass('editing');
    $form.find('#edit-box').remove();
  },

  stopEditing: function(event){
    console.log('form.js#stopEditing');
    if ($(event.target).closest('#edit-box, .formEl').length === 0){
      event.data.parentView.removeActiveEdits();
    }
  },

  serverSave: function(){
    console.log('in Form model saving to the server');
    this.removeActiveEdits();
    // get rid of newlines created by adding and removing the form filter
    var $form = $(this.get('form_text'));
    $form.find('form').first().html($form.find('form').first().html().trim());
    this.set('form_text', $form.prop('outerHTML'));

    this.save({},{
      success: function(model, response, options){
        console.log("save successful");
        AFB.Routers.FormRouter.myFlash('Form saved');
      },
      error: function(model, xhr, options){
        console.log("error: " + xhr.responseText);

        $.each(xhr.responseJSON, function(i, value){
          AFB.Routers.FormRouter.myFlash("error: " + value);
        });
      }
    });
  },

	duplicateForm: function(callback){
		console.log("duplicating form");
		var newModel = new AFB.Models.Form(this.attributes);
    newModel.unset('id');

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
    $form = $(this.get('form_text'));
    $form.find('form.form').first().attr('action',
      '/results/' + this.get('id'));
    this.set('form_text', $form.prop('outerHTML'));
  },

  localSaveForm: function(){
    console.log('locally saving form model');
    var that = this;
    this.formRouter.openModel = this;
    this.localSaveCount += 1;
    var uniqueSave = this.localSaveCount;

    $(function(){
      if (uniqueSave != that.localSaveCount) {
        return; // makes sure this is only run once if they get stacked up
      }
      console.log('document ready, locally saving form, uniqueSave is ' + uniqueSave);
      var $form = $('.outer-wrapper');
      $form.find('.ui-draggable').draggable().draggable('destroy');
      $form.find('.ui-droppable').droppable().droppable('destroy');

      var name = $form.find('.formName').text().trim();
      that.set({
        form_text: $form.prop('outerHTML'),
        name: name
      });

      $form.find('input').attr('disabled', 'disabled');
      that.formRouter.view.makeSortable();
    });
  }
});
