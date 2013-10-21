AFB.Views.FormMaster = Backbone.View.extend({
  events: {
    "click .sidebar_header" : "newSidebar",
    "click .sidebar" : "sidebarClick",
    "keyup .sidebar" : "sidebarValues",
    "change .sidebar" : "sidebarValues"
  },

  initialize: function(){
    console.log('FormMaster View initialized');
    this.$formEditEl = $(JST["forms/edit_form"]());
  },

  render: function(newSidebar, formView){
    console.log('rendering FormMaster view');
    this.$el.empty();
    this.$el.append(this.makeSidebarView(newSidebar));

		this.editForm && this.editForm.remove();
    this.editForm = new AFB.Views.FormEdit({
			
      parentView: this,
      model: this.model,
      el: this.$formEditEl
			
    });
    this.$el.append(this.editForm.render().$el);
		
    this.initialize();
    return this;
  },

  makeSidebarView: function(newSidebar){
    console.log("making sidebar");
    this.sidebar && this.sidebar.remove();

    if (newSidebar){
			
      this.sidebar = newSidebar;
      console.log("new sidebar is " + this.sidebar);

    } else {
			
      this.model.removeActiveEdits();
      this.sidebar = new AFB.Views.FormSidebarInputs({
				
        parentView: this,
        model: this.model,
				
      });
			
    }
		$sidebarHtml = $(JST['forms/sidebars/sidebar_seed']()).
		  append(this.sidebar.render().$el);
		return $sidebarHtml;
  },

  newSidebar: function(event){
    event.preventDefault();
    console.log("target sidebar view is");
    console.log($(event.target).attr("id"));
    switch($(event.target).attr("id")) {
    case "move-to-add-fields":
      this.render();
      break;
    case "move-to-field-settings":
      var targetField = {
        target: this.editForm.$el.find('.formEl').last()
      }
      this.editForm.parseClickForm(targetField);
      break;
    case "move-to-form-settings":
      console.log("form-settings view isn't made yet")
      break;
    default:
      console.log("hit newSidebar switch default");
      this.render();
    };
  },

  sidebarClick: function(event){
    console.log('in FormMaster#sidebarClick');
    var $target = $(event.target)

    if ($target.hasClass('delete-button')){
      console.log('deleting element');
      var $form = $(this.model.get('form_text'));
      console.log($form.find('.editing .' + $target.attr('name')).
        prop('outerHTML'));

      $form.find('.editing .' + $target.attr('name')).remove();
            console.log($form.find('.editing').prop('outerHTML'));
      this.model.set('form_text', $form.prop('outerHTML'));

      $target.closest('div').remove();
    } else if ($(event.target).attr('name') ==='requiredCheckbox'){

      this.requireField(event);

    } else {

      this.sidebar.parseClick && this.sidebar.parseClick(event);

    }
  },

  sidebarValues: function(event){
    this.sidebar.updateValues && this.sidebar.updateValues(event);
  },

  cleanEl: function(){
    console.log("in FormMaster#cleanEl");
    this.$el.empty();
    this.$el.unbind();
    this.$el.off();
    this.$el.undelegate();

    this.initialize;
  },

  requireField: function(event){
    event.stopPropagation();
    console.log('in FormMaster#requireField')

    var $form = $(this.model.get('form_text'));
    var $target = $form.find('.editing');
    if (event.target.checked){
      $target.addClass("required");
    } else {
      $target.removeClass("required");
    }
    this.model.set('form_text', $form.prop('outerHTML'));
  },

	updateSidebar: function(){
		this.sidebar.options.field = this.$el.find('.editing');
		this.$el.find('.sidebar_window .sidebar').
		  replaceWith(this.sidebar.render().$el.html())
	},
	
	swapSidebar: function(sidebar){
		var $sidebar = this.makeSidebarView(sidebar)		
		this.$el.find('.sidebar_window').replaceWith($sidebar);
	}

})
