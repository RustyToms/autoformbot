AFB.Views.FormEdit = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClickForm",
		"keyup" : "updateSidebar"
  },

  initialize: function(){
    var that = this;
    console.log('FormEdit View initialized');
    // this.on('change', function(){
    //   that.renderChange();
    // });
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
    $newField.append($(this.model.get('form_text')).find('.editing'));

    this.prepForm($newField);
    this.$el.find('.editing').replaceWith($newField.find('.formEl'));
    this.parentView.makeSortable();
  },

  prepForm: function($formText){
    $formText.find("label, h2, p").attr('contenteditable', 'true');
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

      this.makeGhost($formEl);
      this.model.localSaveForm();
      this.parentView.render();

    } else if ($formEl.length && !$formEl.hasClass('editing')){
      this.startEditingField($target);

    } else if ($formEl.length === 0) {
      var sidebar = new AFB.Views.FormSidebarInputs({
        model: this.model
      });
      this.parentView.swapSidebar(sidebar, this.parentView);

    }
  },

  makeGhost: function($target) {
    console.log("making ghost in FormEdit View");
    AFB.Routers.FormRouter.matchSize($target, $target);
    $target.draggable().draggable('destroy');
    $target.empty();
    $target.removeClass();
    $target.addClass('ghost');
    $target.css('display', 'block');
  },

  startEditingField: function($target){
    console.log("in FormEdit#startEditingField");
    this.parentView.removeActiveEdits();

    var $formEl = $target.closest(".formEl");
    $formEl.addClass("editing").
    append("<button class='delete-field' style='position: absolute'" +
      ">X</button>");

    this.model.localSaveForm();
    var sidebarName = $formEl.data("sidebar");
    console.log("new sidebar should be " + sidebarName);
    var sidebar = new AFB.Views[sidebarName]({
      model: this.model
    });
    sidebar.field = $formEl;

    this.parentView.swapSidebar(sidebar, this.parentView);
  },

	updateSidebar: function(event){
    this.model.silentUpdate = true;
    var that = this;
		console.log("updating sidebar");
    this.model.localSaveForm();
		this.parentView.updateSidebar();
    $(function(){
      $input = $(".sidebar_window input, textarea").filter(function(){
        return $(event.target).hasClass(this.name);
      });
      $input.not(function(){
        //should exclude checkboxes and radio buttons that are not checked
      });
      $input.trigger('keyup');
      that.model.silentUpdate = false;
    });
	}
});