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
console.log($(':focus').prop('outerHTML'));

    if($target.hasClass('delete-field')){
      event.preventDefault();
      $formEl.remove();
      this.model.localSaveForm();
      this.parentView.render();

    } else if ($formEl.length && !$formEl.hasClass('editing')){
      this.startEditingField($target);

    }

    if ($target.attr('contenteditable')){
      $target.focus();
    }
  },

  startEditingField: function($target){
    console.log("in FormEdit#startEditingField");
    var that = this;

    var $form = this.$el.find('form.form').first();
    var $formEl = $target.closest(".formEl");
    if($formEl.length < 1){
      return;
    }

    this.parentView.removeActiveEdits();
    $form.append(JST['forms/form_filter']());
    $formEl.addClass("editing").append("<button class='delete-field'" +
        "style='position: absolute'>X</button>");
    this.model.localSaveForm();

    var editBoxName = $formEl.data("sidebar");
    console.log("new editBox should be " + editBoxName);
    if (editBoxName){
      var editBox = new AFB.Views[editBoxName]({
        model: this.model
      });
      editBox.field = $formEl;

      this.parentView.makeEditBox(editBox);
      $(function(){
        console.log('document ready, adding form-filter click listener')
        $('#form-filter').on('click', function(){
          that.parentView.removeActiveEdits();
        });
      });
    }
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
      $input = $('#edit-box').find('input, textarea').filter(function(){
        return ($(event.target).attr('class').indexOf(this.name) > -1);
      }).not("input[type='checkbox'], input[type='radio']");
        //should exclude checkboxes and radio buttons that are not checked
      $input.trigger('keyup');
    });
	}
});