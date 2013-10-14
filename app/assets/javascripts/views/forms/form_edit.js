AFB.Views.FormEdit = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClickForm",
    "click #save-button" : "serverSaveForm"
  },

  initialize: function(){
    this.parentView = this.options.parentView;
    var that = this;
    console.log('FormEdit View initialized');
    this.listenTo(this.model, 'change', function(){
      that.render();
    });
		this.model.set('form_text', this.parseFields());
		myForm = this.model.get('form_text');
  },

  render: function(){
    console.log("rendering FormEdit view");
    var formText = (this.model.get('form_text'));
		
    if(this.$el.find('.form-edit-box').html()){
      console.log("replacing previous text")
      this.$el.find('.form-edit-box').replaceWith(formText);
    } else {
      console.log("adding formText for the first time")
      this.$el.prepend(formText);
    }

    return this;
  },

  localSaveForm: function(){
    var $form = this.$el.find('.form-edit-box');
    var form = $form.prop('outerHTML');
    this.model.set('form_text', form);
  },

  serverSaveForm: function(){
    var name = this.$el.find('#formName').html();
		var text = this.model.get('form_text')
		myModel = this.model;
		this.model.save({
			name: name, 
			form_text: text,
			fields: this.model.get('fields')
		},{
      success: function(response){
        console.log("save successful");
				console.log(response);
      },
      error: function(response){
        console.log("error");
        console.log(response);
        console.log(response.errors.full_messages)
      }
    });
  },

  parseClickForm: function(event) {
    console.log("in parseClickForm");

    $formEl = $(event.target).closest(".formEl");
    $formEl.addClass("start-editing");
    this.localSaveForm();
    AFB.Views.FormMaster.removeActiveEdits(this.model);

    var sidebarName = $formEl.data("sidebar");
    console.log("new sidebar should be " + sidebarName);
    sidebar = new AFB.Views[sidebarName]({
      model: this.model,
      field: $formEl
    });
    this.parentView.render(sidebar);
  },
	
	parseFields: function(){
		console.log("in FormEdit View parseFields");
		that = this;
		var fields = this.model.get('fields');
		var $form = $(fields.shift());
		
		_.each(fields, function(field) {
			console.log("field is");
			console.log(field);
			$form.append($(field));	
		});
		console.log ("form from parseFields is " + $form.get(0));

		return $form.prop("outerHTML");
	}
});
