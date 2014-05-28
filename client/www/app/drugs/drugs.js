angular.module('drugs', ['drugServices'])

.controller('DrugCtrl', ['$scope', '$rootScope', '$state', 'drugNames', 'drugEffects', function($scope, $rootScope, $state, drugNames, drugEffects){
  drugNames.getDrugs().then(function (drugs) {
    $scope.drugs = drugs;
  });

  drugEffects.getEffects().then(function (effects) {
    $scope.effects = _.extend(effects, { selected: false });
  });

  $scope.navEffects = function(drug) {
    $rootScope.drugName = drug.name;
    $rootScope.drugCompany = drug.company;
    $rootScope.drugHandle = drug.handle;
    $state.go('drugs.effects');
  };

  $scope.navShare = function() {
    $rootScope.drugEffects = _.filter($scope.effects, function(effect) {
      return effect.selected;
    });
    $state.go('share.tweet');
  };
}]);
