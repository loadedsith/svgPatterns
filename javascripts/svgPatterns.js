    $(document).ready(function() {

      $(document).foundation();

    });
    //worked fine, but for some reason broke Foundation Reveal
    // Object.prototype.clone = function() {
    //   var newObj = (this instanceof Array) ? [] : {};
    //   for (i in this) {
    //     if (i == 'clone') continue;
    //     if (this[i] && typeof this[i] == "object") {
    //       newObj[i] = this[i].clone();
    //     } else newObj[i] = this[i]
    //   } return newObj;
    // };
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
      $scope.svgTemplates.stage.name.css = "text-shadow:0px 0px 3px #fff, 0px 0px 2px #000";
      $scope.svgTemplates.stage.css = "text-shadow:0px 0px 3px #fff, 0px 0px 2px #000";
      $scope.backgroundColors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]; 
      $scope.colors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"].reverse(); 
      // $scope.colors.reverse(); 

      $scope.stages = [];
      $scope.stages.push(clone($scope.svgTemplates.stage));
      
      $scope.stages[0].svgs[0]={"name":{"text":"Triangle Path"},"width":"4cm", "height":"4cm","viewBox":"0 0 400 400", "content":"<rect x='1' y='1' width='398' height='398' fill='none' stroke='blue' /><path d='M 100 100 L 300 100 L 200 300 z' fill='red' stroke='blue' stroke-width='3' />"};
      $scope.stages[0].name.text = "Mozilla Example Svg";
      $scope.stages[0].backgroundColor = $scope.backgroundColors[0];
      $scope.stages[0].color = $scope.colors[0];
      $scope.tools = [
          {"name" : "Add Stage",
            "function":"addStage"
          }
        ];
      $scope.SVGTools = [
          {"name" : "Add SVG",
            "function":"addSvg"
          },
          // {"name" : "Add Line",
//             "function":"addLine"
//           },
          // {"name" : "Add Ellipse",
  //           "function":"addEllipse"
  //         },
          {"name" : "Add Element",
            "function":"addElement"
          }
        ];
        
      $scope.addElementDialog =  {};
      $scope.addElementDialogValues =  {};
      $scope.addElementDialog.elements =  
      [
        {
          "name":"line",
          "autoCloseTag":true,
          "arguments":
          [
                {"var":"x1","name":"x1","type":"text","value":15},
                {"var":"y1","name":"y1","type":"text","value":15},
                {"var":"x2","name":"x2","type":"text","value":45},
                {"var":"y2","name":"y2","type":"text","value":45},
                {"var":"stroke","name":"Stroke","type":"text","value":"Black"},
                {"var":"stroke-width","name":"Stroke Width","type":"text","value":3}
          ]
        },
        {
          "name":"ellipse",
          "autoCloseTag":true,
          "arguments":
          [
                {"var":"cx","name":"cx","type":"text","value":15},
                {"var":"cy","name":"cy","type":"text","value":15},
                {"var":"rx","name":"rx","type":"text","value":45},
                {"var":"ry","name":"ry","type":"text","value":45},
                {"var":"fill","name":"fill","type":"text","value":"Blue"},
                {"var":"stroke","name":"Stroke","type":"text","value":"Black"},
                {"var":"stroke-width","name":"Stroke Width","type":"text","value":3}
          ]
        }
      ];
      
      
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
        
          for (var i = element.arguments.length - 1; i >= 0; i--) {
            var argument = element.arguments[i];
            theString += " "+argument.var+"='"+argument.value+"'";
          }
          
          if(element.autoCloseTag === true){            
             theString +="/>";
          }else{
             theString +="></"+name+">";
          }
          $scope.selected.stage.svgs[$scope.selected.svg].content += theString;
          // console.log(theString);
        
      }
      $scope.clearElement = function(name){
        console.log($scope)
        
      }
      $scope.addLineDialog =  {};
      
      $scope.addLineDialog.text ="x1='15' y1='15' x2='45' y2='45' stroke='Black' stroke-width='3'";
      
      $scope.addLineDialog.x1 = "15";
      $scope.addLineDialog.y1 = "15";
      $scope.addLineDialog.x2 = "45";
      $scope.addLineDialog.y2 = "45";
      $scope.addLineDialog.stroke = "Black";
      $scope.addLineDialog.strokeWidth = "3";
      
      
      $scope.addEllipseDialog =  {};
      $scope.addEllipseDialog.text ="cx='15' cy='15' rx='45' ry='45' stroke='Black' strokeWidth='3' fill='Blue'";
      
      $scope.addEllipseDialog.cx = "15";
      $scope.addEllipseDialog.cy = "15";
      $scope.addEllipseDialog.rx = "45";
      $scope.addEllipseDialog.ry = "45";
      $scope.addEllipseDialog.stroke = "Black";
      $scope.addEllipseDialog.strokeWidth = "3";
      $scope.addEllipseDialog.fill = "Blue";

      $scope.showAddElementDialog = false;
      
      $scope.addElement = function(){
        $scope.showAddElementDialog = true;
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
      $scope.addLine = function(){
        $scope.showAddLineDialog = true;  
      }
      $scope.confirmLineText = function(){
            var svg = $scope.selected.stage.svgs[$scope.selected.svg];
            svg.content = svg.content + "<line "+$scope.addLineDialog.text+"/>";
            $scope.showAddLineDialog = false;
          }
      $scope.confirmLineVars = function(){
            var svg = $scope.selected.stage.svgs[$scope.selected.svg];
            svg.content = svg.content + "<line "+" x1='" + $scope.addLineDialog.x1 + "' "+
                                                  "y1='" + $scope.addLineDialog.y1 + "' "+
                                                  "x2='" + $scope.addLineDialog.x2 + "' "+
                                                  "y2='" + $scope.addLineDialog.y2 + "' "+
                                                  "stroke='" + $scope.addLineDialog.stroke + "' "+
                                                  "stroke-width='" + $scope.addLineDialog.strokeWidth + "' />";
            $scope.showAddLineDialog = false;
          }
      $scope.clearAddLineDialogText = function(){
        $scope.addLineDialog.text = "";
      }
      $scope.clearAddLineDialogVars = function(){        
        $scope.addLineDialog.x1 = "";
        $scope.addLineDialog.y1 = "";
        $scope.addLineDialog.x2 = "";
        $scope.addLineDialog.y2 = "";

      }
      
      
      
      $scope.addEllipse = function(){
        $scope.showAddEllipseDialog = true;  
      }
      $scope.confirmEllipseText = function(){
            var svg = $scope.selected.stage.svgs[$scope.selected.svg];
            svg.content = svg.content + "<ellipse "+$scope.addEllipseDialog.text+"/>";
            $scope.showAddEllipseDialog = false;
          }
      $scope.confirmEllipseVars = function(){
            var svg = $scope.selected.stage.svgs[$scope.selected.svg];
            svg.content = svg.content + "<ellipse "+" cx='" + $scope.addEllipseDialog.cx + "' "+
                                                  "cy='" + $scope.addEllipseDialog.cy + "' "+
                                                  "rx='" + $scope.addEllipseDialog.rx + "' "+
                                                  "ry='" + $scope.addEllipseDialog.ry + "' "+
                                                  "stroke='" + $scope.addEllipseDialog.stroke + "' "+
                                                  "stroke-width='" + $scope.addEllipseDialog.strokeWidth + "' "+
                                                  "fill='" + $scope.addEllipseDialog.fill + "' />";
            $scope.showAddEllipseDialog = false;
          }
      $scope.clearAddEllipseDialogText = function(){
        $scope.addEllipseDialog.text = "";
      }
      $scope.clearAddEllipseDialogVars = function(){        
        $scope.addEllipseDialog.cx = "";
        $scope.addEllipseDialog.cy = "";
        $scope.addEllipseDialog.rx = "";
        $scope.addEllipseDialog.ry = "";
        $scope.addEllipseDialog.stroke = "";
        $scope.addEllipseDialog.strokeWidth = "";
        $scope.addEllipseDialog.fill = "";

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
    