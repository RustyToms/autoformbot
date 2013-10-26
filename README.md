#Form-itable#

Form-itable allows people to make customized online forms with an easy to use graphical interface.  The form will then be hosted by form-itable, or code for the form can be provided so that the form can be placed anywhere the user would like.

When someone submits the form, the form will send the information to the form-itable server.  The user can receive this information by email or at form-itable.com.  Each account can have multiple forms and multiple users.

This app is under development and is optimized for the Chrome browser.  The database may be reset at any time and major features may come and go. It is being created to practice the technologies I am learning.

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

After you have logged in the site becomes an SPA using Backbone.js and jQuery.  The homepage contains a list of the forms owned by the account, these forms and associated data are bootstrapped into backbone models on page load.  A set of Embedded Javascript templates are also loaded.  The views are rendered using these templates, and the forms are created and edited using a combination of event handlers and methods in Backbone views and models, and jQuery.  The only time the app needs to communicate with the server is to send an AJAX message to save form data on the server when explicitly requested by the user or to delete a form.  Views and event listeners are rigorously garbage collected.

All the processing is handled client-side, the database is kept very simple.  The data associated with the form is limited to an account id, the form itself as text, the form name, and a results summary.

##Future Plans##

I plan to add more options for form creation, with better styling.  I also intend to add a more complex interaction between users and accounts, allowing users to have varying access to forms and results, and possibly to have different levels of accounts.

<jonathantoms5@gmail.com>
