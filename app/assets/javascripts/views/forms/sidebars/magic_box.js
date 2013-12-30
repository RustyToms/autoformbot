AFB.Views.MagicBox = Backbone.View.extend({
  $seed: $(JST['forms/fields/magic_box']()),

  eventNames: 'mouseup dragend onPaste paste click drop',

  eventSelector: 'form.form .magicBox.editing',

  addField: function(){
    this.model.addField(this.$seed);
  },

  render: function(){
    var that = this;
    console.log("rendering FormSidebarMagicBox");
    this.$el.html(JST['forms/sidebars/magic_box']({
      $field: $(that.field).find('.magicbox-div')
    }));
    this.removeShell();

    if ($(this.field).children('.tamper-seal').length){
      //prevent listeners from piling up
      this.parentView.$el.off(this.eventNames, this.eventSelector);
      this.parentView.$el.on(this.eventNames, this.eventSelector, (function(){
        that.removeShell();
      }));
    }

    return this;
  },

  parseClick: function(event){
    console.log("in MagicBox#parseClick");
    if (event.target.id === 'add-HTML'){
      var $code = this.$el.find('#magic-box-code');
      console.log("adding this to the magic box: " + $code.val());

      $(this.field).find('.magicbox-div').html($($code.val()));
      this.removeShell();
      this.model.localSaveForm();
    }
  },

  removeShell: function(){
    console.log("checking to see if content added to magic box");
    var that = this;
    this.parentView.positionEditBox(this.$el);
    window.setTimeout(function(){
      var $magicBox = $(that.field).children('.tamper-seal');
      if ($magicBox.length){
        if ($magicBox.html() && $magicBox.clone().html().trim()){
          that.parentView.$el.off(that.eventNames, that.eventSelector);
          $magicBox.removeClass('tamper-seal').removeAttr('style');
          that.model.localSaveForm();
        }
      }
    }, 1);
  }
});
