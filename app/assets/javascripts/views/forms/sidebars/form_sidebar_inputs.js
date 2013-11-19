AFB.Views.FormSidebarInputs = Backbone.View.extend({
  initialize: function(){
    console.log("initializing FormSidebarInputs view");
    this.$el = $(JST['forms/sidebars/inputs']());
  },

  render: function(){
    console.log('rendering FormSidebarInputs');
    return this;
  },

  makeEditView: function(event) {
    console.log("in FormSidebarInputs#makeEditView");
    var that = this;
    var fieldChoices = {
      "textbox" : "FormSidebarTextbox",
      "checkbox" : "FormSidebarCheckbox",
      "telnum" : "FormSidebarTelnum",
      "dropdown" : "FormSidebarDropdown",
      "textarea" : "FormSidebarTextarea",
      "numbox" : "FormSidebarNumbox",
      "radio" : "FormSidebarRadio",
      "text" : "FormSidebarText",
      "magicBox": "MagicBox"
    };

    var selection = $(event.target).closest('div').data('inputType');
    if(!selection){
      console.log("no target");
      return;
    }
    return (new AFB.Views[fieldChoices[selection]]({
      model: that.model
    }));
  }
});