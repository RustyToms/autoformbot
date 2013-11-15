AFB.Views.MagicBox = Backbone.View.extend({
  $seed: $(JST['forms/fields/magic_box']()),

  eventNames: 'mouseup dragend onPaste paste click drop',

  eventSelector: '#form-itable .magicBox.editing',

  addField: function(){
    this.model.addField(this.$seed);
  },

  render: function(){
    var that = this;
    console.log("rendering FormSidebarMagicBox");
    this.$el.html(JST['forms/sidebars/magic_box']({
    }));

    if (!this.field || $(this.field).children('#tamper-seal').length){
      //prevent listeners from piling up
      this.parentView.$el.off(this.eventNames, this.eventSelector);
      this.parentView.$el.on(this.eventNames, this.eventSelector, (function(){
        that.$field = $(that.field || $('#form-itable .editing'));
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

      this.$field = $(this.field || $('#form-itable .editing'));
      this.$field.find('#magic-box').append($($code.val()));
      $code.val('');
      this.removeShell();
      this.model.localSaveForm();
    }
  },

  removeShell: function(){
    console.log("checking to see if content added to magic box");
    var that = this;
    window.setTimeout(function(){
      if (that.$field.children('#tamper-seal').length){
        var $magicBox = that.$field.find('#magic-box');

        if ($magicBox.html() && $magicBox.clone().html().trim()){
          that.parentView.$el.off(that.eventNames, that.eventSelector);
          $magicBox.removeAttr('style');
          that.$field.children('#tamper-seal').remove();
          that.model.localSaveForm();
        }
      }
    }, 1);
  }
});