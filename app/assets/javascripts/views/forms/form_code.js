AFB.Views.FormCode = Backbone.View.extend({
  events: {
    "click .hosting-choice": "hostChoice"
  },

  render: function(){
    console.log("FormCode#render");
    this.$el.css('text-align', 'center');
    this.$el.html(JST['forms/form_code']({
      form: this.model
    }));

    return this;
  },

  hostChoice: function(event){
    console.log("FormCode#hostChoice");
    var that = this;
    choice = this.$el.find('.host-option:checked').val();

    if (choice === 'link'){

      this.$el.find('.link-info').css('display', 'block');
      this.$el.find('.code-info').css('display', 'none');

      $(function(){
        that.$el.find('iframe').contents().find('body').
          html($(that.$el.find('#link-code').val()).attr('target', '_blank'));
      });

    } else if (choice === 'code'){

      this.$el.find('.link-info').css('display', 'none');
      this.$el.find('.code-info').css('display', 'block');

    }
  }

});