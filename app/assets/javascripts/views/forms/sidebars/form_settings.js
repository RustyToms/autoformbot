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
    var $title, $submit;
    var centered = [[$title, false], [$submit, false]];
    if ($(event.target).attr('name') === 'redirect-url'){
      console.log("setting new redirect url to " + $(event.target).val());
      this.model.set({'url': $(event.target).val()}, {silent: true});
    } else {
      if ($(event.target).attr('data-css') === 'width'){
        console.log('data-css width detected');
        centered[0][0] = $('li[data-sidebar="FormEditTitle"]').first();
        centered[1][0] = $('.form').first().children('.submit-button');
        var formWidth = centered[0][0].offsetParent().outerWidth();
        $.each(centered, function(i, el){
          console.log(el);
          var calc = el[0].outerWidth() + parseInt(el[0].css('left'), 10) * 2;
          el[1] = ((formWidth - 2) < calc && calc < (formWidth + 2));
        });
      }

      this.model.updateValues(event);
      this.parentView.editForm.render();
      this.parentView.makeSortable();

      $title = $('li[data-sidebar="FormEditTitle"]').first();
      var width = $title.offsetParent().outerWidth();

      if (centered[0][1] === true) {
        $title.css('left', 0); // make sure $title is the proper width
        $title.css('left', (width - $title.outerWidth()) / 2);
      }
      if (centered[1][1] === true) {
        $submit = $('.form').first().children('.submit-button');
        $submit.css('left', (width - $submit.outerWidth()) / 2);
      }
    }
  }
});