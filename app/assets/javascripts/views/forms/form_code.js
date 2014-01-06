AFB.Views.FormCode = Backbone.View.extend({

  render: function(){
    // console.log("FormCode#render");
    this.$el.css('text-align', 'center');
    this.$el.html(JST['forms/form_code']({
      form: this.model
    }));
    this.getFormHTML();
    return this;
  },

  getFormHTML: function(){
    var that = this;
    $.ajax({
      url: 'http://' + document.location.host + '/forms/' +
        that.model.get('id'),
      context: that,
      success: function(formHTML){
        that.$el.find('.formcode-textarea').val(formHTML);
      },
      error: function(){
        // console.log("FormCode#getFormHTML failed");
      }
    });
  }

});
