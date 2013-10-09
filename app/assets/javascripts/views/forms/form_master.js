AFB.Views.FormMaster = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClickForm",
    "click #all-fields-sidebar" : "parseClickInputs"
  },

  initialize: function(){
    console.log('FormMaster View initialized');
  },

  render: function(newSidebar){
    console.log('rendering FormMaster view');
    this.$el.empty();
    this.makeSidebarView(newSidebar);
    console.log(this.sidebar);
    this.$el.append(this.sidebar.render().$el);

    this.editForm && this.editForm.remove();
    this.editForm = new AFB.Views.FormEdit({
      model: this.model
    })
    this.$el.append(this.editForm.render().$el);
    console.log("el should be:");
    console.log(this.$el.html());
    return this;
  },

  makeSidebarView: function(newSidebar){
    this.sidebar && this.sidebar.remove();
    if (newSidebar){
      this.sidebar = newSidebar;
    } else {
      this.sidebar = new AFB.Views.FormSidebarInputs({
        model: this.model
      });
    }
  },

  parseClickForm: function(event) {
    console.log("in parseClickForm");
    event.preventDefault();
    var id = $(event.target).closest(".formEl").attr("id");
    if (id === "title-description") {
      var editTitle = new AFB.Views.FormEditTitle({
        model: this.model
      })

      this.render(editTitle)
    }
  },

  parseClickInputs: function(event) {
    event.preventDefault();
    console.log("in parseClickInputs");
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
    this.render(newSidebar);
  }
})