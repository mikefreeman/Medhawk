angular.module('share', ['config', 'twitterLib'])

.controller('ShareCtrl', ['$rootScope', '$scope', '$http', 'TwitterLib', 'configuration', '$state', function($rootScope, $scope, $http, TwitterLib, configuration, $state){
  var effects = _.pluck($rootScope.drugEffects, "name");
  var effectString = "";
  $scope.tagString = "";
  $scope.hideEmojis = true;
  $scope.emojiFilenames = [
    'agitated.png',
    'angry.png',
    'annoyed.png',
    'batty.png',
    'cold.png',
    'distracted.png',
    'fever.png',
    'gloomy.png',
    'goofy.png',
    'green.png',
    'hopeless.png',
    'hungry.png',
    'manic.png',
    'pessimistic.png',
    'sick.png',
    'sleepy.png',
    'surprised.png',
    'tearful.png',
    'tired.png',
    'worried.png'
  ];

  $scope.tags = {
    '@US_FDA': false,
    '#ThisDrugSucks': false
  };

  $scope.tags['@' + $rootScope.drugHandle] = false;

  if (effects.length === 1) {
    effectString = effects[0];
  } else if (effects.length === 2) {
    effectString = effects[0] + " and " + effects[1];
  } else {
    _.each(effects, function (effect, index) {
      if (effects.length - 1 === index) {
        effectString += "and " + effect;
      } else {
        effectString += effect + ", ";
      }
    });
  }

  $scope.tweetMessage = "I'm taking " + $rootScope.drugName + " and I'm experiencing " + effectString + $scope.tagString + "via @Medhawk";

  // checkboxes on change, update
  $scope.toggleSelection = function(selection) {
    $scope.tags[selection] = !$scope.tags[selection];
    // update tagString
    $scope.tagString = "";
    _.each($scope.tags, function(selected, tagName) {
      if(selected) {
        $scope.tagString = $scope.tagString.concat(tagName, ' ');
      }
    });
    $scope.tweetMessage = "I'm taking " + $rootScope.drugName + " and I'm experiencing " + effectString + " " + $scope.tagString + "via @Medhawk";
  };

  $scope.doLogin = function () {
      TwitterLib.init();
      $scope.prepareTweet();
  };

  $scope.doLogout = function () {
      TwitterLib.logOut();
  };
  
  $scope.prepareTweet = function(){
    if ( $rootScope.emoji === undefined ) {
      $scope.doTweet();
    } else {
      $http({
        method:"GET",
        url: configuration.SERVERPATH + "/emojis/" + $scope.emoji,
        responseType: "blob"
      }).success(function(data){
        var reader = new FileReader();
        reader.onloadend = function() { $scope.doTweet(reader.result.split(",")[1]); };
        reader.readAsDataURL(data);
      });
    }
  };

  $scope.doTweet = function (picture) {
    TwitterLib.tweet("$scope.tweetMessage", picture).then(function (/* success */) {
      // TODO: Go to succesful tweet page.
    });
  };


  $scope.attachEmoji = function(filename) {
    $rootScope.emoji = filename;
    $scope.hideEmojis = true;
    $state.go('share.tweet');
  };

  $scope.toggleEmoji = function() {
    $scope.hideEmojis = !$scope.hideEmojis;
  };
}]);