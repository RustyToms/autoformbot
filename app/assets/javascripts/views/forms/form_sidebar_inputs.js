AFB.Views.FormSidebarInputs = Backbone.View.extend({
  events: {
    "click .sidebar button" : "parseClickInputs",
    "click" : "parseClickInputs"
  },

  initialize: function(){
    console.log("initializing FormSidebarInputs view")
    this.parentView = this.options.parentView
    this.$el.empty();
    this.$el.html(JST['forms/inputs']());
  },

  render: function(){
    console.log('rendering FormSidebarInputs');
    return this;
  },

  parseClickInputs: function(event) {
    event.preventDefault();
    console.log("in FormSidebarInputs#parseClickInputs");
    var fieldChoices = {
      "textbox" : "FormSidebarTextbox",
      "checkbox" : "FormSidebarCheckbox",
      "telnum" : "FormSidebarTelnum",
      "dropdown" : "FormSidebarDropdown"
    };

    var selection = $(event.target).data('inputType');
    var newSidebar = new AFB.Views[fieldChoices[selection]]({
      model: this.model
    });
    newSidebar.addField();
    this.parentView.render(newSidebar);
  }
})