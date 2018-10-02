# stottle-auth0-ngrx

Auth0 WebAuth with NGRX

As an anonymous user I want to login so that i can use the applications features
Given i am an anonymous user
When I click on a link that requires authentication
Then the login form is displayed

Given I was the on home page before I entered valid credentials
When i am authenticated
Then i am navigated to home page
And users' profile retrieved
And realtime service is started

As an anonymous user I want to be informed when my login attempt fails so that i can react
