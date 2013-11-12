AFB.Views.OtherForm = Backbone.View.extend({
  $seed: $("<div style='min-height: 40px; min-width: 40px;" +
    "background-color: #F0E2CA'><p><br><br></p></div>"),

  addField: function(){
    this.model.addField(this.$seed);
  },

  render: function(){
    console.log("rendering FormSidebarText");
    this.$el.html(JST['forms/sidebars/other_form']({
    }));

    this.listenTo(this.$el, '')
    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarText#OtherForm");
  }
});