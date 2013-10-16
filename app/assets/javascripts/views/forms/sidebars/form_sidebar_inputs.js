AFB.Views.FormSidebarInputs = Backbone.View.extend({
  initialize: function(){
    console.log("initializing FormSidebarInputs view");
    this.parentView = this.options.parentView;
    this.$el = $(JST['forms/sidebars/inputs']());
  },

  render: function(){
    console.log('rendering FormSidebarInputs');
    return this;
  },

  parseClick: function(event) {
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
      "text" : "FormSidebarText"
    };

    var selection = $(event.target).closest('button').data('inputType');
    if(!selection){
      console.log("no target")
      return
    }
    var newSidebar = new AFB.Views[fieldChoices[selection]]({
      model: this.model
    });
    newSidebar.addField();
    this.parentView.render(newSidebar);
  }
})