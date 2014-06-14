'use strict';

/* Controllers */

angular.module('ephemeralPhotoApp.controllers', []).
controller("defaultCtrl", function($scope) {
    $scope.labels = {
        defaultMinutes : '00',
        defaultHours   : '12',
        defaultDays    : '00',
        defaultTtl     : '12 hours',
        maxTtl         : '5 days'
    };

    $scope.ttlMinutes = 0;
    $scope.ttlHours   = 0;
    $scope.ttlDays    = 0;

});
