AFB.Views.FormMaster = Backbone.View.extend({
  events: {
    // "click .formEl" : "parseClickForm"
  },

  initialize: function(){
    console.log('FormMaster View initialized');
  },

  render: function(newSidebar){
    console.log('rendering FormMaster view');
    this.$el.empty();
    this.makeSidebarView(newSidebar);
    this.$el.append(this.sidebar.render().$el);

    this.editForm && this.editForm.remove();
    this.editForm = new AFB.Views.FormEdit({
      parentView: this,
      model: this.model
    })
    this.$el.append(this.editForm.render().$el);

    return this;
  },

  makeSidebarView: function(newSidebar){
    this.sidebar && this.sidebar.remove();

    if (newSidebar){
      this.sidebar = newSidebar;

    } else {
      AFB.Views.FormMaster.removeActiveEdits(this.model);
      this.sidebar = new AFB.Views.FormSidebarInputs({
        parentView: this,
        model: this.model,
      });
    }
  }


  // parseClickForm: function(event) {
  //   console.log("in parseClickForm");
  //   $formEl = $(event.target).closest(".formEl");
  //
  //   var id = $formEl.attr("id");
  //   if (id === "title-description") {
  //     var editTitle = new AFB.Views.FormEditTitle({
  //       model: this.model
  //     })
  //
  //     this.render(editTitle)
  //   }
  // }
})

AFB.Views.FormMaster.updateValues = function(event, model) {
  var $form = $(model.get('form_text'));
  var $target = $form.find('.editing #' + $(event.target).attr('name'));
  var value = $(event.target).val()
  var attribute = $(event.target).data('attribute')

  if (attribute) {
    $target.attr(attribute, value);
  } else {
    $target.html(value);
  }

  form = $('<div>').append($form.clone()).html();
  model.set('form_text', form)
};


AFB.Views.FormMaster.removeActiveEdits = function(model){
  var $form = $(model.get('form_text'));
  $form.find('.editing').removeClass('editing')
  var form = $('<div>').append($form.clone()).html();
  model.set('form_text', form)
};