AFB.Routers.FormRouter = Backbone.Router.extend({
  initialize: function($rootEl){
    console.log('formrouter initialized');
    this.$rootEl = $rootEl;
    this.$seedEl = $("<section class='body group'></section>");
    this.bind("all", this.saveModel);
  },

  routes: {
    '' : "index",
    'index' : "index",
    'forms/new' : "formNew",
    'forms/:id/:name' : 'specificForm',
    "forms/:id" : "specificForm",
    ":name" : "catchAll"
  },

  catchAll: function(){
    Backbone.history.navigate("", {trigger: true});
  },

  specificForm: function(id, name) {
    console.log("FormRouter#specificForm id#" + id + " : " + name);
    var form = AFB.formCollection.get(id);
    var routes = {
      'edit': this.formEdit,
      'results': this.formResults,
      'code': this.formCode
    };

    if(!form){
      AFB.Routers.FormRouter.myFlash("Sorry, couldn't find that form");
      Backbone.history.navigate("", {trigger: true});
      return;
    }

    this.cleanRootEl();
    this.view && this.view.remove();

    if (name){
      var route = routes[name];

      if(route){
        route.call(this, form);
      } else {
        this.catchAll();
      }

    } else {
      this.formShow(form);
    }
    window.scrollTo(0,0);
  },

  index: function(){
    console.log("in FormRouter#index");
    this.cleanRootEl();
    this.view && this.view.remove();

    this.view = new AFB.Views.FormIndex({
      el: this.$seedEl
    });
    this.$rootEl.append(this.view.render().$el);

  },

  formNew: function(){
    console.log("In FormRouter#formNew");
    this.cleanRootEl();
    this.$rootEl.html(this.$seedEl.clone());
    this.setUpModel();
  },

  setUpModel: function(){
    console.log("setting up form model");
		var that = this;
    var $form = $(JST["forms/new_form_seed"]());
    this.model = new AFB.Models.Form({
      account_id: window.ACCOUNT_ID,
      name: "Untitled Form",
			form_text: $form.prop('outerHTML'),
      notify_by: "{}",
      emails: "{}"
    });

    AFB.formCollection.add(this.model);

		this.model.save({},{
			success: function(response, model) {
        console.log("form_id is " + that.model.get('id'));
        AFB.Routers.FormRouter.myFlash("New Form created");
        that.model.updateFormAction();
        Backbone.history.navigate("forms/" + that.model.get('id') +
          "/edit", {trigger: true});
        $('#form-settings-button').trigger('click');
      }
		});
  },

  formShow: function(form) {
    console.log("in FormRouter#formShow for form #" + form.id);
    this.view = new AFB.Views.FormShow({
        model: form,
        el: JST['forms/form_wrapper']()
      });
    this.$rootEl.append(this.view.render().$el);
  },

  formResults: function(form) {
    console.log("in FormRouter#formResults for form #" + form.id);
    this.view = new AFB.Views.FormResults({
        model: form
      });
    this.$rootEl.append(this.view.render().$el);
  },

  formEdit: function(form) {
    console.log('in FormRouter#formEdit for form #' + form.id);
    // update updated_at so that it is properly sorted when index is called
    form.save();
    this.$rootEl.append(this.$seedEl);
    this.view = new AFB.Views.FormMaster({
      model: form,
      el: this.$seedEl,
    });
    this.view.formRouter = this;
    form.formRouter = this;
    this.view.render();
  },

  formCode: function(form){
    console.log('in FormRouter#formCode for form #' + form.id);
    this.view = new AFB.Views.FormCode({
      model: form,
      el: this.$seedEl.clone()
    });
    this.$rootEl.append(this.view.render().$el);
  },

  saveModel: function(){
    if (this.openModel){
      console.log("in FormRouter, saving last open model");
      this.openModel.serverSave();
      delete this.openModel;
    }
  },

  cleanRootEl: function(){
    _.each(this.childViews, function(view){
      console.log('removing childView');
      view.remove();
    });
    this.childViews = [];
    this.$rootEl.empty();
    this.$rootEl.unbind();
    this.$rootEl.off();
    this.$rootEl.undelegate();

    this.initialize(this.$rootEl);
  },

  modelDoesntExist: function(model){

    if(!model){
      AFB.Routers.FormRouter.myFlash("Sorry, couldn't find that form");
      Backbone.history.navigate("", {trigger: true});
    }
    return !model;
  }
});

AFB.Routers.FormRouter.matchSize = function ($match, $target){
  var width = $target.outerWidth();
  $match.css('width', width);
  var height = $target.outerHeight();
  $match.css('height', height);
  console.log('width and height are ' + width + " and " + height);
};

AFB.Routers.FormRouter.myFlash = function(msg){
  console.log("myFlash message is " + msg);
  $('.backbone-flash-msgs').prepend(JST['my_flash']({
    msg: msg
  }));
  window.setTimeout(function(){
    $('.backbone-flash-msgs .my-flash').last().remove();
    $('.backbone-flash-msgs br').last().remove();
  }, 3000);
};

AFB.Routers.FormRouter.positionWindow = function($targets){
  console.log('in AFB.Routers.FormRouter.positionWindow');
  // find 1/2 combined dims of target group, find 1/2 dims of window,
  // scroll to closest offset minus the difference.
  $(function(){
    var targetHeight = 30;
    var targetWidth = 0;
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var topPos = $targets.first().offset().top;
    var leftPos = $targets.first().offset().left;

    $targets.each(function(){
      var offset = $(this).offset();
      targetHeight += $(this).outerHeight();
      if ($(this).outerWidth() > targetWidth){
        targetWidth = $(this).outerWidth();
      }
      if (offset.top < topPos) {
        topPos = offset.top;
      }
      if (offset.left < leftPos) {
        leftPos = offset.left;
      }
    });

    var topDiff = windowHeight - targetHeight;
    var leftDiff = windowWidth - targetWidth;

    $(window).scrollTop(topPos - (
      targetHeight > windowHeight - 100 ? 100 : (topDiff / 2)
      )).scrollLeft(leftPos - (leftDiff / 2));
  });
};

AFB.Routers.FormRouter.centerEl = function($el){
  var width = $el.offsetParent().outerWidth();
  $el.css({
    left: (width - $el.outerWidth()) / 2,
    right: 'auto'
  });
}