AFB.Models.Form = Backbone.Model.extend ({
	fields: [],
	
	createForm: function(){
		this.set('fields', [$('<form class="form-edit-box" ></form>').get(0)]);
	}, 
	
	addTitle: function(){
		var fields = this.get('fields');
		fields.push(JST["forms/new_form_seed"]());
		this.set('fields', fields);
			// 	
		// var title = new AFB.Models.Field({
		// 	tag: "<h2></h2>",
		// 	innerHtml: "Untitled Form",
		// 	fieldAttr: [
		// 		function(){ this.attr('id', "formName")}
		// 		],
		// 	kids: []
		// });
		// 
		// var description = new AFB.Models.Field({
		// 	tag: "<p></p>",
		// 	innerHtml: "Click here to change or delete the form description",
		// 	fieldAttr: [
		// 		function(){ this.attr('id', "formDescription")}
		// 		],
		// 	kids: []
		// });
		// 
		// var titleField = new AFB.Models.Field({
		// 	tag: "<span></span>",
		// 	innerHtml: "",
		// 	fieldAttr: [
		// 	function(){this.addClass("formEl editing")},
		// 	function(){this.attr('id', 'title-description')},
		// 	function(){this.data('sidebar', 'FormEditTitle')}
		// 		],
		// 	kids: [title, description]
		// });
		// var fields = this.get('fields');
		// fields.push(titleField)
		// this.set('fields', fields);
	}

});