(function () {
  angular
    .module('cloudfanApp')
    .controller('indexController',['$scope', indexController] );

  function indexController ($scope) {
    var vm = this;
    // login/registration tab switch controller
    $('#dashbordIndexID a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });
  }
})();
