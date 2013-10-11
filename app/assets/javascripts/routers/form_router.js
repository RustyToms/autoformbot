AFB.Routers.FormRouter = Backbone.Router.extend({
  initialize: function($rootEl){
    console.log('formrouter initialized');
    this.$rootEl = $rootEl;
    this.$seedEl = $("<section class='body group'></section>")
  },

  routes: {
    '' : "index",
    'index' : "index",
    'forms/new' : "formNew",
    "forms/:id" : "formShow",
    "forms/:id/edit" : "formEdit"
  },

  index: function(){
    console.log("in FormRouter#index");
    this.cleanRootEl();
    // this.view && this.view.remove();
    this.view = new AFB.Views.FormIndex({
      collection: AFB.formCollection,
      el: this.$seedEl
    })

    this.$rootEl.append(this.view.render().$el);

  },

  formNew: function(){
    this.cleanRootEl();
    console.log("In FormRouter#formNew");
    this.model = new AFB.Models.Form();
    this.setUpModel()
    AFB.formCollection.add(this.model);
    // this.view && this.view.remove();
    this.view = new AFB.Views.FormMaster({
      model: this.model,
      el: this.$seedEl
    });
    this.$rootEl.append(this.view.render().$el);
  },

  setUpModel: function(){
    var html = JST["forms/new_form_seed"]();
    this.model.set({
      account_id: window.ACCOUNT_ID,
      form_text: html,
      name: "Untitled Form"
    });
  },

  formShow: function(id) {
    this.cleanRootEl();
    // this.view && this.view.remove();
    console.log("in FormRouter#formShow for form #" + id);
    console.log(AFB.formCollection.get(id))
    this.view = showFormView = new AFB.Views.FormShow({
      model: AFB.formCollection.get(id),
      el: this.$seedEl
    })
    this.$rootEl.append(this.view.render().$el);
  },

  formEdit: function(id) {
    this.cleanRootEl();
    console.log("in FormRouter#formEdit for form #" + id);
    // this.view && this.view.remove();
    this.view = new AFB.Views.FormMaster({
      model: AFB.formCollection.get(id),
      el: this.$seedEl
    });
    this.$rootEl.append(this.view.render().$el);
  },

  cleanRootEl: function(){
    this.$rootEl.empty();
    this.$rootEl.unbind();
    this.$rootEl.off();
    this.$rootEl.undelegate();
    console.log("$rootEl is");
    console.log(this.$rootEl.prop('outerHTML'));
    this.initialize(this.$rootEl);
  }
})