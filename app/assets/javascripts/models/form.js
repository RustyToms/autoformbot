AFB.Models.Form = Backbone.Model.extend ({
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

    var selector = '.editing .' + $(event.target).attr('name');
    if ($(event.target).attr('name') === 'editing'){
      selector = '.editing';
    }
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
    $('#form-itable .fields-list').append(field);
    this.localSaveForm();
  },

  removeActiveEdits: function(){
    console.log('removing all editing classes');
    var $form = $(this.get('form_text'));
    $form.find('input, textarea').removeAttr('disabled');
    $form.find('.editing').removeClass('editing');
    $form.find('.move-handle').remove();
    $form.find('.delete-field').remove();
    $form.find('#form-filter').off().remove();
    $form.find(".label, label span").removeAttr('contenteditable');
    if (this.formRouter && this.formRouter.formMaster){
      this.formRouter.formMaster.mustPrepForm = true;
    }
    this.set('form_text', $form.prop('outerHTML'));
  },

  serverSave: function(){
    console.log('in Form model saving to the server');
    this.removeActiveEdits();
    var text = this.get('form_text');
    var name = $(text).find('.formName').text().trim();
    var url = this.get('url');
    var that = this;
    this.save({
      name: name,
      form_text: text,
      url: url
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
    $form = $(this.get('form_text'));
    $form.find('form#form-itable').attr('action',
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