AFB.Views.FormMaster = Backbone.View.extend({
  events: {
    "click .sidebar_header" : "newSidebar",
    "click .sidebar" : "sidebarClick",
    "click #edit-box" : "editBoxClick",
    "keyup .sidebar" : "sidebarValues",
    "keyup #edit-box" : "editBoxValues",
    "change .sidebar :checked, .sidebar select" : "sidebarValues",
    "change #edit-box :checked, #edit-box select" : "editBoxValues",
  },

  initialize: function(){
    console.log('FormMaster View initialized');
my = this;
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
    this.editBox.parentView = that;
    this.formRouter.childViews.push(this.editBox);

    var $editBox = $(JST['forms/editbox_seed']({
      $field: newEditBox.field
    }));
    $editBox.find('#customizations').html(this.editBox.render().$el);
    $('.fi-30x').append($editBox);
    if ($('#all-fields-sidebar').length === 0){
      this.swapSidebar();
    }

    $(function(){
      $editBox.tabs();
      that.positionEditBox($editBox);
      AFB.Routers.FormRouter.positionWindow(newEditBox.field.add($editBox));
      that.fieldDuplicate();
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
  },

  fieldDuplicate: function(){
    console.log('FormMaster#fieldDuplicate');
    var that = this;
    var $copyButton = $('#duplicate-field');

    $copyButton.draggable({
      start: function(){
        console.log('fieldDuplicate dragging started');
        that.$el.find('#form-filter').off().remove();
        that.$el.find('#edit-box').css('display', 'none');
      },
      stop: function(event, ui){
        var newField = ui.helper.clone();
        that.$el.find('ul.fields-list').append(newField);
        that.model.localSaveForm();
        that.removeActiveEdits();
        that.editForm.prepForm(newField);
      },
      helper: function(){
        return that.$el.find('.editing').clone();
      },
      appendTo: "ul.fields-list",
      containment: '.fi-30x form',
      cursorAt: { top: 3, left: -8},
      scope: 'newFields',
      scrollSensitivity: 50
    });
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
    var that = this;
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

        $(function(){
          that.positionEditBox($('#edit-box'));
        });

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
            this.model.localSaveForm();
            break;
          case "pull-front":
            $(".fi-30x form ul").append($('.fi-30x .editing'));
            AFB.Routers.FormRouter.myFlash("Field moved to the front");
            this.model.localSaveForm();
            break;
            case "push-back":
              $(".fi-30x form ul").prepend($('.fi-30x .editing'));
              AFB.Routers.FormRouter.myFlash("Field moved to the back");
              this.model.localSaveForm();
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
    if ($(event.target).attr('name') === 'editing'){
      this.model.updateValues(event);
    } else {
      this.editBox.updateValues && this.editBox.updateValues(event);
    }
    //this.editForm.prepForm($('.editing'));
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

	updateEditBox: function(event){
    var $field = this.$el.find('.editing');
    if ($field.length){
      this.editBox.field = $field;
      this.$el.find('.edit-box').replaceWith(this.editBox.render().$el.html());
    } else {
      this.editForm.startEditingField($(event.target));
    }
	},

	swapSidebar: function(sidebar){
    console.log('swapping sidebar');
		var $sidebar = this.makeSidebarView(sidebar);
		this.$el.find('.sidebar_window').replaceWith($sidebar);
    this.sidebarReset();
    this.addFieldsDraggable();
	},

  makeSortable: function(){
    var that = this;
    if (!this.queued){
      this.queued = true;
      $(function(){
        console.log("making fields-list elements draggable");
        that.formDroppable();
        that.formFieldsDraggable();
        that.queued = false;
        if (that.sidebar.inputsNotDraggable){
          that.addFieldsDraggable();
          that.sidebar.inputsNotDraggable = false;
        }
        if (that.mustPrepForm){
          that.editForm.prepForm($('.fi-30x form'));
          that.mustPrepForm = false;
        }
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
        scope: 'newFields',
        scrollSensitivity: 50,
        snap: ".formEl",
        snapMode: 'outer',
        snapTolerance: 5
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
        if (ui.helper.hasClass('magicBox')){
          $(':focus').blur();
          ui.helper.trigger('click');
        } else {
          that.render();
        }
      },

      containment: '.fi-30x form',
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
    this.editBox && this.editBox.remove();
    var $old = this.$el.find('.editing');
    $old.find('.delete-field').remove();
    $old.removeClass('editing');
  }
});