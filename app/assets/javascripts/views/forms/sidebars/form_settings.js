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
    var $title = $('li[data-sidebar="FormEditTitle"]').first();
    var centered = [];
    if ($(event.target).attr('name') === 'redirect-url'){

      console.log("setting new redirect url to " + $(event.target).val());
      this.model.set({'url': $(event.target).val()}, {silent: true});

    } else if ($(event.target).attr('name')=='formName'){

      centered[0] = this.isCentered($title);
      this.model.updateValues(event);
      this.model.set({name: $(event.target).val()}, {silent: true});
      centered[0] && AFB.Routers.FormRouter.centerEl($title);

    } else {

      if ($(event.target).attr('data-css') === 'width'){
        console.log('data-css width detected');
        centered[0] = this.isCentered($title);
        centered[1] = this.isCentered($('.form').first().
          children('.submit-button'));
      }

      this.model.updateValues(event);
      this.parentView.editForm.render();
      this.parentView.makeSortable();

      $title = $('li[data-sidebar="FormEditTitle"]').first();
      var width = $title.offsetParent().outerWidth();

      if (centered[0] === true) {
        $title.css('left', 0); // make sure $title is the proper width
        AFB.Routers.FormRouter.centerEl($title);
      }
      if (centered[1] === true) {
        AFB.Routers.FormRouter.centerEl($('.form').first().
          children('.submit-button'));
      }
    }
    this.model.localSaveForm();
  },

  isCentered: function($el) {
    var calc = $el.outerWidth() + parseInt($el.css('left'), 10) * 2;
    var width = $el.offsetParent().outerWidth();
    return ((width - 2) < calc && calc < (width + 2));
  },


});