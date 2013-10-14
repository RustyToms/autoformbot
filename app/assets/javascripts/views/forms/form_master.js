AFB.Views.FormMaster = Backbone.View.extend({
  events: {
    "click .sidebar_header" : "newSidebar",
    "click .sidebar" : "sidebarClick",
    "keyup .sidebar" : "sidebarValues"
  },

  initialize: function(){
    console.log('FormMaster View initialized');
    this.$sidebarEl = $(JST['forms/sidebars/sidebar_seed']());
    this.$formEditEl = $(JST["forms/edit_form"]());
  },

  render: function(newSidebar){
    console.log('rendering FormMaster view');
    this.$el.empty();
    this.$el.append(this.makeSidebarView(newSidebar));

    this.editForm && this.editForm.remove();
    this.editForm = new AFB.Views.FormEdit({
      parentView: this,
      model: this.model,
      el: this.$formEditEl
    })
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
      AFB.Views.FormMaster.removeActiveEdits(this.model);
      this.sidebar = new AFB.Views.FormSidebarInputs({
        parentView: this,
        model: this.model,
      });
    }

    return this.$sidebarEl.append(this.sidebar.render().$el);
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
    this.sidebar.parseClick && this.sidebar.parseClick(event);
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

})

AFB.Views.FormMaster.updateValues = function(event, model) {
  console.log("in FormMaster::updateValues");
  var $form = $(model.get('form_text'));
  var $target = $form.find('.editing .' + $(event.target).attr('name'));
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