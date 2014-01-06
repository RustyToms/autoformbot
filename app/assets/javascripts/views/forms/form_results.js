AFB.Views.FormResults = Backbone.View.extend({
  events: {
    "click .results-table": "cellClick"
  },

  render: function(){
    // console.log("FormResults#render");
    this.$el.empty();
    this.$el.html('<h1 class="page-title" >Fetching Results for "' +
      this.model.get('name') + '"...</h1>');
    this.fetchResults();
    return this;
  },

  renderResults: function(){
    // console.log("FormResults#renderResults");
    this.$el.empty;
    this.$el.html(JST['forms/results']({
      name: this.model.get('name'),
      headers: this.headers,
      resultsTable: this.resultsTable
    }));
    AFB.Routers.FormRouter.matchSize(this.$el.find('.results-box'),
      this.$el.find('.results-table'));
  },

  fetchResults: function(){
    // console.log('FormResults#fetchResults');
    var that = this;
    this.results = new AFB.Collections.Results();
    this.results.fetch({
      data: {form_id: this.model.get('id')},
      success: function(collection, response, options){
        // console.log("in FormRouter#formResults success");
        that.model.set('results', collection);
        that.parseResults();
        that.renderResults();
      },
      error: function(collection, response, options){
        // console.log("in FormRouter#formResults error");
        // console.log(collection);
        // console.log(response);
        // console.log(options);
      }
    });
  },

  parseResults: function(){
    // console.log('FormResults#parseResults');
    var that = this;
    this.headers = {};
    this.resultsTable = [];
    this.results.each(function(result){
      var hash = $.parseJSON(result.get('result'));
      var lastChecked = that.model.get('results_checked_at');
      // console.log(hash);
      result.set('result', hash);
      _.each(hash, function(answer, question){
        that.headers[question] = question;
      });
      that.resultsTable.push({
        'hash': hash,
        'new': (!lastChecked || result.get('created_at') > lastChecked)
      });
    });
  },

  cellClick: function(event){
    // console.log('FormResults#cellClick');
    var $cell = $(event.target);
    if ($cell.is('td')){
      if ($cell.closest('.results-table').find('td.clicked:first-child').
          length < 1){
        $cell.closest('.results-table').find('.clicked').
          removeClass('clicked');
      }
      $cell.siblings('td').andSelf().toggleClass('clicked');
    } else if ($cell.is('th')  && !$cell.is('th:first-child')){
      if ($cell.siblings('.clicked').andSelf('.clicked').length < 1){
        $cell.closest('.results-table').find('.clicked').
          removeClass('clicked');
      }
      var n = $cell.prevAll().length + 1;
      $cell.closest('.results-table').find("td:nth-child(" + n + ")")
        .toggleClass('clicked');
      $cell.toggleClass('clicked');
    }
  }
});
