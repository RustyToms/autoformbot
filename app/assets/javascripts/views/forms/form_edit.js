AFB.Views.FormEdit = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClickForm",
		"keyup" : "updateSidebar"
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
    $newField.append($(this.model.get('form_text')).find('#form-itable .editing'));

    this.prepForm($newField);
    this.$el.find('#form-itable .editing').replaceWith($newField.find('.formEl'));
    this.parentView.makeSortable();
  },

  prepForm: function($formText){
    $formText.find("label, h2, p, li.magicBox div").
      attr('contenteditable', 'true');
    $formText.find('input').attr('disabled', 'disabled');

    $targets = $formText.find('.formEl, .submit-button');
    $targets.not($targets.has('.move-handle')).
      prepend("<span class='move-handle' style='color: white; font-size:" +
      " 20px; z-index: 999;'>\u039E</span>");
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
      this.startEditingField($target);

    } else if ($formEl.length === 0) {

      // var sidebar = new AFB.Views.FormSidebarInputs({
      //   model: this.model
      // });
      this.parentView.swapSidebar();

    }
  },

  startEditingField: function($target){
    console.log("in FormEdit#startEditingField");
    this.parentView.removeActiveEdits();

    var $form = this.$el.find('#form-itable');
    var $formEl = $target.closest(".formEl");

    $form.append(JST['forms/form_filter']());
    $formEl.addClass("editing").append("<button class='delete-field'" +
        "style='position: absolute'>X</button>");

    //this.model.localSaveForm();
    var editBoxName = $formEl.data("sidebar");
    console.log("new editBox should be " + editBoxName);
    if (editBoxName){
      var editBox = new AFB.Views[editBoxName]({
        model: this.model
      });
    editBox.field = $formEl;

    this.parentView.makeEditBox(editBox);
    }
  },

	updateSidebar: function(event){
    var that = this;
		console.log("updating sidebar, triggered with a " + event.type);
      console.log(event.target);
    this.model.localSaveForm();
		this.parentView.updateSidebar();
    $(function(){
      $input = $(".sidebar_window input, .sidebar_window textarea").
        filter(function(){
        return ($(event.target).attr('class').indexOf(this.name) > -1);
        // return $(event.target).hasClass(this.name);
      }).not("input[type='checkbox'], input[type='radio']");
        //should exclude checkboxes and radio buttons that are not checked
      $input.trigger('keyup');
    });
	}
});