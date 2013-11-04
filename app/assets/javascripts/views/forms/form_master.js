AFB.Views.FormMaster = Backbone.View.extend({
  events: {
    "click .sidebar_header" : "newSidebar",
    "click .sidebar" : "sidebarClick",
    "keyup .sidebar" : "sidebarValues",
    "change .sidebar :checked, .sidebar select" : "sidebarValues",
    "click #save-button" : "serverSave",
    "click .duplicate-form button" : "duplicateForm"
  },

  initialize: function(){
    console.log('FormMaster View initialized');
  },

  render: function(newSidebar, formView){
    console.log('rendering FormMaster view');
    this.$el.empty();
    this.$el.append(this.makeSidebarView(newSidebar));
    this.$el.find('.sidebar_window').
      append($(JST["forms/save_dup_buttons"]()));

    this.renderForm();

    var that = this;
    console.log('--- End of FormMaster view #render ---');
    return this;
  },

  renderForm: function(){
    this.editForm && this.editForm.remove();
    var $formWrapper = $("<div class='main' ></div>");
    $formWrapper.html(JST['forms/form_wrapper']());
    this.editForm = new AFB.Views.FormEdit({

      parentView: this,
      model: this.model,
      el: $('<span></span>')

    });
    $formWrapper.find('.fi-30x').append(this.editForm.render().$el);
    this.$el.append($formWrapper);
    this.makeSortable(this);
    this.initialize();
  },

  makeSidebarView: function(newSidebar, that){
    console.log("making sidebar");
    that = (that || this);
    this.off("change", ".sidebar");
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

    $(function(){
      that.on("change", ".sidebar", that.sidebarValues);
    });

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

      $form.find('.editing .' + $target.attr('name')).remove();
      this.model.set('form_text', $form.prop('outerHTML'));

      $target.closest('div').remove();
    } else if ($(event.target).attr('name') ==='requiredCheckbox'){

      this.requireField(event);

    } else {

      this.sidebar.parseClick && this.sidebar.parseClick(event);
      this.sidebarValues(event);

    }
  },

  sidebarValues: function(event){
    console.log("sidebarValues triggered with a " + event.type);
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
    console.log('locally saving form model');
    // $('.ui-draggable').draggable('destroy');
    // $('.ui-droppable').droppable('destroy');
    $('.ui-sortable').sortable('destroy');//.find('.formEl').children().css('z-index', '0');

    $(function(){
      var $form = that.$el.find('form#form-itable');
      var name = $form.find('.formName').text().trim();

      that.model.set({
        form_text: $form.prop('outerHTML'),
        name: name
      },{silent: true});

      $form.find('.editing input').attr('disabled', 'disabled');
      that.makeSortable(that);
    });
  },

  makeSortable: function(that){
    $(function(){
      console.log("making fields-list elements sortable");
      var $fields = $(".fields-list");
      $fields.sortable({
        delay: 50,
        distance: 3,
        handle: ".move-handle",
        stop: function(event, ui){
          myUi = ui;
          myEvent = event;
          that.editForm.parseClickForm({target: ui.item});
        },
        cancel: "select, option, .contenteditable"
      });
    });
  },

  serverSave: function(){
    this.serverSaveForm(this);
  },

  serverSaveForm: function(that){
    console.log("in FormMaster#serverSaveForm");
    that.$el.find(".fi-30x label, h2, p").
      removeAttr('contenteditable');
    that.$el.find('.move-handle').remove();
    that.removeActiveEdits(that);
    that.localSaveForm(that);

    var name = that.$el.find('.fi-30x .formName').text().trim();
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
    var $old = this.$el.find('.editing');
    $old.find('.delete-field').remove();
    $old.removeClass('editing');
    $old.find('input').removeAttr('disabled');
  },

  duplicateForm: function(event){
    this.model.duplicateForm();
  }
});
