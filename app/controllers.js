'use strict';

/* Controllers */

angular.module('controllers', []).
controller("defaultCtrl", function($scope) {
    $scope.labels = {
        mainLead: 'Share an image, but just for awhile',
        fileLead: 'Choose a file',
        ttlLead: ' Image will disappear in:',
        defaultMinutes: '00',
        defaultHours: '12',
        defaultDays: '00',
        defaultTtl: '12 hours',
        maxTtl: '5 days'
    };

    $scope.ttlMinutes = 0;
    $scope.ttlHours = 0;
    $scope.ttlDays = 0;
});