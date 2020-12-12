function CreateAccountViewModel() {
   var self = this;

   self.firstName = ko.observable("").extend({
      required: true,
      minLength: 2,      
   });

   self.emailAddress = ko.observable("").extend({
      required: true,
      email: true
   });

   self.subscriptionType = ko.observable("standard");
   self.hasBeenStarted = ko.observable(true);
   self.hasBeenContinued = ko.observable(false);
   self.hasBeenSubmitted = ko.observable(false);
   
   self.handleContinue = function() {
      //Check for errors      
      var errors = ko.validation.group(self);
      if (errors().length > 0) {
         errors.showAllMessages();
         return;
      }
      
      self.hasBeenStarted(false);
      self.hasBeenContinued(true);
      self.hasBeenSubmitted(false);
    }

   self.handleSubmit = function() {
      //Check for errors      
      var errors = ko.validation.group(self);
      if (errors().length > 0) {
         errors.showAllMessages();
         return;
      }

      self.hasBeenStarted(false);
      self.hasBeenContinued(false);
      self.hasBeenSubmitted(true);
    }    
 };
 
 const knockoutApp = document.querySelector("#knockout-app");
 ko.applyBindings(new CreateAccountViewModel(), knockoutApp);