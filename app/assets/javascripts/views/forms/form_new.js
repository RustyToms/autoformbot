AFB.Views.FormNew = Backbone.View.extend({
  initialize: function(){
    console.log('FormNew View initialized')
  },

  render: function(){
    this.$el.empty();
    var sidebar = new AFB.Views.FormSidebarInputs()
    this.$el.append(sidebar.render().$el);

    var editForm = new AFB.Views.FormEdit()
    this.$el.append(editForm.render().$el);

    return this;
  }
})