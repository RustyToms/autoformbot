#Form-itable#

Form-itable allows people to make customized online forms with an easy to use graphical interface.  The form will then be hosted by Form-itable.com, or code for the form will be provided so that the form can be placed anywhere the user would like.

When someone submits the form, the form will send the information to the form-itable server.  The user can receive this information by email or at form-itable.com.  Each account can have multiple forms and multiple users.

This app is under development.  The database may be reset at any time and major features may come and go.

##Technology used##

  - Ruby on Rails
  - JavaScript
  - jQuery
  - Backbone.js
  - HTML 5
  - Sass/Compass
  - Heroku
  - Devise
  - Figaro
  - New Relic

After you have logged in the site becomes an SPA using Backbone.js and jQuery.  The homepage contains thumbnails forms owned by the account, these forms and associated data are bootstrapped into backbone models on page load.  A set of Embedded Javascript templates are also loaded.  The views are rendered using these templates, and the forms are created and edited using a combination of event handlers and methods in Backbone views and models, and jQuery.

The only time the app needs to communicate with the server is to send an AJAX request to save form data upon certain events after the form is modified, to delete a form, or to retrieve results.  Views and event listeners are garbage collected so that the app may be used extensively without a page refresh.  Most of the processing is handled client-side, the database is kept very simple.

<jonathantoms5@gmail.com>
