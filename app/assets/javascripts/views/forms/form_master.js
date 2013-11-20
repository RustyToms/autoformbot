AFB.Views.FormMaster = Backbone.View.extend({
  events: {
    "click .sidebar_header" : "newSidebar",
    "click .sidebar" : "sidebarClick",
    "click #edit-box" : "editBoxClick",
    "keyup .sidebar" : "sidebarValues",
    "keyup #edit-box" : "editBoxValues",
    "change .sidebar :checked, .sidebar select" : "sidebarValues",
    "change #edit-box :checked, #edit-box select" : "editBoxValues"
  },

  initialize: function(){
    console.log('FormMaster View initialized');
  },

  render: function(newSidebar, formView){
    console.log('rendering FormMaster view');
    this.$el.empty();
    this.$el.append(this.makeSidebarView(newSidebar));

    this.renderForm();
    this.sidebarReset();

    console.log('--- End of FormMaster view #render ---');
    return this;
  },

  sidebarReset: function(){
    console.log('resetting sidebar');
    $(function(){
      var $sidebar = $('.sidebar_window');
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
    this.makeSortable();
    this.initialize();
  },

  makeSidebarView: function(newSidebar){
    console.log("making sidebar");
    this.sidebar && this.sidebar.remove();

    if (newSidebar){
      this.sidebar = newSidebar;

    } else {
      this.model.removeActiveEdits();
      this.sidebar = new AFB.Views.FormSidebarInputs({
        model: this.model
      });
    }

    this.sidebar.parentView = this;
    this.formRouter.childViews.push(this.sidebar);

		$sidebar = $(JST['forms/sidebars/sidebar_seed']()).
      append(this.sidebar.render().$el);

		return $sidebar;
  },

  makeEditBox: function(newEditBox){
    console.log('FormMaster#makeEditBox');
    var that = this;
    this.editBox && this.editBox.remove();
    this.editBox = newEditBox;
    var $editBox = $(JST['forms/editbox_seed']())
    $editBox.find('#customizations').html(this.editBox.render().$el);
    $('.fi-30x').append($editBox);

    $(function(){
      that.positionEditBox($editBox);
    });
  },

  positionEditBox: function($editBox){
    console.log('positioning the new editBox');
    var $field = this.$el.find('.editing');
    var x = parseInt($field.css('left'), 10) + ($field.outerWidth() / 2);
    var left = x - ($editBox.outerWidth() / 2);
    var top = parseInt($field.css('top'), 10) + $field.outerHeight() + 30;

    $editBox.css({
      'left': (left + 'px'),
      'top': (top + 'px')
    });

    AFB.Routers.FormRouter.positionWindow($field.add($editBox));
  },


  newSidebar: function(event){
    console.log("target sidebar view is");
    console.log($(event.target).attr("id"));
    event.preventDefault();
    switch($(event.target).attr("id")) {
    case "move-to-add-fields":
      this.removeActiveEdits();
      this.model.localSaveForm();
      this.render();
      break;
    case "move-to-form-settings":
      console.log("making form-settings view");
      var formSettings = new AFB.Views.FormSettings({
        model: this.model
      });
      this.removeActiveEdits();
      $('.inner-wrapper').addClass('editing');
      this.swapSidebar(formSettings);
      this.model.localSaveForm();
      break;
    case "save-form":
      this.serverSaveForm();
      break;
    default:
      console.log("hit newSidebar switch default");
      this.render();
    }
  },

  sidebarClick: function(event){
    console.log('in FormMaster#sidebarClick');
    var $target = $(event.target);
    this.sidebar.parseClick && this.sidebar.parseClick(event);
    this.sidebarValues(event);
  },

    editBoxClick: function(event){
    console.log('in FormMaster#editBoxClick');
    var $target = $(event.target);

    if ($target.is('button')){
      event.preventDefault();

      if ($target.hasClass('delete-button')){
        console.log('deleting element');
        var $form = $(this.model.get('form_text'));

        $form.find('.editing .' + $target.attr('name')).remove();
        this.model.set('form_text', $form.prop('outerHTML'));
        $target.closest('div').remove();
        this.editForm.renderChange();
      } else {
        switch($target.attr('id')){
          case "save-button":
            this.serverSaveForm();
            break;
          case "duplicate-field":
            break;
          case "delete-field":
            this.$el.find('.editing').remove();
            this.removeActiveEdits();
            this.model.localSaveForm();
            this.render();
          case "done-button":
            this.removeActiveEdits();
            this.localSaveForm();
            break;
          default:
          console.log("Sending to editBox view parseClickForm");
          this.editBox.parseClick && this.editBox.parseClick(event);
          this.editBoxValues(event);
        }
      }

    } else if ($(event.target).attr('name') ==='requiredCheckbox'){

      this.requireField(event);

    } else {

      this.editBox.parseClick && this.editBox.parseClick(event);
      this.editBoxValues(event);

    }
  },

  sidebarValues: function(event){
    console.log("sidebarValues triggered with a " + event.type);
    this.sidebar.updateValues && this.sidebar.updateValues(event);
  },

  editBoxValues: function(event){
    console.log("editBoxValues triggered with a " + event.type);
    this.editBox.updateValues && this.editBox.updateValues(event);
    this.positionEditBox($('#edit-box'));
  },

  requireField: function(event){
    event.stopPropagation();
    console.log('in FormMaster#requireField');

    var $target = this.$el.find('.editing');

    if (event.target.checked){
      console.log("adding class required to ");
      console.log($target);
      $target.addClass("required");
    } else {
      $target.removeClass("required");
    }
    this.model.localSaveForm();
  },

	updateEditBox: function(){
		this.editBox.field = this.$el.find('.editing');
		this.$el.find('.edit-box').replaceWith(this.editBox.render().$el.html());
	},

	swapSidebar: function(sidebar){
    console.log('swapping sidebar');
		var $sidebar = this.makeSidebarView(sidebar);
		this.$el.find('.sidebar_window').replaceWith($sidebar);
    this.sidebarReset();
	},

  makeSortable: function(){
    var that = this;
    if (!this.queued){
      this.queued = true;
      $(function(){
        console.log("making fields-list elements draggable");
        that.formDroppable();
        that.addFieldsDraggable();
        that.formFieldsDraggable();
        that.queued = false;
      });
    }
  },

  formDroppable: function(){
    $('form#form-itable').droppable({
      scope: 'newFields',
      tolerance: 'fit',
      drop: function(event, ui){
        console.log('drop successful');
        ui.helper.data('dropped', true);
      }
    });
  },

  addFieldsDraggable: function(){
    var that = this;
    $('#all-fields-sidebar div').each(function(){
      var editView = that.sidebar.makeEditView({target: this});

      $(this).draggable({
        start: function(event, ui){
          that.removeActiveEdits();
          ui.helper.data('dropped', false);
        },

        stop: function(event, ui){
          if (ui.helper.data('dropped')){

            var $newField = ui.helper.clone();
            that.model.addField($newField);
            $newField.removeClass('editing');
            that.editForm.prepForm($newField.parent());
            that.editForm.parseClickForm({target: $newField});

          } else {

            console.log('drop unsuccessful');
            window.setTimeout(function(){
              ui.helper.remove();
            }, 500);
          }
        },

        helper: function(){
          return editView.$seed.clone();
        },

        revert: 'invalid',
        appendTo: "ul.fields-list",
        scope: 'newFields'
      });
    });
  },

  formFieldsDraggable: function(){
    var that = this;
    $('.formEl, .submit-button').draggable({
      start: function(event, ui){
        console.log('.formEl drag started');
        that.removeActiveEdits();
      },

      stop: function(event, ui){
        console.log('.formEl drag stopped');
        that.model.localSaveForm();
        that.editForm.startEditingField(ui.helper);
      },

      containment: 'form#form-itable',
      distance: 3,
      handle: '.move-handle',
      scrollSensitivity: 50,
      snap: ".formEl",
      snapMode: 'outer',
      snapTolerance: 5
    });
  },

  serverSaveForm: function(){
    console.log("in FormMaster#serverSaveForm");
    this.removeActiveEdits();
    this.model.localSaveForm();
    this.model.serverSave();
    this.render();
  },

  removeActiveEdits: function(){
    console.log('removing all editing classes');
    this.$el.find('#form-filter').off().remove();
    this.$el.find('#edit-box').remove();
    var $old = this.$el.find('.editing');
    $old.find('.delete-field').remove();
    $old.removeClass('editing');
  }
});
