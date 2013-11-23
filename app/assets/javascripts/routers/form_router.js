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
    "forms/:id" : "formShow",
    "forms/:id/edit" : "formEdit",
    "forms/:id/results" : "formResults"
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
    this.model = new AFB.Models.Form();
    this.setUpModel();
  },

  setUpModel: function(){
    console.log("setting up form model");
		var that = this;
    var $form = $(JST["forms/new_form_seed"]());
    this.model.set({
      account_id: window.ACCOUNT_ID,
      name: "Untitled Form",
			form_text: $form.prop('outerHTML')
    });

    AFB.formCollection.add(this.model);

		this.model.save({},{
			success: function(response, model) {
        console.log("form_id is " + that.model.get('id'));
        AFB.Routers.FormRouter.myFlash("New Form created");
        that.model.updateFormAction();
        Backbone.history.navigate("forms/" + that.model.get('id') +
          "/edit", {trigger: true});
      }
		});
  },

  formShow: function(id) {
    console.log("in FormRouter#formShow for form #" + id);
		var showModel = AFB.formCollection.get(id);
    var View = AFB.Views.FormShow;
    this.cleanRootEl();
    this.view && this.view.remove();
    console.log(this.$rootEl.prop('outerHTML'));
    this.view = new View({
        model: showModel,
        el: JST['forms/form_wrapper']()
      });
    this.$rootEl.append(this.view.render().$el);
    window.scrollTo(0,0);
  },

  formResults: function(id) {
    console.log("in FormRouter#formResults for form #" + id);
    var form = AFB.formCollection.get(id);
    results = new AFB.Collections.Results();
    results.fetch({
      data: {form_id: form.get('id')},
      success: function(collection, response, options){
        console.log("in FormRouter#formResults success");
        console.log(collection);
        console.log(response);
        console.log(options);
        form.set('results', collection);
      },
      error: function(collection, response, options){
        console.log("in FormRouter#formResults error");
        console.log(collection);
        console.log(response);
        console.log(options);
      }
    });
    console.log(results);
    // var View = AFB.Views.FormShow;
    // this.cleanRootEl();
    // this.view && this.view.remove();
    // console.log(this.$rootEl.prop('outerHTML'));
    // this.view = new View({
    //     model: showModel,
    //     el: JST['forms/form_wrapper']()
    //   });
    // this.$rootEl.append(this.view.render().$el);
    // window.scrollTo(0,0);
  },

  formEdit: function(id) {
    console.log('in FormRouter#formEdit for form #' + id);
		var editModel = AFB.formCollection.get(id);
    // update updated_at so that it is properly sorted when index is called
    editModel.save();
    this.cleanRootEl();
    this.formMaster(editModel);
  },

  formMaster: function(model){
    this.view && this.view.remove();
    this.$rootEl.append(this.$seedEl);
    this.view = new AFB.Views.FormMaster({
      model: model,
      el: this.$seedEl,
    });
    this.view.formRouter = this;
    model.formRouter = this;
    this.view.render();
    window.scrollTo(0,0);
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
  }
});

AFB.Routers.FormRouter.fitContent = function(matchSelect, targetSelect){
  $(function(){
    var $match = $(matchSelect);
    var $target = $(targetSelect);
    AFB.Routers.FormRouter.matchSize($match, $target);
  });
};

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
    var topPos = windowHeight;
    var leftPos = windowWidth;

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

    $(window).scrollTop(topPos - (topDiff / 2)).
      scrollLeft(leftPos - (leftDiff / 2));

  });
};