AFB.Views.FormResults = Backbone.View.extend({
  render: function(){
    console.log("FormResults#render");
    this.$el.empty()
    this.$el.html('<h1 class="page-title" >Fetching Results for "' +
      this.model.get('name') + '"...</h1>');
    this.fetchResults();
    return this;
  },

  renderResults: function(){
    console.log("FormResults#renderResults");
    console.log(this.results);
    console.log(this.resultsTable);
    console.log(this.headers);
    this.$el.empty
    this.$el.html(JST['forms/results']({
      headers: this.headers,
      resultsTable: this.resultsTable
    }));
  },

  fetchResults: function(){
    console.log('FormResults#fetchResults');
    var that = this;
    this.results = new AFB.Collections.Results();
    this.results.fetch({
      data: {form_id: this.model.get('id')},
      success: function(collection, response, options){
        console.log("in FormRouter#formResults success");
        that.model.set('results', collection);
        that.parseResults();
        that.renderResults();
      },
      error: function(collection, response, options){
        console.log("in FormRouter#formResults error");
        console.log(collection);
        console.log(response);
        console.log(options);
      }
    });
  },

  parseResults: function(){
    console.log('FormResults#parseResults');
    console.log(this.results.length);
    var that = this;
    this.headers = {};
    this.resultsTable = [];
    this.results.each(function(result){
      var hash = $.parseJSON(result.get('result'));
      console.log(hash);
      result.set('result', hash);
      _.each(hash, function(answer, question){
        that.headers[question] = question;
      });
      that.resultsTable.push(hash);
      console.log(that.resultsTable);
    });
  }
});