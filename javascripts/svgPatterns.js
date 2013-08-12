    $(document).ready(function() {
      $(document).foundation('section', 'reflow');
      $(document).foundation();
      $('#addElement').on('opened', function () {
        console.log("Orange Man of War bird")
        $(document).foundation('section', 'reflow');
      });
      
    });

    function clone(obj) {
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
    
    
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
      $scope.svgTemplates.stage.name.css = "text-shadow:0px 0px 7px #000, 0px 0px 13px #fff";
      $scope.svgTemplates.stage.css = "text-shadow: 0px 0px 7px #000,0px 0px 13px #fff";
      $scope.backgroundColors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]; 
      $scope.colors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"].reverse(); 
      // $scope.colors.reverse(); 

      $scope.stages = [];
      $scope.stages.push(clone($scope.svgTemplates.stage));
      
      $http({"method":"GET","url":"./static/elements.json"}).success(function(response){
      
      $scope.addElementDialog.elements = response;
      
      });
      $http({"method":"GET","url":"./static/stages.json"}).success(function(response){
        for (var i = response.length - 1; i >= 0; i--) {
          // response[i]
          if(response[i].backgroundColor===undefined){
            response[i].backgroundColor = $scope.backgroundColors[i];
          }
          
          if(response[i].color===undefined){
            response[i].color = $scope.colors[i];
          }
        }
        $scope.stages = response;
      });

      $scope.tools = [
          {"name" : "Add Stage",
            "function":"addStage"
          }
        ];
      $scope.SVGTools = [
          {"name" : "Add SVG",
            "function":"addSvg"
          },
          {"name" : "Add Element",
            "function":"addElement"
          }
        ];
        
      $scope.addElementDialog =  {};
      $scope.addElementDialog.selected = 0;
      
      $scope.isAddElementActive = function(index){
        return index===$scope.addElementDialog.selected;
      }
      $scope.getElementByName = function(name){
        var element = {};
        for (var i = $scope.addElementDialog.elements.length - 1; i >= 0; i--) {
          if(name === $scope.addElementDialog.elements[i].name){
            return $scope.addElementDialog.elements[i];
            
          }
        }
      }
      $scope.confrimElement = function(name){
        var element = $scope.getElementByName(name);
        var theString = "<"+name;
        
          for (var i = element.attributes.length - 1; i >= 0; i--) {
            var attribute = element.attributes[i];
            theString += " "+attribute.var+"='"+attribute.value+"'";
          }
          
          if(element.autoCloseTag === true){            
             theString +="/>";
          }else{
             theString +="></"+name+">";
          }
          $scope.selected.stage.svgs[$scope.selected.svg].content += theString;
          // console.log(theString);
          $('#addElement').foundation('reveal', 'close');
      }
      
      $scope.clearElement = function(name){
        console.log($scope)
      }
     
    
      $scope.showAddElementDialog = false;
      
      $scope.addElement = function(){
        $scope.showAddElementDialog = true;
        $scope.makeSvgPreview();
        $('#addElement').foundation('reveal', 'open');
        
      }  
      
      $scope.addStage = function(){
        $scope.stages.push(clone($scope.svgTemplates.stage));
        var index = $scope.stages.length-1;
        $scope.stages[index].backgroundColor = $scope.backgroundColors[index];
        $scope.stages[index].color = $scope.colors[index];
      }
      $scope.addSvg = function(){
        $scope.selected.stage.svgs.push(clone($scope.svgTemplates.stage.svgs.default));
        $(document).foundation('section', 'reflow');
      }      
   
      $scope.isSvgActive = function(index) {
        
           return index === $scope.selected.svg.index;
       }
      $scope.removeSvg = function(index){
         $scope.selected.stage.svgs.splice(index,1);
      }
      $scope.removeStage = function(index){
         $scope.stages.splice(index,1);
      }
      $scope.callMe = function(input){
        console.log("Call Me: ",input);
      }
      $scope.mod = function(modThis, byThis){
        return modThis%byThis;
      }
      $scope.selectSvg = function(index){
        // $scope.selected.svg = $scope.selected.stage.svgs[index];
        // $scope.selected.svg.index = index;
        $scope.selected.svg = index;
      }
      $scope.selectStage = function(index){
        $scope.selected.stage = $scope.stages[index];
        $scope.selected.stage.index = index;
        $scope.showSelectedStage = true;
      }
      $scope.showAddLineDialog = false;
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
      $scope.addElementPreview = function(name){
        var element = $scope.getElementByName(name);
        var theString = "<"+name;
          for (var i = element.attributes.length - 1; i >= 0; i--) {
            var attribute = element.attributes[i];
            theString += " "+attribute.var+"='"+attribute.value+"'";
          }
          
          if(element.autoCloseTag === true){            
             theString +="/>";
          }else{
             theString +="></"+name+">";
          }
          $scope.contentElementPreview = theString;
      }
      $scope.makeSvgPreview = function(){
        var svg = $scope.selected.stage.svgs[$scope.selected.svg];
        var svgString = "<svg style='border:1px solid" + $scope.colors[ $scope.mod( $scope.selected.stage.index,$scope.colors.length)] 
                            + "' width='250' height='250'";
        if(svg.viewBox!=""){
          svgString += "viewBox='" + svg.viewBox + "'";
        }
        $scope.addElementPreview($scope.addElementDialog.elements[$scope.addElementDialog.selected].name);
        svgString+=" >"+$scope.selected.stage.svgs[$scope.selected.svg].content+$scope.contentElementPreview+"</svg>";
        console.log("embarrassed Yellow-banded Dart frog",$scope);
        $scope.contentPreview = svgString;
      }

      $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        $(document).foundation('section', 'reflow');
      });
      $scope.setActiveAddElementTool = function(index){
        console.log(index);
        console.log("contentprevie",$scope.contentPreview)
        $scope.addElementDialog.selected = index;
        $scope.makeSvgPreview();
      };
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
    