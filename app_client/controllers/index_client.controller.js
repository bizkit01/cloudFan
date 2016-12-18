(function () {
  angular
    .module('cloudfanApp')
    .controller('indexController',['$scope','$timeout', indexController] );

  function indexController ($scope, $timeout) {
    var vm = this;
    // login/registration tab switch controller
    $('#dashbordIndexID a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });

  }
})();
