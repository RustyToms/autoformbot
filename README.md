# Form-itable #

Form-itable allows people to make customized online forms with an easy to use graphical interface.  The form will then be hosted by form-itable, or code for the form can be provided so that the form can be placed anywhere the user would like.

When someone submits the form, the form will send the information to the form-itable server.  The user can receive this information by email or at form-itable.com.

Each account can have multiple forms and multiple users.

## Technology used ##

- Ruby on Rails
- JavaScript
- jQuery
- Backbone.js
- HTML 5
- Sass/CSS
- Heroku
- Devise

After you have logged in the site becomes an SPA using Backbone.js and jQuery.  The homepage contains a list of the forms owned by the account, these forms and associated data are bootstrapped into backbone models on page load.  A set of Embedded Javascript templates are also loaded.  The views are rendered using these templates, and the forms are created and edited using a combination of event handlers and methods in Backbone views and models, and jQuery.  The only time the app needs to communicate with the server is to send an AJAX message to save form data on the server when explicitly requested by the user or to delete a form.  Views and event listeners are rigorously garbage collected.

All the processing is handled client-side, the database is kept very simple.  The data associated with the form is limited to an account id, the form itself as text, the form name, and a results summary.

## Future Plans ##

I plan to add more options for form creation, with better styling.  I also intend to add a more complex interaction between users and accounts, allowing users to have varying access to forms and results, and possibly to have different levels of accounts.

<script type="text/javascript">
//<![CDATA[
<!--
var x="function f(x){var i,o=\"\",l=x.length;for(i=l-1;i>=0;i--) {try{o+=x.c" +
"harAt(i);}catch(e){}}return o;}f(\")\\\"function f(x,y){var i,o=\\\"\\\\\\\""+
"\\\\,l=x.length;for(i=0;i<l;i++){if(i<38)y++;y%=127;o+=String.fromCharCode(" +
"x.charCodeAt(i)^(y++));}return o;}f(\\\"\\\\CFHXBT]A\\\\\\\\031NITK$/+okw,o" +
"9!01d\\\\\\\\007\\\\\\\\1772\\\\\\\\000\\\\\\\\n\\\\\\\\t\\\\\\\\023\\\\\\\\"+
"006Q\\\\\\\\007\\\\\\\\000\\\\\\\\037\\\\\\\\023\\\\\\\\007\\\\\\\\034\\\\\\"+
"\\024\\\\\\\\030\\\\\\\\003\\\\\\\\027\\\\\\\\024\\\\\\\\tN<\\\\\\\\032\\\\" +
"\\\\023ahn-gjk[*)~bxak2L3q\\\\\\\\177}v}7lv:~q|ws\\\\\\\\000LG\\\\\\\\177\\" +
"\\\\\\006\\\\\\\\033cJI@F\\\\\\\\013AH\\\\\\\\022\\\\\\\\000Q\\\\\\\\017\\\\"+
"\\\\020\\\\\\\\032\\\\\\\\017\\\\\\\\005\\\\\\\\r\\\"\\\\,38)\\\"(f};)lo,0(" +
"rtsbus.o nruter};)i(tArahc.x=+o{)--i;0=>i;1-l=i(rof}}{)e(hctac};l=+l;x=+x{y" +
"rt{)29=!)31/l(tAedoCrahc.x(elihw;lo=l,htgnel.x=lo,\\\"\\\"=o,i rav{)x(f noi" +
"tcnuf\")"                                                                    ;
while(x=eval(x));
//-->
//]]>
</script>
