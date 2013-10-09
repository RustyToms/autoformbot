AFB.Views.FormMaster = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClick"
  },

  initialize: function(){
    that = this;
    console.log('FormMaster View initialized');
    this.listenTo(this.model, 'change', function(){
      that.render();
    });
  },

  render: function(sidebar){
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