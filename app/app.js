var app = angular.module("ephemeralPhotoApp", []);

app.controller("defaultCtrl", function($scope) {
  $scope.labels = {
    defaultMinutes: '00',
    defaultHours: '12',
    defaultDays: '0',
    defaultTtl: '12 hours',
    maxTtl: '5 days'
  };
});
