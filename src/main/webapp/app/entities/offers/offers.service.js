(function() {
  'use strict';
  angular
  .module('edgeServerApp')
  .factory('Offers', Offers);

  function Offers () {

    var Item={
      actionObjects: [],
      actionType : "OFFER",
      disaster : {},
      isExpired : null,
      lat : null,
      lon : null,
      user: null
    };


    var setAction = function(action) {
      Item = action;
    };

    var getAction = function(action) {
      return Item;
    };

    return {
      setAction : setAction,
      getAction : getAction
    };

  };

})();
