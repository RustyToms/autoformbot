AFB.Views.FormEdit = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClickForm",
		"keyup" : "updateSidebar"
  },

  initialize: function(){
    this.parentView = this.options.parentView;
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
		$formText.find("label, h2, p").attr('contenteditable', 'true');
    var that = this;
    
    $(function(){
      $(".fields-list").sortable({
        stop: function(event, ui){
          myUi = ui;
          myEvent = event;
          that.parseClickForm({target: ui.helper});
        }
      });
    });
    
    this.$el.append($formText.prop('outerHTML'));
    return this;
  },
  
  renderChange: function(){
    console.log("rendering FormEdit form change");
    var $newField = $(this.model.get('form_text')).find('.editing');
    this.$el.find('.editing').replaceWith($newField);
    $(function(){
      $(".fields-list").sortable();
    });
  },

  parseClickForm: function(event) {
    console.log("in parseClickForm");
    var $target = $(event.target);
		
    if($target.hasClass('delete-field')){
			
      $target.closest(".formEl").remove();
      this.parentView.localSaveForm(this.parentView);
      this.parentView.render();
			
    } else if (!$target.closest(".formEl").hasClass('editing')){
      this.startEditingField($target);
    }
  },
  
  startEditingField: function($target){
    this.parentView.removeActiveEdits(this.parentView);
      
    var $formEl = $target.closest(".formEl");
    $formEl.addClass("editing").
    append("<button class='delete-field'>X</button>");
    this.parentView.localSaveForm(this.parentView);

    var sidebarName = $formEl.data("sidebar");
    console.log("new sidebar should be " + sidebarName);
    var sidebar = new AFB.Views[sidebarName]({
      model: this.model,
      field: $formEl
    });
    
    this.parentView.swapSidebar(sidebar);
  },
  
	updateSidebar: function(){
		console.log("updating sidebar");
		this.parentView.localSaveForm(this.parentView);
		this.parentView.updateSidebar();
	}
});