(function () {

  var menuorderController = function ($scope) {
    var vm = this;

    $('#dashbordMenuOrder a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });

  };

  angular
    .module('cloudfanApp')
    .controller('menuorderController',['$scope','$timeout', menuorderController] );
})();
