var app = angular.module('bankApp', []);


app.controller('MainController', ['$scope', '$http', function($scope, $http){
    $scope.user = {};

    $http.get('/getUser').then(function(response){
       console.log(response.data);
       $scope.user = response.data;
    });

    $scope.loanType = 'car_loan';
    $scope.payment = 0;

    $scope.makePayment = function(){

        var params = '/' + $scope.user.id + '/' + $scope.loanType + '/' + $scope.payment;

        $http.post('/payLoan' + params).then(function(response){
            console.log("somethin else");

        });
    };


}]);