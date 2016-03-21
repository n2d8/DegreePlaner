angular.module('NoteApp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  Parse.initialize("6iAeyjtyOY8hGMUkqqfMU992MiZMOVLYDZ86f9SP","KWVnkXwzB70g5OiMibA5o1ksezofzjnHj2BpQZua");

  $scope.saveNote = function(title, content) {
    /*var PeopleObject = Parse.Object.extend("PeopleObject");
    var person = new PeopleObject();
    person.set("firstname", firstname);
    person.set("lastname", lastname);
    person.save(null, {}); */
    var NoteObject = Parse.Object.extend("NoteObject");
    var note = new NoteObject;
    note.set("title", title);
    note.set("content", content);
    note.save(null, {});
  };

  $scope.getNote = function(params) {
    var NoteObject = Parse.Object.extend("NoteObject");
    var data = new Parse.Query(NoteObject);
    $scope.notes = [];

    if (params !== undefined) {
      if(params.title !== undefined) {
        data.equalTo("title",params.title);
      }
      if(params.content !== undefined) {
        data.equalTo("content", params.content);
      }
    }

    data.find({
      success: function(results) {
        alert("Successfully returned " + results.length + " notes");
        for (i in results) {
          $scope.noterino = [];
          $scope.noterino[i] = results[i];
          $scope.notes[i] = {
            Title: $scope.noterino[i].get("title"),
            Content: $scope.noterino[i].get("content"),
          };

          console.log($scope.notes[i]);

          
          var object = results[i];
          console.log(object.id + " - " + object.get("title") + " - " + object.get("content"));
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    })
    /* var PeopleObject = Parse.Object.extend("PeopleObject");
    var query = new Parse.Query(PeopleObject);



    if (params !== undefined){
      if (params.lastname !== undefined) {
        query.equalTo("lastname", params.lastname);
      }
      if (params.firstname !== undefined) {
        query.equalTo("firstname", params.firstname);
      }
    }

    query.find({
      success: function(results) {
          alert("Successfully returned " + results.length + " people");
          for(var i = 0; i < results.length; i++) {
            var object = results[i];
            console.log(object.id + " - " + object.get("firstname") + " " + object.get("lastname"));
          }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    }) */
  };

  $scope.showConfirm = function() {
    var alertPopup = $ionicPopup.alert({title: "Note Saved!"});
  }

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
