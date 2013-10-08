AFB.Views.FormEdit = Backbone.View.extend({
  events: {
    // "mouseenter .field" : "onHover",
    // "mouseleave .field" : "onBlur",
    "click" : "resetFocus",
    "click #title-description" : "focused",
    "focusout #title-description" : "unfocused",
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
  resetFocus: function(event){
    console.log("resetting focus");
    this.$lastFocused &&
    ($(event.target).closest('.formEl').attr('id') != this.$lastFocused.attr('id')) &&
    this.$lastFocused.addClass("reset");
    this.$lastFocused = $(event.target).closest('.formEl');
    console.log(this.$lastFocused);
  },

  focused: function (event) {
    console.log(event.target);
    console.log("focused");
    $(event.target).closest('.formEl').removeClass("reset");
    // $(event.target).addClass("in-use");
  },

  unfocused: function(event){
    console.log(event.target);
    console.log("unfocused");
    // $(event.target).removeClass("focused");
    $(event.target).addClass("reset");
  },

  updateModel: function(event){
    event.preventDefault();
    console.log("in updateModel")
    $field = $(event.target)
    console.log(event.target)
    if ($field.attr('name') === "form[name]") {
      this.model.set('name', $field.val());
    }

  },

  cleanUp: function(){
    this.undelegateEvents();
  }
})


//  sync model on save!