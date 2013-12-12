AFB.Views.FormEdit = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClickForm",
		"keyup" : "updateEditBox"
  },

  initialize: function(){
    console.log('FormEdit View initialized');
  },

  stopEditing: function(event){
    console.log('FormEdit#stopEditing');
    if ($(event.target).closest('#edit-box, .editing').length < 1){
      $(document).off('click', this.stopEditing);
      event.data.parentView.removeActiveEdits();
    }
  },

  render: function(){
    console.log("rendering FormEdit view");
    this.$el.empty();
    var $formText = $(this.model.get('form_text'));
    this.prepForm($formText);
    this.$el.append($formText.prop('outerHTML'));

    return this;
  },

  renderChange: function(){
    console.log("rendering FormEdit form change");
    var $newField = $('<span></span>');
    $newField.append($(this.model.get('form_text')).find('.editing').first());

    this.prepForm($newField);
    this.$el.find('.editing').first().replaceWith($newField.find('.formEl'));
    this.parentView.makeSortable();
  },

  prepForm: function($formText){
    console.log('**************** FormEdit#prepForm ********************');
    $formText.find(".label, label span").attr('contenteditable', 'true');
    $formText.find('input, textarea').attr('disabled', 'disabled');

    $targets = $formText.find('.formEl, .submit-button');
    $targets.not($targets.has('.move-handle')).
      prepend("<span class='move-handle' style='color: white; font-size:" +
      " 30px; z-index: 999;'>\u039E</span>");
  },

  parseClickForm: function(event) {
    console.log("in parseClickForm");
    var $target = $(event.target);
    var $formEl = $target.closest(".formEl");

    if($target.hasClass('delete-field')){
      event.preventDefault();
      $formEl.remove();
      this.model.localSaveForm();
      this.parentView.render();

    } else if ($formEl.length && !$formEl.hasClass('editing')){
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

    var editBox = new AFB.Views[editBoxName]({
      model: this.model
    });
    editBox.field = $formEl;

    this.prepField($formEl);
    this.parentView.makeEditBox(editBox);
  },

  prepField: function($formEl){
  // pops the selected field up above a darkened form, adds a listener to
  // detect a click outside the field or editbox, signalling the end of editing
    var that = this;
    this.$el.find('form').first().append(JST['forms/form_filter']());
    $formEl.addClass("editing").append("<button class='delete-field'" +
        "style='position: absolute'>X</button>");
    $(function(){
      console.log('document ready, adding form-filter click listener');
      $(document).on('click', that, that.stopEditing);
    });
  },

	updateEditBox: function(event){
    var that = this;
    if (!$(event.target).attr('class')){
      return;
    }
		console.log("updating editBox, triggered with a " + event.type);
    console.log(event.target);
    this.model.localSaveForm();
		this.parentView.updateEditBox(event);
    $(function(){
      console.log('document ready, triggering keyups in editbox');
    // spoofs a keyup event in editbox fields linked to the modified form field
      $input = $('#edit-box').find('input, textarea').filter(function(){
        return ($(event.target).attr('class').indexOf(this.name) > -1);
      }).not("input[type='checkbox'], input[type='radio']");

      $input.trigger('keyup');
    });
	}
});