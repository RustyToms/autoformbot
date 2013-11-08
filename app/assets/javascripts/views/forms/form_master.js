AFB.Views.FormMaster = Backbone.View.extend({
  events: {
    "click .sidebar_header" : "newSidebar",
    "click .sidebar" : "sidebarClick",
    "keyup .sidebar" : "sidebarValues",
    "change .sidebar :checked, .sidebar select" : "sidebarValues",
    "click #save-button" : "serverSaveForm",
    "click .duplicate-form button" : "duplicateForm"
  },

  initialize: function(){
    console.log('FormMaster View initialized');
  },

  render: function(newSidebar, formView){
    console.log('rendering FormMaster view');
    this.$el.empty();
    this.$el.append(this.makeSidebarView(newSidebar));

    this.renderForm();

    var that = this;

    this.sidebarReset(this);

    console.log('--- End of FormMaster view #render ---');
    return this;
  },

  sidebarReset: function(that){
    $(function(){
      that.on("change", ".sidebar", that.sidebarValues);
      $sidebar = $('.sidebar_window');
      $sidebar && $sidebar.css('top', $(this).scrollTop());
    });
  },

  renderForm: function(){
    this.editForm && this.editForm.remove();
    var $formWrapper = $("<div class='main' ></div>");
    $formWrapper.html(JST['forms/form_wrapper']());
    this.editForm = new AFB.Views.FormEdit({

      model: this.model,
      el: $('<span></span>')

    });
    this.editForm.parentView = this;
    this.formRouter.childViews.push(this.editForm);

    $formWrapper.find('.fi-30x').append(this.editForm.render().$el);
    this.$el.append($formWrapper);
    this.makeSortable(this);
    this.initialize();
  },

  makeSidebarView: function(newSidebar, that){
    console.log("making sidebar");
    that = (that || this);
    that.off("change", ".sidebar");
    that.sidebar && that.sidebar.remove();

    if (newSidebar){
      that.sidebar = newSidebar;

    } else {
      that.model.removeActiveEdits();
      that.sidebar = new AFB.Views.FormSidebarInputs({

        model: that.model

      });

    }
    that.sidebar.parentView = that;
    that.formRouter.childViews.push(that.sidebar);


		$sidebarHtml = $(JST['forms/sidebars/sidebar_seed']()).
      append(that.sidebar.render().$el);

    $sidebarHtml.append($(JST["forms/save_dup_buttons"]()));

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
    case "move-to-form-settings":
      console.log("making form-settings view");
      var formSettings = new AFB.Views.FormSettings({
        model: this.model
      });
      $('.inner-wrapper').addClass('editing');
      this.swapSidebar(formSettings, this);
      this.localSaveForm(this);
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
		this.sidebar.field = this.$el.find('.editing');
		this.$el.find('.sidebar_window .sidebar').
      replaceWith(this.sidebar.render().$el.html());
	},

	swapSidebar: function(sidebar, that){
		var $sidebar = that.makeSidebarView(sidebar, that);
		that.$el.find('.sidebar_window').replaceWith($sidebar);
    that.sidebarReset(that);
	},

  localSaveForm: function(that){
    console.log('locally saving form model');

    $(function(){
      $('.ui-draggable').draggable('destroy');
      var $form = that.$el.find('.outer-wrapper');
      var name = $form.find('.formName').text().trim();

      that.model.set({
        form_text: $form.prop('outerHTML'),
        name: name
      },{silent: true});

      $form.find('input').attr('disabled', 'disabled');
      that.makeSortable(that);
    });
  },

  makeSortable: function(that){
    $(function(){
      console.log("making fields-list elements draggable");
      $('.formEl').draggable({
        stop: function(event, ui){
          that.editForm.parseClickForm({target: ui.helper});
          that.localSaveForm(that);
        },
        containment: 'form#form-itable',
        distance: 3,
        handle: '.move-handle',
        scrollSensitivity: 50,
        snap: ".formEl",
        snapMode: 'outer',
        snapTolerance: 5
      });
    });
  },

  serverSaveForm: function(){
    console.log("in FormMaster#serverSaveForm");
    this.model.serverSave();
    this.render();
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
