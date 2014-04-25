'use strict';

/* Filters */

angular.module('ephemeralPhotoApp.filters', []).
filter('ttlDateFormat', [
    function() {
      return function(num) {
        if (angular.isNumber(num)) {
            if (num / (60 * 24) >= 1) {
                return num / (60 * 24);
            } else if (num / 60 >= 1) {
                return num / 60 >= 1;
            } else {
                return num;
            }
        });
      } else {
          return num;
      }
  };
}

]);
