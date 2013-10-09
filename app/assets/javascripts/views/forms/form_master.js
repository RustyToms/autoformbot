AFB.Views.FormMaster = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClickForm",
    "click #all-fields-sidebar" : "parseClickInputs"
  },

  initialize: function(){
    that = this;
    console.log('FormMaster View initialized');
    this.listenTo(AFB.formCollection, 'change', function(){
      that.render();
    });
  },

  render: function(sidebar){
    console.log('rendering FormMaster view');
    this.$el.empty();
    this.makeSidebarView(sidebar);
    console.log(this.sidebar);
    this.$el.append(this.sidebar.render().$el);

    this.editForm && this.editForm.remove();
    this.editForm = new AFB.Views.FormEdit({
      model: this.model
    })
    this.$el.append(this.editForm.render().$el);
  },

  makeSidebarView: function(sidebar){
    this.sidebar && this.sidebar.remove();
    if (sidebar){
      this.sidebar = sidebar;
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
    newSidebar.render();
  }
})