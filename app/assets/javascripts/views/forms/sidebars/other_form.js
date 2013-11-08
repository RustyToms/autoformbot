AFB.Views.OtherForm = Backbone.View.extend({
  seed: ("<div style='min-height: 40px; min-width: 40px;" +
    "background-color: #F0E2CA'><p>Paste<br><br>Here</p></div>"),

  addField: function(){
    this.model.addField(this.seed);
  },

  render: function(){
    console.log("rendering FormSidebarText");
    this.$el.html(JST['forms/sidebars/other_form']({
    }));

    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarText#OtherForm");
  }
});