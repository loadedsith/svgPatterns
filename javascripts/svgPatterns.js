    $(document).ready(function() {

      $(document).foundation();

    });
    
    Object.prototype.clone = function() {
      var newObj = (this instanceof Array) ? [] : {};
      for (i in this) {
        if (i == 'clone') continue;
        if (this[i] && typeof this[i] == "object") {
          newObj[i] = this[i].clone();
        } else newObj[i] = this[i]
      } return newObj;
    };
    
    var SVGPatterns = angular.module('SVGPatterns', ['ngSanitize']);
    SVGPatterns.directive('integer', function(){
        return {
            require: 'ngModel',
            link: function(scope, ele, attr, ctrl){
                ctrl.$parsers.unshift(function(viewValue){
                    return parseInt(viewValue);
                });
            }
        };
    });
    SVGPatterns.directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }
    });
    SVGPatterns.directive('compile', function($compile) {
        return function(scope, element, attrs) {
          scope.$watch(
              function(scope) {
                  // watch the 'compile' expression for changes
                  return scope.$eval(attrs.compile);
              },
              function(value) {
                  // when the 'compile' expression changes
                  // assign it into the current DOM
                  element.html(value);

                  // compile the new DOM and link it to the current scope.
                  $compile(element.contents())(scope);
              }
          );
        };
      })
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
      $scope.selected = {};
      $scope.selected.svg = 0;
      $scope.svgTemplates = {};
      $scope.svgTemplates.stage = {};
      $scope.svgTemplates.stage.svgs = [];
      $scope.svgTemplates.stage.svgs.default = ({"name":{"text":"defaultSvg"},"width":"400px", "height":"400px", "content":""});
      $scope.svgTemplates.stage.name = {};
      $scope.svgTemplates.stage.name.text = "Default Name";
      $scope.svgTemplates.stage.name.css = "text-shadow:0px 0px 3px #fff, 0px 0px 2px #000";
      $scope.backgroundColors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]; 
      $scope.colors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"].reverse(); 
      // $scope.colors.reverse(); 

      $scope.stages = [];
      $scope.stages.push($scope.svgTemplates.stage.clone());
      
      $scope.stages[0].svgs[0]={"name":{"text":"Triangle Path"},"width":"4cm", "height":"4cm","viewBox":"0 0 400 400", "content":"<rect x='1' y='1' width='398' height='398' fill='none' stroke='blue' /><path d='M 100 100 L 300 100 L 200 300 z' fill='red' stroke='blue' stroke-width='3' />"};
      $scope.stages[0].name.text = "Mozilla Example Svg";
      $scope.tools = [
          {"name" : "Add Stage",
            "function":"addStage"
          }
        ];
      $scope.SVGTools = [
          {"name" : "Add SVG",
            "function":"addSvg"
          },
          {"name" : "Add Line",
            "function":"addLine"
          }
        ];
      $scope.addStage = function(){
        $scope.stages.push($scope.svgTemplates.stage.clone());
      }
      $scope.addSvg = function(){
        $scope.selected.stage.svgs.push($scope.svgTemplates.stage.svgs.default.clone());
        $(document).foundation('section', 'reflow');
      }      
      $scope.addLine = function(){
        $('#addLineModal').foundation('reveal','open');
      }
      $scope.isSvgActive = function(index) {
        
           return index === $scope.selected.svg.index;
       }
      $scope.removeSvg = function(index){
         $scope.selected.stage.svgs.splice(index,1);
      }
      $scope.callMe = function(input){
        console.log("Call Me: ",input);
      }
      $scope.mod = function(modThis, byThis){
        return modThis%byThis;
      }
      $scope.selectSvg = function(index){
        $scope.selected.svg = $scope.selected.stage.svgs[index];
        $scope.selected.svg.index = index;
      }
      $scope.selectStage = function(index){
        $scope.selected.stage = $scope.stages[index];
        $scope.selected.stage.index = index;
        $scope.showSelectedStage = true;
      }
      $scope.showStages = true;
      $scope.makeSvg = function(svg){
        var svgString = "<svg style='border:1px solid" + $scope.colors[ $scope.mod( $scope.selected.stage.index,$scope.colors.length)] 
                            + "' width='" + svg.width + "' height='"
                            + svg.height + "'";
        if(svg.viewBox!=""){
          svgString += "viewBox='" + svg.viewBox + "'";
        }
        svgString+=" >"+svg.content+"</svg>";
        return svgString
      }
      $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
          //you also get the actual event object
          //do stuff, execute functions -- whatever...
          console.log("Smarty Peregrine Falcon")
          $(document).foundation('section', 'reflow');
      });

    }
    
    function RouteController ($scope, $rootScope, $routeParams) {
      // Getting the slug from $routeParams
      var slug = $routeParams.slug;
      
      $scope.$emit('routeLoaded', {slug: slug});
      $scope.page = $rootScope.pages[slug];
    }

    window.getFunctionFromString = function(string)
    {
        var scope = window;
        var scopeSplit = string.split('.');
        for (i = 0; i < scopeSplit.length - 1; i++)
        {
            scope = scope[scopeSplit[i]];

            if (scope == undefined) return;
        }

        return scope[scopeSplit[scopeSplit.length - 1]];
    }
    