AFB.Views.FormSidebarInputs = Backbone.View.extend({
  events: {
    "click #all-fields-sidebar button" : "parseClickInputs"
  },

  initialize: function(){
    console.log("initializing FormSidebarInputs view")
    this.parentView = this.options.parentView
    AFB.removeActiveEdits(this.model);
  },

  render: function(){
    this.$el.empty();
    this.$el.html(JST['forms/inputs']())
    return this
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
    this.parentView.render(newSidebar);
  }
})