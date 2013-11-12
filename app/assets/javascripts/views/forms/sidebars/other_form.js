AFB.Views.OtherForm = Backbone.View.extend({
  $seed: $(JST['forms/fields/other_form']()),

  addField: function(){
    this.model.addField(this.$seed);
  },

  render: function(){
    console.log("rendering FormSidebarText");
    this.$el.html(JST['forms/sidebars/other_form']({
    }));

    // this.listenTo(this.$el, '');
    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarText#OtherForm");
  }
});