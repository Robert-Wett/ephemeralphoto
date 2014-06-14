'use strict';

/* Filters */

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

