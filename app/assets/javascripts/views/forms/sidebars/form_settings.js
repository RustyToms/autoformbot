AFB.Views.FormSettings = Backbone.View.extend({
  initialize: function(){
    // console.log('Initializing FormSettings view');
  },

  render: function(){
    // console.log('rendering FormSettings');
    var notify = this.model.get('notify_by')['email'];

    this.$el = $(JST['forms/sidebars/form_settings']({
      $form: $(this.model.get('form_text')).find('form.form').first(),
      url: this.model.get('url'),
      notify: notify
    }));

    this.renderEmails();
    this.showOrHideEmails(notify);
    return this;
  },

  renderEmails: function(){
    // console.log('FormSettings#renderEmails');
    var emails = this.model.get('emails');
    emails[0] = (emails[0] ? emails[0] : "");
    var $emailAddresses = this.$el.find('.email-addresses');
    $.each(emails, function(i, email){
      $emailAddresses.append(JST['forms/sidebars/email_address']({
        email: email
      }));
    });
  },

  showOrHideEmails: function(show){
    // console.log('FormSettings#showOrHideEmails ' + show);
    if(show === true){
      this.$el.find('.email-addresses').show();
    } else {
      this.$el.find('.email-addresses').hide();
    }
  },

  updateValues: function(event){
    // console.log('in FormSettings#updateValues');
    var $title = $('li[data-sidebar="FormEditTitle"]').first();
    var centered = [];

    if ($(event.target).attr('name') === 'redirect-url'){

      // console.log("setting new redirect url to " + $(event.target).val());
      this.model.set({'url': $(event.target).val()}, {silent: true});

    } else if ($(event.target).hasClass('email-notify')){

      this.emailValues(event);
      return;

    } else if ($(event.target).attr('name') ==='.formName'){

      centered[0] = this.isCentered($title);
      this.model.updateValues(event);
      this.model.set({name: $(event.target).val()}, {silent: true});
      centered[0] && AFB.Routers.FormRouter.centerEl($title);

    } else {

      if ($(event.target).attr('data-css') === 'width'){
        // console.log('data-css width detected');
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

  emailValues: function(event){
    // console.log('FormSettings#emailValues');
    if ($(event.target).hasClass('delete-address') && event.type === 'click'){

      var $emailAddresses = $(event.target).closest('.email-addresses');
      $(event.target).closest('.email-address').remove();
      this.updateEmails($emailAddresses);

    } else if ($(event.target).hasClass('add-address') &&
      event.type === 'click'){

      $(event.target).parent().append(JST['forms/sidebars/email_address']());

    } else if ($(event.target).attr('id') === "email-notification"){

      var notify_by = this.model.get('notify_by') || {};

      if (notify_by['email']){
        delete notify_by['email'];
      }

      if (event.target.checked){
        notify_by['email'] = true;
      }

      this.showOrHideEmails(event.target.checked);
      this.model.set('notify_by', notify_by);

    } else {

      this.updateEmails($(event.target).closest('.email-addresses'));

    }
  },

  updateEmails: function($emailAddresses){
    // console.log('FormSettings#updateEmails');
    var emails = {};
    $emailAddresses.find('input.email-notify').each(function(index){
      if ($(this).val()) {
        emails[_.size(emails)] = $(this).val();
      }
    });
    this.model.set('emails', emails);
  }
});
