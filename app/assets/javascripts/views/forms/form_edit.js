AFB.Views.FormEdit = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClickForm",
		"keyup" : "updateSidebar"
  },

  initialize: function(){
    var that = this;
    console.log('FormEdit View initialized');
    this.listenTo(this.model, 'change', function(){
      that.renderChange();
    });
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
    this.parentView.makeSortable(this.parentView);
  },

  prepForm: function($formText){
    $formText.find("label, h2, p").attr('contenteditable', 'true');
    $formText.find('input').attr('disabled', 'disabled');
    $formText.find(".formEl:not(:has('.move-handle'))")
      .prepend("<span class='move-handle' style='color: white; font-size:" +
        " 20px; z-index: 999;'>\u039E</span>");
  },

  parseClickForm: function(event) {
    console.log("in parseClickForm");
    var $target = $(event.target);

    if($target.hasClass('delete-field')){

      this.makeGhost($target.closest(".formEl"));
      this.parentView.localSaveForm(this.parentView);
      this.parentView.render();

    } else if (!$target.closest(".formEl").hasClass('editing')){
      this.startEditingField($target);
    }
  },

  makeGhost: function($target) {
    console.log("making ghost in FormEdit View");
    AFB.Routers.FormRouter.matchSize($target, $target);
    $target.closest(".formEl").empty().draggable('destroy').
        removeClass().addClass('ghost');
    $target.css('display', 'block');
  },

  startEditingField: function($target){
    console.log("in FormEdit#startEditingField");
    this.parentView.removeActiveEdits(this.parentView);

    var $formEl = $target.closest(".formEl");
    $formEl.addClass("editing").
    append("<button class='delete-field' style='position: absolute'" +
      ">X</button>");

    this.parentView.localSaveForm(this.parentView);
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
		this.parentView.localSaveForm(this.parentView);
		this.parentView.updateSidebar();
    $(function(){
      $input = $(".sidebar_window input, textarea").filter(function(){
        return $(event.target).hasClass(this.name);
      });
      $input.trigger('keyup');
      that.model.silentUpdate = false;
    });
	}
});