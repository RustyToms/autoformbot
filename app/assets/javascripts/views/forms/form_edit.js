AFB.Views.FormEdit = Backbone.View.extend({
  events: {
    "mouseenter .field" : "onHover",
    "mouseleave .field" : "onBlur",
    "click .field" : "focused",
    "focusout .field" : "unfocused"
  },

  initialize: function(){
    console.log('FormEdit View initialized');
  },

  render: function(){
    this.$el.empty();
    this.$el.html(JST["forms/edit_form"]);

    return this;
  },

  onHover: function (event) {
    console.log(event.target);
    console.log("onHover");
    $(event.target).removeClass("reset");
  },

  onBlur: function(event) {
    console.log(event.target);
    console.log("onBlur");
    if(!$(event.target).hasClass("focused")) {
      $(event.target).addClass("reset");
    }
  },

  focused: function (event) {
    console.log(event.target);
    console.log("focused");

    $(event.target).removeClass("reset");
    $(event.target).addClass("focused");
  },

  unfocused: function(event){
    console.log(event.target);
    console.log("unfocused");

    $(event.target).addClass("reset");
    $(event.target).removeClass("focused");
  },

  cleanUp: function(){
    this.undelegateEvents();
  }
})