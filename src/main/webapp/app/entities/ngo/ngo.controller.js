(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('NgoController', NgoController);

  NgoController.$inject = ['$scope', '$state', '$timeout', '$q', '$log' ,'Data',  '$mdDialog', '$mdMedia','USer'];

  function NgoController ( $scope, $state, $timeout, $q, $log, Data,  $mdDialog, $mdMedia,USer) {


    $scope.selectedItem;

    $scope.disasters=[];

    $scope.filters = { };
/*    $scope.itemToDB={
      actionObjects: [],
      actionType : "SEEK",
      disaster : {},
      isExpired : null,
      lat :34.03,
      lon : 34.05,
      user: null
    };*/

    $scope.userNGOS=[];

    $scope.selectedNGO ;

    $scope.ngo=null;

    loadActionsAndDisaster();

    /*-------------------------------------load all items asynchronously----------------------------*/

    function loadActionsAndDisaster () {
      Data.disaster.query(function(result) {
       result.forEach(function (item) {
         $scope.disasters.push(item)
         console.log(item)
       })
     })

      USer.ngo.query(function(result) {
       result.forEach(function (item) {
         $scope.userNGOS.push(item);
         console.log(item)

/*         item.users.forEach(function (argument) {
           if(agument.id==user.id) {
            $scope.userNGOS.push(item);
          }       
        })*/

      })


     })

    }


    /*------------------------------------Query Search looks for items in itemlist-------------------------------------------*/



    function selectedItemChange(item) {
      var value = item.display;
      console.log(item)
      $scope.pushToArray(value);
    }

    /*---------------------------------Methods to manipulate the action and to save and delete them from the system------------------*/


    $scope.pushToArray = function (item){  
     var marker; 
     $scope.itemToDB.actionObjects.forEach( function(entry) {
      console.log(item.name)
      if (entry.name===item.name) {
        marker = 1;
      }})
     if (marker===1) {
      return
    }
    $scope.itemToDB.actionObjects.push(item);
    console.log( $scope.itemToDB.actionObjects)
  };

  $scope.delFromArray = function (item){  
   $scope.itemToDB.actionObjects.forEach( function(entry) {
     if (entry===item) {
       $scope.itemToDB.actionObjects.splice( $scope.itemToDB.actionObjects.indexOf(item), 1);
     }})
 };


 $scope.writeDB = function (){
  if($scope.selectedItem!=null){ 
    Data.action.save($scope.itemToDB);
    $state.go("home");
  }else {
    showAlert();
  }

}

$scope.getSelectedText = function() {
  if ($scope.selectedItem !== undefined) {
    //$scope.itemToDB.disaster=$scope.selectedItem;
    //console.log($scope.itemToDB)
    return ($scope.selectedItem.disasterType.name+" |  "+$scope.selectedItem.title+"  |  "+$scope.selectedItem.area);
  } else {
    return "Wählen sie eine geclaimte Katastrophe:";
  }
};

$scope.getSelectedText2 = function() {
  if ($scope.selectedItem !== undefined) {
    $scope.itemToDB.disaster=$scope.selectedItem;
    console.log($scope.itemToDB)
    return ($scope.selectedItem.disasterType.name+" |  "+$scope.selectedItem.title+"  |  "+$scope.selectedItem.area);
  } else {
    return "Wählen sie eine von ihren NGOS";
  }
};



/*-------------------------------------------Various Helper Functions-------------------------------------------------*/

function showAlert(){
  $mdDialog.show(
    $mdDialog.alert()
    .parent(angular.element(document.querySelector('#popupContainer')))
    .clickOutsideToClose(true)
    .title('Sie müssen eine Katastrope wählen')
    .ok('Ok')
    .targetEvent()
    );
};

$scope.$watch("selectedNGO", function(newvalue) {
  if(newvalue!=null){
    $timeout(function() {
      google.maps.event.trigger(map,'resize')
    }, 0);}
  });
/*------------------------------------------------STUFF---------------------------------------------------------------*/

$scope.topten;
$scope.disaster;
$scope.answer=false;


$scope.changeAnswer = function (item) {
  /*     $scope[item]=true;*/
  if($scope[item]==true)
  {
    $scope[item]=false; 
  }else {
   $scope[item]=true;
 }
}

$scope.showAnswers = function (index) {
 $scope['answer_'+ index];
 if($scope['answer_'+ index] == true)
 {
   $scope['answer_'+ index] = false;
 }else {
  $scope['answer_'+ index] = true;
}
}

$scope.send = function (item) {
  $scope[item]=false;
}


/*function loadAlls () {

    $scope.disaster = Data.disaster.get({id : $stateParams.disasterID});
    $scope.topten= Data.topten.query({id : $stateParams.disasterID})
  }*/

  $scope.messages = [
  {
    text: 'Duo at aliquid mnesarchum, nec ne impetus hendrerit. Ius id aeterno debitis atomorum, et sed feugait voluptua, brute tibique no vix. Eos modo esse ex, ei omittam imperdiet pro. Vel assum albucius incorrupte no.',
    user: 'Hans',
  },
  {
    text: 'Feuer',
    user: 'Olaf',
  },
  {
    text: 'Erdbeben',
    user: 'Hans',
  },
  {
    text: 'Feuer',
    user: 'Olaf',
  },
  {
    text: 'Erdbeben',
    user: 'Hans',
  },
  {
    text: 'Feuer',
    user: 'Olaf',
  },
  {
    text: 'Feuer',
    user: 'Olaf',
  },
  {
    text: 'Feuer',
    user: 'Olaf',
  },
  {
    text: 'Feuer',
    user: 'Olaf',
  },
  {
    text: 'Feuer',
    user: 'Olaf',
  }
  ];        
  /*-------------------------------------------------------MAP-----------------------------------------------------------*/

  var map;  


  navigator.geolocation.getCurrentPosition(function(position){ 
    initialize(position.coords);
  }, function(){
    var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
    initialize(sanFrancisco) ;
  });

  function initialize(coords) {
   var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
   var myOptions = {
    zoom: 8,
    center: latlng,
    layerId: '06673056454046135537-08896501997766553811'
  };
  map = new google.maps.Map(document.getElementById('map'), myOptions);
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(document.getElementById('controllerMaps'));




           //create the heatmap
           

//mouselistener for click event
map.addListener('click', function(event) {  
  addMarker(event.latLng); 
});       



//sets the point of the user

};


function addMarker(location) {  
  var marker = new google.maps.Marker({  
    position: location,  
    map: map  
  });  
} 


}
})();
