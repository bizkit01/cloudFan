(function () {
  // menu create controller
  var menuMgtController = function ($scope, $http) {

    $scope.loadMenu = function () {
      $http(
        {
          url: "/api/menus",
          method: "GET",
          data: {}
        }
      ).then(function(response) {
        if (response.status == 200) {
          // $scope.menuDataCtrl = response.data[0].menu;
        }
      }, function(response) {

      });
    };

    $scope.loadMenu();

    $scope.submitMenu = function () {
      var categoriesArr = $scope.menuDataCtrl.categories;
      for (i=0;i<categoriesArr.length;i++) {
        delete categoriesArr[i].categoryErrorDis;
        delete categoriesArr[i].mealErrorDis;
      }

      var menu = function (categories) {
        this.categories = categories;
      };

      var menuObj = new menu(categoriesArr);

      $http(
        {
          url: "/api/menus",
          method: "POST",
          data: {menu: menuObj}
        }
      ).then(function(response) {
        if (response.status == 200) {
          $scope.menuStatus.succeed.status = true;
          $scope.menuStatus.succeed.message = 'Submit succeed';
          $scope.menuStatus.failed.status = false;
        }
      }, function(response) {
        $scope.menuStatus.succeed.status = false;
        $scope.menuStatus.failed.status = true;
      });
    };
  };

  // menu create directive render
  var menuMgt = function () {
    return {
      restrict: 'EA',
      // scope: false: uses parent's controller $scope
      //        true: inherite parent's controller $scope but do not reflect any changes back to parent's controller $scope
      //        {}: get a new isolated $scope
      scope: false,
      controller:  'menuMgtController',
      link: menuMgtLinkFunc,
      templateUrl: '/views/directives/menuMgt_client.directive.html'
    };

    // menu management link function(which would be ran after compiled the directive)
    function menuMgtLinkFunc ($scope) {
      // init the menu data, and set up a namespace for controlling the menu operations like CRUD categries and meals
      $scope.menuDataCtrl = {
        categories: [
          {
            categoryId: 'c0000000000000',
            categoryName: 'Unnamed Category',
            meals: [],
            categoryErrorDis: false,
            mealErrorDis: false
          }
        ]
      };

      // bind the meal data and others in here for contorlling and initializing them
      $scope.menuDataTemp = {
        mealEidtStatus: false,
        mealId: '',
        mealName: '',
        mealPrice: '',
      };

      $scope.menuStatus = {
        succeed: {
          status: false,
          message: ""
        },
        failed: {
          status: false,
          message: ""
        }
      };

      // find the index of elements in their arrays by their uniq id which is set up by time stamp
      var indexofbyId = function (Id,arrType) {
        var targetArr = [];
        if (arrType == 'category') {
          targetArr = $scope.menuDataCtrl.categories;
          for (i=0;i<targetArr.length;i++) {
            if (targetArr[i].categoryId == Id) {
              return i;
            }
          }
        } else if (arrType == 'meal') {
          var categoryIndex = indexofbyId(Id.categoryId, 'category');
          targetArr = $scope.menuDataCtrl.categories[categoryIndex].meals;
          for (i=0;i<targetArr.length;i++) {
            if (arrType = 'category' && targetArr[i].mealId == Id.mealId) {
              return i;
            }
          }
        }
      };

      // validate whether every single category name is empty,if so, show the error tip
      $scope.categoryNameValidation = function (categoryNameGet, categoryId) {
        var categoryIndex = indexofbyId(categoryId,'category');
        if (categoryNameGet) {
          $scope.menuDataCtrl.categories[categoryIndex].categoryErrorDis = false;
        } else {
          $scope.menuDataCtrl.categories[categoryIndex].categoryErrorDis = true;
        }
      };

      // init event: clear all meal input info and close the collapse when click out of the collapse
      $scope.initAllCollapses = function () {
        if ($scope.menuDataTemp.mealEidtStatus == true) {
          $('.collapse').collapse('hide');
        } else {
          $('.collapse').collapse('hide');
          $scope.menuDataTemp.mealId = '';
          $scope.menuDataTemp.mealName = '';
          $scope.menuDataTemp.mealPrice = '';
        }
      };

      // add event: after validate the correspond category name has been typed in,
      // show the meal info input collapse
      $scope.addMeal = function (categoryId) {
        $scope.menuDataTemp.mealEidtStatus = false;
        var categoryIndex = indexofbyId(categoryId,'category');
        var categoryNameGet = $scope.menuDataCtrl.categories[categoryIndex].categoryName;
        if (categoryNameGet) {
          $scope.menuDataCtrl.categories[categoryIndex].categoryErrorDis = false;
          $scope.menuDataTemp.mealId = '';
          $scope.menuDataTemp.mealName = '';
          $scope.menuDataTemp.mealPrice = '';
          var currentCollapseID = '#mealCreate_' + categoryId;
          $(currentCollapseID).collapse('toggle');
        } else {
          $scope.menuDataCtrl.categories[categoryIndex].categoryErrorDis = true;
        }
      };

      // create event: after validating the meal info which typed in the meal info colapse,
      // create a new meal in current category
      $scope.createMeal = function (categoryId) {
        var categoryIndex = indexofbyId(categoryId, 'category');
        var mealNameGet = $scope.menuDataTemp.mealName;
        var mealPriceGet = $scope.menuDataTemp.mealPrice;
        // validate the meal info which typed in, then create a new meal in current category
        if (mealNameGet && mealPriceGet) {
          $scope.menuDataCtrl.categories[categoryIndex].mealErrorDis = false;
          var mealId = 'm' + Date.now();
          var mealCreate = {
            mealId: mealId,
            categoryId: categoryId,
            mealName: mealNameGet,
            mealPrice: mealPriceGet
          };
          $scope.menuDataCtrl.categories[categoryIndex].meals.push(mealCreate);
          $scope.menuDataTemp.mealId = '';
          $scope.menuDataTemp.mealName = '';
          $scope.menuDataTemp.mealPrice = '';
          var currentCollapseID = '#mealCreate_' + categoryId;
          $(currentCollapseID).collapse('hide');
        } else {
          $scope.menuDataCtrl.categories[categoryIndex].mealErrorDis = true; // othervise, show the error tip
        }
      };

      // edit event: when edit, set the mealEidtStatus as true, open the meal input collapse
      $scope.editMeal = function (categoryId, meal) {
        $scope.menuDataTemp.mealEidtStatus = true;
        var categoryIndex = indexofbyId(categoryId,'category');
        var categoryNameGet = $scope.menuDataCtrl.categories[categoryIndex].categoryName;
        if (categoryNameGet) {
          $scope.menuDataCtrl.categories[categoryIndex].categoryErrorDis = false
          $scope.menuDataTemp.mealId = meal.mealId;
          $scope.menuDataTemp.mealName = meal.mealName;
          $scope.menuDataTemp.mealPrice = meal.mealPrice;
          var currentCollapseID = '#mealCreate_' + categoryId;
          $(currentCollapseID).collapse('toggle');
        } else {
          $scope.menuDataCtrl.categories[categoryIndex].categoryErrorDis = true;
        }
      };

      // update event: update a specific meal by mealId
      $scope.updateMeal = function (categoryId) {
        var categoryIndex = indexofbyId(categoryId, 'category');
        var mealNameGet = $scope.menuDataTemp.mealName;
        var mealPriceGet = $scope.menuDataTemp.mealPrice;
        // validate the meal info which typed in, then create a new meal in current category
        if (mealNameGet && mealPriceGet) {
          $scope.menuDataCtrl.categories[categoryIndex].mealErrorDis = false;
          var mealId = $scope.menuDataTemp.mealId;
          var mealIndex = indexofbyId(
            {
              categoryId: categoryId,
              mealId: mealId,
            },'meal');
          var mealupdate = {
            mealId: mealId,
            categoryId: categoryId,
            mealName: mealNameGet,
            mealPrice: mealPriceGet
          };

          $scope.menuDataCtrl.categories[categoryIndex].meals.splice(mealIndex, 1, mealupdate);
          $scope.menuDataTemp.mealId = '';
          $scope.menuDataTemp.mealName = '';
          $scope.menuDataTemp.mealPrice = '';
          var currentCollapseID = '#mealCreate_' + categoryId;
          $(currentCollapseID).collapse('hide');
        } else {
          $scope.menuDataCtrl.categories[categoryIndex].mealErrorDis = true; // othervise, show the error tip
        }
      };

      // remove event: remove a specific meal by mealId
      $scope.removeMeal = function (categoryId, mealId) {
        var mealIndex = indexofbyId(
          {
            categoryId: categoryId,
            mealId: mealId,
          },'meal');
        var categoryIdex = indexofbyId(categoryId, 'category');
        $scope.menuDataCtrl.categories[categoryIdex].meals.splice(mealIndex,1);
      };

      // add event: after validating the category name, create a new category when
      // click the "add category here" button
      $scope.addCategory = function (categoryId) {
        var categoryIndex = indexofbyId(categoryId,'category');
        var categoryNameGet = $scope.menuDataCtrl.categories[categoryIndex].categoryName;
        // after validating, init a new category object with a time stamp and insert it at
        // the next of the category which its' "add category here" button be clicked into the categories array
        if (categoryNameGet) {
          $scope.menuDataCtrl.categories[categoryIndex].categoryErrorDis = false;
          var categoryId = 'c' + Date.now();
          var categoryCreate = {
            categoryId: categoryId,
            categoryName: 'Unnamed Category',
            meals: [],
            categoryErrorDis: false,
            mealErrorDis: false
          };
          $scope.menuDataCtrl.categories.splice(categoryIndex+1, 0, categoryCreate);
        } else {
          $scope.menuDataCtrl.categories[categoryIndex].categoryErrorDis = true; // otherwise show the error tip
        }
      };

      // hover event: active the last one category cannot be removed tip popover event when hovering on the remove icon
      // of the last category(it's a bug, because when first cliking the remove icon, the popover event cannot be render)
      $scope.activePopover = function (categoryId) {
        var categoryIndex = indexofbyId(categoryId,'category');
        if( $scope.menuDataCtrl.categories.length <= 1 ) {
          $("[data-toggle=popover]").popover();
        }
      };

      // remove event: remove the current category if it is not the last one
      $scope.removeCategory = function (categoryId) {
        var categoryIndex = indexofbyId(categoryId,'category');
        if( $scope.menuDataCtrl.categories.length > 1  ) {
          $scope.menuDataCtrl.categories.splice(categoryIndex,1);
        }
      };

      // submit menu event
      // $scope.submitMenu = function () {
      //   var categoriesArr = $scope.menuDataCtrl.categories;
      //   for (i=0;i<categoriesArr.length;i++) {
      //     delete categoriesArr[i].categoryErrorDis;
      //     delete categoriesArr[i].mealErrorDis;
      //   }
      //
      //   var menu = function (categories) {
      //     this.categories = categories;
      //   };
      //
      //   var menuObj = new menu(categoriesArr);
      //
      //   $http(
      //     {
      //       url: "/api/menus",
      //       method: "POST",
      //       data: menuObj
      //     }
      //   ).then(function(response) {
      //     console.log(response);
      //   }, function(response) {
      //
      //   });
      // };
    }
  };

  // register the controller and directive on the angular application
  angular
    .module('cloudfanApp')
    .controller('menuMgtController', ['$scope', '$http', menuMgtController])
    .directive('menuManagement', menuMgt);
})();
