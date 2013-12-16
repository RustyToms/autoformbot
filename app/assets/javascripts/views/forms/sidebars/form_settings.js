AFB.Views.FormSettings = Backbone.View.extend({
  initialize: function(){
    console.log('Initializing FormSettings view');
  },

  render: function(){
    console.log('rendering FormSettings');
    this.$el = $(JST['forms/sidebars/form_settings']({
      $form: $(this.model.get('form_text')).find('form.form').first(),
      url: this.model.get('url')
    }));
    return this;
  },

  updateValues: function(event){
    console.log('in FormSettings#updateValues');
    var centered, $title;
    if ($(event.target).attr('name') === 'redirect-url'){
      console.log("setting new redirect url to " + $(event.target).val());
      this.model.set({'url': $(event.target).val()}, {silent: true});
    } else {
      if ($(event.target).attr('data-css') === 'width'){
        console.log('data-css width detected');
        $title = $('li[data-sidebar="FormEditTitle"]').first();
        var formWidth = $title.offsetParent().outerWidth();
        var calc = $title.outerWidth() + parseInt($title.css('left'), 10) * 2;
        centered = ((formWidth - 2) < calc && calc < (formWidth + 2));
      }

      this.model.updateValues(event);
      this.parentView.editForm.render();
      this.parentView.makeSortable();

      if (centered === true) {
        $title = $('li[data-sidebar="FormEditTitle"]').first();
        var width = $title.offsetParent().outerWidth();
        $title.css('left', 0); // make sure $title is the proper width
        $title.css('left', (width - $title.outerWidth()) / 2);
      }
    }
  }
});