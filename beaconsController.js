var beacons = angular.module('Beacons', [])

// beacons.factory('beaconFactory', function() {
  

//   return $.get('array.js')

// })

beacons.controller('BeaconsController', function($scope, $interval) {

  $interval(displayBeaconList, 10000);
  
  
  function displayBeaconList() {
    // console.log('test')
    $scope.test = testArray
  }

});
