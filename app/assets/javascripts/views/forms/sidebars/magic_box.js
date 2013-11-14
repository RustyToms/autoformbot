AFB.Views.MagicBox = Backbone.View.extend({
  $seed: $(JST['forms/fields/magic_box']()),

  addField: function(){
    this.model.addField(this.$seed);
  },

  render: function(){
    console.log("rendering FormSidebarMagicBox");
    this.$el.html(JST['forms/sidebars/magic_box']({
    }));

    if (this.field){
      this.$field = $(this.field);
      this.removeShell();
    }
    return this;
  },

  parseClick: function(event){
    console.log("in MagicBox#parseClick");
    if (event.target.id === 'add-HTML'){
      this.$field = $(this.field || $('#form-itable .editing'));
      var $code = this.$el.find('#magic-box-code');
      console.log("adding this to the magic box: " + $code.val());
      this.$field.find('#magic-box').append($($code.val()));
      $code.val('');
      this.removeShell();
      this.model.localSaveForm();
    }
  },

  removeShell: function(){
    if (this.$field.children('#tamper-seal').length){
      var $magicBox = this.$field.find('#magic-box');
      if ($magicBox.html() && $magicBox.clone().html().trim()){
        $magicBox.removeAttr('style');
        this.$field.children('#tamper-seal').remove();
      }
    }
  }
});