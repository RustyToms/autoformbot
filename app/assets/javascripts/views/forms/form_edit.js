AFB.Views.FormEdit = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClickForm",
		"keyup" : "updateEditBox"
  },

  initialize: function(){
    console.log('FormEdit View initialized');
  },

  render: function(){
    console.log("rendering FormEdit view");
    this.$el.empty();
    var $formText = $(this.model.get('form_text'));
    this.prepForm($formText);
    this.$el.append($formText.prop('outerHTML'));

    return this;
  },

  clickToStopEditing: function(){
    $(document).on('click', this, this.model.stopEditing);
  },

  prepForm: function($formText){
    console.log('**************** FormEdit#prepForm ********************');
    $formText.find(".label, label span").attr('contenteditable', 'true');
    $formText.find('input, textarea').attr('disabled', 'disabled');

    var $targets = $formText.find('.formEl, .submit-button');
    $targets.not($targets.has('.move-handle')).
      prepend("<span class='move-handle' style='color: white; font-size:" +
      " 30px; z-index: 999;'>\u039E</span>");
  },

  parseClickForm: function(event) {
    console.log("in parseClickForm");
    var $target = $(event.target);
    var $formEl = $target.closest(".formEl");

    if ($formEl.length && !$target.hasClass('move-handle') &&
      !$formEl.hasClass('editing')){
      this.parentView.removeActiveEdits();
      this.startEditingField($formEl);
      event.stopPropagation && event.stopPropagation();
    }

    if ($target.attr('contenteditable')){
      $target.focus();
    }
  },

  startEditingField: function($formEl){
    console.log("in FormEdit#startEditingField");
    var editBoxName = $formEl.data("sidebar");
    console.log("new editBox should be " + editBoxName);
    this.prepField($formEl);

    var editBox = new AFB.Views[editBoxName]({
      model: this.model
    });
    editBox.field = $formEl;

    this.parentView.makeEditBox(editBox);
    this.clickToStopEditing();
  },

  prepField: function($formEl){
  // pops the selected field up above a darkened form
    this.$el.find('form').first().append(JST['forms/form_filter']());
    $formEl.addClass("editing");
  },

	updateEditBox: function(event){
    var that = this;
    var targetClasses = $(event.target).attr('class');
    if (!targetClasses){
      return;
    }
		console.log("updating editBox, triggered with a " + event.type);
    console.log(event.target);
    this.model.localSaveForm();
		this.parentView.updateEditBox(event);

    $(function(){
      console.log('document ready, triggering keyups in editbox');
    // spoofs a keyup event in editbox fields linked to the modified form field
      $input = $('#customizations').find('input, textarea').filter(function(){

        var className = $(this).attr('name').replace(/^\./, '');
        return (targetClasses.indexOf(className) > -1);

      }).not("input[type='checkbox'], input[type='radio']");

      $input.trigger('keyup');
    });
	},

  alignField: function($field, alignment){
    console.log("FormEdit#alignField " + alignment);
    console.log($field);
    var $container = $field.offsetParent();
    if (alignment === 'left'){

      $field.css({
        left: $container.css('padding-left'),
        right: 'auto'
        });

    } else if (alignment === 'right'){

      $field.css({
        left: 'auto',
        right: $container.css('padding-right')

      });
    } else if (alignment === 'center'){

      AFB.Routers.FormRouter.centerEl($field);

    }
  }
});