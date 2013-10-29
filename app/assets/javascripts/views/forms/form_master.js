AFB.Views.FormMaster = Backbone.View.extend({
  events: {
    "click .sidebar_header" : "newSidebar",
    "click .sidebar" : "sidebarClick",
    "keyup .sidebar" : "sidebarValues",
    "change .sidebar" : "sidebarValues",
    "click #save-button" : "serverSave",
    "click .duplicate-form button" : "duplicateForm"
  },

  initialize: function(){
    console.log('FormMaster View initialized');
  },

  render: function(newSidebar, formView){
    var that = this;
    console.log('rendering FormMaster view');
    this.$el.html(this.options.$backup.clone().find('.body').html());
    this.$el.prepend(this.makeSidebarView(newSidebar));

    $('iframe').ready(function(){
      that.renderIframe(that);
    });
    this.$el.find('iframe').before($(JST["forms/edit_form"]()));
    console.log('--- End of FormMaster view #render ---');
    return this;
  },
  
  renderIframe: function(that){
    console.log('--- iframe ready, modifying ---');
    var iframe = $('iframe').get(0).contentWindow.document;
    that.$iframeBody = $(iframe).find('body');
    that.$iframeBody.css('margin', '0');

    this.editForm && this.editForm.remove();  
    this.editForm = new AFB.Views.FormEdit({
    
      parentView: that,
      model: that.model,
      el: that.$iframeBody
      
    });
      
    that.$iframeBody.append(that.editForm.render().$el);
    AFB.Routers.FormRouter.setFrameDimensions();
    that.$iframeBody.find(".formEl").prepend("<div style='width: 100%;" +
      "height: 100%; position: absolute; z-index: 3;' class='draggable'></div>");
    that.$iframeBody.find('.draggable').draggable({ snap: true});
    that.initialize();
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
        model: this.model
				
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
      };
      this.editForm.parseClickForm(targetField);
      break;
    case "move-to-form-settings":
      console.log("form-settings view isn't made yet");
      break;
    default:
      console.log("hit newSidebar switch default");
      this.render();
    }
  },

  sidebarClick: function(event){
    console.log('in FormMaster#sidebarClick');
    var $target = $(event.target);

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

  requireField: function(event){
    event.stopPropagation();
    console.log('in FormMaster#requireField');

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
      replaceWith(this.sidebar.render().$el.html());
	},
	
	swapSidebar: function(sidebar){
		var $sidebar = this.makeSidebarView(sidebar);
		this.$el.find('.sidebar_window').replaceWith($sidebar);
	},
  
  localSaveForm: function(that){
    var $form = that.$iframeBody.find('.form-edit-box');
    var name = $form.find('.formName').text().trim();
    
    that.model.set({
      form_text: $form.prop('outerHTML'),
      name: name
    },{silent: true});
  },

  serverSave: function(){
    this.serverSaveForm(this);
  },
  
  serverSaveForm: function(that){
    that.$iframeBody.find(".form-edit-box label, h2, p").
      removeAttr('contenteditable');
    that.removeActiveEdits(that);
    that.localSaveForm(that);

    console.log("in FormMaster#serverSaveForm");
    var name = that.$iframeBody.find('.formName').text().trim();
    var text = that.model.get('form_text');
    this.model.save({
      name: name,
      form_text: text
    },{
      success: function(response, model){
        console.log("save successful");
        console.log(model);
        console.log(response);
        console.log(that.model.get('id'));
      },
      error: function(response, model){
        console.log("error: " + response.responseText);
        console.log(model);
      }
    });
    that.render();
  },
    
  removeActiveEdits: function(that){
    console.log('removing all editing classes');
    var $old = that.$iframeBody.find('.editing');
    $old.find('.delete-field').remove();
    $old.removeClass('editing');
  },
  
  duplicateForm: function(event){
    this.model.duplicateForm();
  }
});
