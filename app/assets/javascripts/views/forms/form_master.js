AFB.Views.FormMaster = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClickForm"
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
      this.sidebar = new AFB.Views.FormSidebarInputs({
        parentView: this,
        model: this.model,
      });
    }
  },

  parseClickForm: function(event) {
    console.log("in parseClickForm");
    var id = $(event.target).closest(".formEl").attr("id");
    if (id === "title-description") {
      var editTitle = new AFB.Views.FormEditTitle({
        model: this.model
      })

      this.render(editTitle)
    }
  }

})