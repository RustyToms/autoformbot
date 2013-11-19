AFB.Views.FormMaster = Backbone.View.extend({
  events: {
    "click .sidebar_header" : "newSidebar",
    "click .sidebar" : "sidebarClick",
    "keyup .sidebar" : "sidebarValues",
    "change .sidebar :checked, .sidebar select" : "sidebarValues"
  },

  initialize: function(){
    console.log('FormMaster View initialized');
// AFB.Routers.FormRouter.loop = 0;
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
      // that.on("change", ".sidebar", that.sidebarValues);
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

    // that.off("change", ".sidebar");
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

    // $(function(){
    //   that.on("change", ".sidebar", that.sidebarValues);
    // });

		return $sidebar;
  },

  makeEditBox: function(newEditBox){
    console.log('FormMaster#makeEditBox');
    var that = this;
    this.editBox && this.editBox.remove();
    this.editBox = newEditBox;
    var $editBox = $(JST['forms/editbox_seed']()).
      prepend(this.editBox.render().$el);
    $('#form-itable .fields-list').append($editBox);

    $(function(){
      that.positionEditBox($editBox);
    });


  },

  positionEditBox: function($editBox){
    console.log('positioning the new editBox');
    var $field = this.$el.find('.editing');
    var x = parseInt($field.css('left'), 10) + ($field.outerWidth() / 2);
    var left = x - ($editBox.outerWidth() / 2);
    var top = parseInt($field.css('top'), 10) + $field.outerHeight() + 20;
myTop = top;
myLeft = left;
myEditBox = $editBox;
    $editBox.css({
      'left': (left + 'px'),
      'top': (top + 'px')
    });
    console.log('editBox top is ' + $editBox.css('top'));
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

    if ($target.hasClass('delete-button')){
      console.log('deleting element');
      var $form = $(this.model.get('form_text'));

      $form.find('.editing .' + $target.attr('name')).remove();
      this.model.set('form_text', $form.prop('outerHTML'));
      $target.closest('div').remove();
      this.editForm.renderChange();

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
        that.editForm.startEditingField(ui.helper);
        console.log('.formEl is dragging');
      },

      stop: function(event, ui){
        console.log('.formEl drag stopped');
        that.model.localSaveForm();
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
    this.$el.find('#form-filter').remove();
    this.$el.find('#edit-box').remove();
    var $old = this.$el.find('.editing');
    $old.find('.delete-field').remove();
    $old.removeClass('editing');
  }
});
