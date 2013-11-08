AFB.Views.FormSidebarText = Backbone.View.extend({
  seed: (JST['forms/fields/text']()),

  addField: function(){
    this.model.addField(this.seed);
  },

  render: function(){
    console.log("rendering FormSidebarText");
    this.$el.html(JST['forms/sidebars/text_options']({
      $text: $(this.field || this.seed).find('.text-content')
    }));

    var $form = $(this.model.get('form_text'));
    var fontFamily = $form.find('.editing span').css('font-family');
    var $fontFamilies = this.$el.find('font-family-option');
    $fontFamilies.each(function($option){
      if ($option.css('font-family') === fontFamily){
        $option.attr('selected', 'true');
      }
    });

    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarText#updateValues");
    if ($(event.target).attr('name')=== 'textbox-label' ){
      var name = 'results[' + event.target.value + ']';
      this.model.updateAttribute('.editing .textbox', 'name', name);
    }
    this.model.updateValues(event);
  }
});