AFB.Views.FormEditTitle = Backbone.View.extend({

  render: function(){
    // console.log("rendering FormEditTitle view");
    this.$el.html(JST['forms/sidebars/edit_title']({
      title: $('.editing').first().find('.formName').text()
    }));
    return this;
  },

  updateValues: function(event){
    // console.log("in FormEditTitle#updateValues");
    if ( $(this.field).find(':focus').length < 1){
      this.model.updateValues(event);
    }
    this.model.set({name: $(event.target).val()}, {silent: true});
  }
});
