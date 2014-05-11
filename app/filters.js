'use strict';

/* Filters */

<<<<<<< HEAD
angular.module('customFilters', []).
    filter('ttlDateFormat', [
        function() {
            return function(num) {
                if (!angular.isNumber(num))
                    return num;
                    
                var returnNumber;
                if (num / (60 * 24) >= 1) {
                    returnNumber = Math.round((num / (60 * 24)) * 100) / 100;
                    return returnNumber + " days";
                }
                else if (num / 60 >= 1) {
                    returnNumber = Math.round((num / 60) * 100) / 100;
                    return returnNumber + " hours";
                }
                else {
                    returnNumber = Math.round(num * 100) / 100;
                    return num + " minutes";
                }
            };
        }
]);
=======
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
      }
      else {
        return num;
      }
    };
  }
]);
>>>>>>> bc1d045b5eecfbf1868554d623f3a38ed874a8a8
