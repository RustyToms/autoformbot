AFB.Views.FormSidebarInputs = Backbone.View.extend({
  initialize: function(){
    console.log("initializing FormSidebarInputs view");
    this.$el = $(JST['forms/sidebars/inputs']());
  },

  render: function(){
    console.log('rendering FormSidebarInputs');
    return this;
  },

  parseClick: function(event) {
    var newSidebar = this.makeSidebarView(event);
    newSidebar.addField();
    this.parentView.render(newSidebar);
  },

  makeSidebarView: function(event) {
    console.log("in FormSidebarInputs#makeSidebarView");
    var that = this;
    event.preventDefault();
    console.log("in FormSidebarInputs#parseClickInputs");
    var fieldChoices = {
      "textbox" : "FormSidebarTextbox",
      "checkbox" : "FormSidebarCheckbox",
      "telnum" : "FormSidebarTelnum",
      "dropdown" : "FormSidebarDropdown",
      "textarea" : "FormSidebarTextarea",
      "numbox" : "FormSidebarNumbox",
      "radio" : "FormSidebarRadio",
      "text" : "FormSidebarText",
      "otherForm": "OtherForm"
    };

    var selection = $(event.target).closest('button').data('inputType');
    if(!selection){
      console.log("no target");
      return;
    }
    return (new AFB.Views[fieldChoices[selection]]({
      model: that.model
    }));
  }
});