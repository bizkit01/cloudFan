(function () {
  angular.module('cloudfanApp',['ngRoute']);

  function config ($routeProvider) {
    $routeProvider
    .when ('/', {
      templateUrl: '/views/index_client.view.html',
      controller: 'indexController',
      controllerAs: 'vm'
    })
    .when ('/menuorder', {
      templateUrl: '/views/menuorder_client.view.html',
      controller: 'menuorderController',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});
  }

  angular
    .module('cloudfanApp')
    .config(['$routeProvider', config]);
})();
