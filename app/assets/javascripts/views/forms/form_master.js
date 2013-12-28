AFB.Views.FormMaster = Backbone.View.extend({
  events: {
    "click #save-form" : "serverSaveForm",
    "click #form-settings-button" : "formSettings",
    "click #edit-box" : "editBoxClick",
    "keyup #edit-box" : "editBoxValues",
    "change #edit-box select" : "editBoxValues",
  },

  render: function(newSidebar, formView){
    console.log('rendering FormMaster view');
    this.$el.empty();
    this.$el.append(JST['forms/masterview_seed']());
    this.renderForm();

    console.log('--- End of FormMaster view #render ---');
    return this;
  },

  renderForm: function(){
    this.removeView(this.editForm);
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
    this.addFieldsDraggable();
    this.makeSortable();
  },

  makeEditBox: function(newEditBox){
    console.log('FormMaster#makeEditBox');
    var that = this;
    this.removeView(this.editBox);
    this.editBox = newEditBox;
    this.editBox.parentView = that;
    this.formRouter.childViews.push(this.editBox);

    var $editBox = $(JST['forms/editbox_seed']({
      $field: newEditBox.field
    }));
    $editBox.find('#customizations').html(this.editBox.render().$el);
    $('.fi-30x').append($editBox);

    if (newEditBox.field.data("sidebar") === 'FormEditTitle'){
      $editBox.find('#delete-field').remove();
    }

    $(function(){
      console.log('document ready, positioning editbox and window');
      $editBox.tabs({
        activate: function(){
          AFB.Routers.FormRouter.positionWindow(
            $editBox.add(that.editBox.field));
        }
      });
      that.positionEditBox($editBox);
      AFB.Routers.FormRouter.positionWindow(newEditBox.field.add($editBox));
      that.fieldDuplicate();
    });
  },

  positionEditBox: function($editBox){
    console.log('FormMaster#positionEditBox');
    var $field = $('.editing').first();
    var editingForm = $field.is('form');

    if (editingForm){
      $field = $field.find('li[data-sidebar="FormEditTitle"]').first();
      var $saveButton = $editBox.find('#save-button').detach();
      $editBox.find('.edit-box-button, a[href="#size-position"]').remove();
      $editBox.find('.sidebar h2').first().append($saveButton);
      $saveButton.css('margin-left', '20px');
    }

    $editBox.position({
      my: 'center top',
      at: 'center bottom+20',
      of: $field
    });

    if (editingForm){
      AFB.Routers.FormRouter.positionWindow($field.add($editBox));
    }

  },

  fieldDuplicate: function(){
    console.log('FormMaster#fieldDuplicate');
    var that = this;
    var $copyButton = $('#duplicate-field');

    $copyButton.draggable({
      start: function(){
        console.log('fieldDuplicate dragging started');
        that.$el.find('#form-filter').remove();
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
        return that.editBox.field.clone();
      },
      appendTo: "ul.fields-list",
      containment: '.fi-30x form',
      cursorAt: { top: 3, left: -8},
      scope: 'newFields',
      scrollSensitivity: 50
    });
  },

  formSettings: function(event){
    console.log('FormMaster#formSettings');
    event.stopPropagation();
    this.removeActiveEdits();
    var formSettings = new AFB.Views.FormSettings({
      model: this.model
    });
    formSettings.field = $('.outer-wrapper form').first();
    formSettings.field.addClass('editing');

    this.makeEditBox(formSettings);
    this.editForm.clickToStopEditing();
    AFB.Routers.FormRouter.positionWindow($('#edit-box'));
    $('.move-handle').css('z-index', '5');
  },

  editBoxClick: function(event){
    console.log('in FormMaster#editBoxClick');
    var $target = $(event.target);

    if ($target.is('button')){

      this.parseButtonClick(event);

    } else if ($target.attr('name') === '.requiredCheckbox'){

      this.requireField(event);

    } else if ($target.is(':checkbox')){

      if ($target.is(':checked')){
        $target.val($target.data('checked'));
      } else {
        $target.val($target.data('unchecked'));
      }
      this.model.updateValues(event);

    } else if ($target.hasClass('ui-tabs-anchor')){

      var that = this;
      window.setTimeout(function(){
        that.positionEditBox($('#edit-box'));
      }, 0);

    } else {

      this.editBox.parseClick && this.editBox.parseClick(event);
      this.editBoxValues(event);

    }
  },

  parseButtonClick: function(event) {
    console.log('FormMaster#parseButtonClick');
    event.preventDefault();
    event.stopPropagation();
    var $target = $(event.target);

    if ($target.hasClass('delete-button')){

      this.deleteOption($target);

    } else {

      switch($target.attr('id')){
        case "save-button":
          this.serverSaveForm();
          break;
        case "duplicate-field":
          break;
        case "delete-field":
          this.editBox.field.remove();
          this.removeActiveEdits();
          this.model.localSaveForm();
          this.render();
          break;
        case "done-button":
          this.removeActiveEdits();
          this.model.localSaveForm();
          break;
        case "pull-front":
          $(".fi-30x form ul").append(this.editBox.field);
          AFB.Routers.FormRouter.myFlash("Field moved to the front");
          this.model.localSaveForm();
          break;
        case "push-back":
          $(".fi-30x form ul").prepend(this.editBox.field);
          AFB.Routers.FormRouter.myFlash("Field moved to the back");
          this.model.localSaveForm();
          break;
        default:
          if ($target.hasClass('alignment')){
            this.editForm.alignField(
              this.editBox.field, $target.data('align'));
            this.positionEditBox($('#edit-box'));
            this.model.localSaveForm();
            AFB.Routers.FormRouter.positionWindow($('#edit-box').
              add(this.editBox.field));
            break;
          }
          console.log("Sending to editBox view parseClickForm");
          this.editBox.parseClick && this.editBox.parseClick(event);
          this.editBoxValues(event);
      }
    }
  },

  deleteOption: function($target){
    console.log('deleting element');
    var that = this;
    var $form = $('.fi-30x form').first();

    $form.find('.editing ' + $target.attr('name')).remove();
    $target.closest('div').remove();
    this.editBox.updateField();

    $('#edit-box').remove();
    this.makeEditBox(this.editBox);

    $(function(){
      console.log('document ready, positioning editbox');
      that.positionEditBox($('#edit-box'));
    });
  },

  editBoxValues: function(event){
    console.log("editBoxValues triggered with a " + event.type);

    if ($(event.target).attr('name') === '') {
      this.model.updateValues(event);
    } else {
      this.editBox.updateValues && this.editBox.updateValues(event);
    }
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
      $target.find('input, textarea, select').attr('required', 'required');
    } else {
      $target.removeClass("required");
      $target.find('input, textarea, select').removeAttr('required');
    }
    this.model.localSaveForm();
  },

	updateEditBox: function(event){
    console.log("FormMaster#updateEditBox***********");
    var $field = this.$el.find('.editing').first();
    $field.length && (this.editBox.field = $field);
    this.$el.find('#edit-box #customizations').html(this.editBox.render().$el);

	},

  makeSortable: function(){
    var that = this;
    if (!this.queued){
      this.queued = true;
      $(function(){
        console.log("document ready, making fields-list elements draggable");
        that.formDroppable();
        that.formFieldsDraggable();
        that.queued = false;

        if (that.mustPrepForm){
          that.editForm.prepForm($('.fi-30x form'));
          that.mustPrepForm = false;
        }
      });
    }
  },

  formDroppable: function(){
    $('form.form').first().droppable({
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

    $('#all-fields-sidebar div').draggable({
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
        console.log(this);
        return $(JST['forms/fields/' + $(this).closest('div').data('fieldTemplate')]());
      },

      appendTo: "ul.fields-list",
      distance: 0,
      revert: 'invalid',
      scope: 'newFields',
      scrollSensitivity: 50,
      snap: ".formEl",
      snapMode: 'outer',
      snapTolerance: 5
    });
  },

  formFieldsDraggable: function(){
    var that = this;
    $('.formEl, .submit-button').draggable({
      start: function(event, ui){
        console.log('.formEl drag started');
        that.removeActiveEdits();
        ui.helper.css('right', 'auto');
      },

      stop: function(event, ui){
        console.log('.formEl drag stopped');
        that.model.localSaveForm();
        if (ui.helper.hasClass('magicBox')){
          ui.helper.find(':focus').blur();
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
    this.model.standardEditRemoval(this.$el.find('.fi-30x').first());
    this.removeView(this.editBox);
  },

  removeView: function(view){
    if (view){
      var i = _.indexOf(this.formRouter.childViews, view);
      this.formRouter.childViews.splice(i, 1);
      view.remove();
    }
  }
});