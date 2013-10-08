AFB.Views.FormNew = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClick"
  },

  initialize: function(){
    console.log('FormNew View initialized')
  },

  render: function(sidebar){
    this.$el.empty();
    (!sidebar) && (sidebar = new AFB.Views.FormSidebarInputs({
      model: this.model
    }))

    this.$el.append(sidebar.render().$el);

    var editForm = new AFB.Views.FormEdit({
      model: this.model,
    })
    this.$el.append(editForm.render().$el);

    return this;
  },

  parseClick: function(event) {
    var id = $(event.target).attr("id");
    if (id === "title-description") {
      var editTitle = new AFB.Views.FormEditTitle({
        model: this.model
      })

      this.render(editTitle)
    }
  }
})