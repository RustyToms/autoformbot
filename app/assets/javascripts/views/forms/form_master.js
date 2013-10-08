AFB.Views.FormMaster = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClick"
  },

  initialize: function(){
    console.log('FormMaster View initialized');
  },

  render: function(sidebar){
    this.$el.empty();
    (!sidebar) && (sidebar = new AFB.Views.FormSidebarInputs({
      model: this.model
    }))

    this.$el.append(sidebar.render().$el);

    var editForm = new AFB.Views.FormEdit({
      model: this.model
    })
    this.$el.append(editForm.render().$el);

    return this;
  },

  parseClick: function(event) {
    console.log("in parseClick");
    var id = $(event.target).closest(".formEl").attr("id");
    if (id === "title-description") {
      var editTitle = new AFB.Views.FormEditTitle({
        model: this.model
      })

      this.render(editTitle)
    }
  }
})