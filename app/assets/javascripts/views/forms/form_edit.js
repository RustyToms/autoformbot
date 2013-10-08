AFB.Views.FormEdit = Backbone.View.extend({
  events: {
    // "mouseenter .field" : "onHover",
    // "mouseleave .field" : "onBlur",
    // "click" : "resetFocus",
    "click .title-description" : "focused",
    "focusout .title-description" : "unfocused",
    "change" : "updateModel"
  },

  initialize: function(){
    console.log('FormEdit View initialized');

  },

  render: function(){
    this.$el.empty();
    this.$el.html(JST["forms/edit_form"]);

    return this;
  },

  // onHover: function (event) {
  //   console.log(event.target);
  //   console.log("onHover");
  //   $(event.target).removeClass("reset");
  // },
  //
  // onBlur: function(event) {
  //   console.log(event.target);
  //   console.log("onBlur");
  //   if(!$(event.target).hasClass("focused")) {
  //     $(event.target).addClass("reset");
  //   }
  // },
  //
  // resetFocus: function(){
  //   console.log("resetting focus");
  //   $target = $('.in-use');
  //   $target.addClass("reset");
  //   $target.removeClass("in-use");
  // },

  focused: function (event) {
    console.log(event.target);
    console.log("focused");

    $(event.target).removeClass("reset");
    // $(event.target).addClass("in-use");
  },

  unfocused: function(event){
    console.log(event.target);
    console.log("unfocused");
    // $(event.target).removeClass("focused");
    $(event.target).addClass("reset");
    this.$('form').submit();
  },

  updateModel: function(event){
    event.preventDefault();
    console.log("in updateModel")
    console.log(event.target)
  },

  cleanUp: function(){
    this.undelegateEvents();
  }
})