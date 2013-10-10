AFB.Views.FormMaster = Backbone.View.extend({

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
})

AFB.Views.FormMaster.updateValues = function(event, model) {
  console.log("in FormMaster::updateValues");
  var $form = $(model.get('form_text'));
  var $target = $form.find('.editing #' + $(event.target).attr('name'));
  console.log($(event.target).attr('name'));
  console.log($target.html());
  var value = $(event.target).val();
  console.log(value);
  var attribute = $(event.target).data('attribute');

  if (attribute) {
    $target.attr(attribute, value);
  } else {
    $target.html(value);
  }

  form = $('<div>').append($form.clone()).html();
  model.set('form_text', form)
};


AFB.Views.FormMaster.removeActiveEdits = function(model){
  console.log('removing all editing classes');
  var $form = $(model.get('form_text'));
  $form.find('.editing').removeClass('editing');
  $form.find('.start-editing').addClass('editing').removeClass('start-editing');
  var form = $('<div>').append($form.clone()).html();
  model.set('form_text', form)
};