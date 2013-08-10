    $(document).ready(function() {

      $(document).foundation();

    });
    
    var SVGPatterns = angular.module('SVGPatterns', []);
    
    SVGPatterns.config(function ($routeProvider) {
      $routeProvider
        .when('/page/:slug', {templateUrl: 'partials/page.html', controller: 'RouteController'})
        .otherwise({redirectTo: '/page/home'});
    });
    
    function AppController ($scope, $rootScope, $http) {
      // Load pages on startup
      console.log("Smarty Brown Bear")
      // $http.get('pages.json').success(function (data) {
      //   $rootScope.pages = data;
      // });
      //     
      // Set the slug for menu active class
      // $scope.$on('routeLoaded', function (event, args) {
      //   $scope.slug = args.slug;
      // });
      $scope.showStages = true;
      $scope.stages = [
          {"stageName" : "Stage Red Painted Hunting Dog",
            "svg":{
              "width":"200",
              "height":"200"
            }
          },
          {"stageName" : "Stage Red Indigo Lear's Macaw"}
        ];


    }
    function RouteController ($scope, $rootScope, $routeParams) {
      // Getting the slug from $routeParams
      var slug = $routeParams.slug;
      
      $scope.$emit('routeLoaded', {slug: slug});
      $scope.page = $rootScope.pages[slug];
    }