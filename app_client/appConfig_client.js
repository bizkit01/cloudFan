(function () {
  angular.module('cloudfanApp',['ngRoute']);

  function config ($routeProvider) {
    $routeProvider
    .when ('/', {
      templateUrl: '/views/index_client.view.html',
      controller: 'indexController',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});
  }

  angular
    .module('cloudfanApp')
    .config(['$routeProvider', config]);
})();
