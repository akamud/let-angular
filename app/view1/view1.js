'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {
    $scope.calculos = null;
    $http.get('view1/calculos.json').success(function (data) {
      $scope.calculos = data;
    });

    $scope.parseFloat = function (value) {
      var temp = parseFloat(value);
      return isNaN(temp) ? 0 : temp;
    }

    $scope.toFixed = function (value) {
      return value.toFixed(0);
    }

    $scope.total = function (col) {
      var soma = 0;
      if ($scope.calculos != null)
      {
        soma = $scope.calculos.map(function(e){
          return parseFloat(e[col]);
        })
        .filter(function (e){
          return !isNaN(e);
        })
        .reduce(function(prev, current){
          return prev + current;
        });
      }
      return soma;
    }

  }]);