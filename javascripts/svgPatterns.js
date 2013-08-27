/*jshint undef: true, unused: true */
/*global $:false */
/*global document:false */
/*global angular:false */
/*global console:false */

    $(document).ready(function() {
      $(document).foundation('section', 'reflow');
      $(document).foundation();

      
    });

    function clone(obj) {
        // Handle the 3 simple types, and null or undefined
        if (null === obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            var copyArray = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copyArray[i] = clone(obj[i]);
            }
            return copyArray;
        }

        // Handle Object
        if (obj instanceof Object) {
            var copyObject = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copyObject[attr] = clone(obj[attr]);
            }
            return copyObject;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
    
    var SVGPatterns = angular.module('SVGPatterns', ['ngSanitize','localStorage','uiSlider']);
    SVGPatterns.config(function($routeProvider, $locationProvider){
      $locationProvider.html5Mode(true);
      $routeProvider.
        when('/', {templateUrl: 'partials/stages.html',   controller: AppController});
    });
  
    SVGPatterns.directive('integer', function(){
        return {
            require: 'ngModel',
            link: function(scope, ele, attr, ctrl){
                ctrl.$parsers.unshift(function(viewValue){
                    return parseInt(viewValue, 10);
                });
            }
        };
    });
    SVGPatterns.directive('viewboxEditor', function () {
      return {
          restrict: 'A',
          template: '<div>'+
            '<input class="prefixInput" ng-model="svg.viewBox" id="svgViewBox" type="text"/>'+
            '<div class="row collapse">'+
              '<div class="small-4 columns small-offset-4 large-offset-4"><a style="margin:0 0 0 0" ng-click="viewBoxButtons.upArrowButton();" class="button expand">&uparrow;</a></div>'+
            '</div>'+
            '<div class="row collapse">'+
              '<div class="small-4 columns"><a ng-click="viewBoxButtons.leftArrowButton();" class="button expand">&leftarrow;</a></div>'+
              '<div class="small-4 columns"><a ng-click="viewBoxButtons.downArrowButton();" class="button expand">&downarrow;</a></div>'+
              '<div class="small-4 columns"><a ng-click="viewBoxButtons.rightArrowButton();" class="button expand">&rightarrow;</a></div>'+
            '</div>'+
            '<div class="row collapse zoom">'+
              '<div class="small-4 columns"><a ng-click="viewBoxButtons.zoomInButton();" class="expand button">&plus;</a></div>'+
              '<div class="small-4 columns"><a ng-click="viewBoxButtons.zoomResetButton();" class="expand button">&boxbox;</a></div>'+
              '<div class="small-4 columns"><a ng-click="viewBoxButtons.zoomOutButton();" class="expand button">&minus;</a></div></div>'+
          '</div>',
          replace:true,
          link: function (scope, elem, attrs) {
            console.log('Smarty bluefin tuna',scope, elem, attrs);
          }
      };
    });
    SVGPatterns.directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        };
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
    });
  
    
    function AppController ($scope, $rootScope, $http, $store) {
      // Load pages on startup
      // console.log("Smarty Brown Bear");
      $scope.viewBoxButtons = {
        zoomOutButton : function(scale){
          if(scale===undefined){
              scale=100;
          }
          var viewBox = $scope.selected.stage.svgs[$scope.selected.svg].viewBox;
          var viewBoxParts = viewBox.split(" ");
          
          var x1 = viewBoxParts[0] = parseInt(viewBoxParts[0]) * 1.3;
          var y1 = viewBoxParts[1] = parseInt(viewBoxParts[1]) * 1.3;
          var x2 = viewBoxParts[2] = parseInt(viewBoxParts[2]) * 1.3;
          var y2 = viewBoxParts[3] = parseInt(viewBoxParts[3]) * 1.3;
          viewBox = viewBoxParts.join(" ");
          $scope.selected.stage.svgs[$scope.selected.svg].viewBox = viewBox.toString();
          
          console.log("zoomOutButton",$scope.selected.stage.svgs[$scope.selected.svg].viewBox,viewBoxParts);
        },
        zoomResetButton : function(scale){
          if(scale===undefined){
              scale=100;
          }
          var viewBox = $scope.selected.stage.svgs[$scope.selected.svg].viewBox;
          var viewBoxParts = viewBox.split(" ");
          
          
          
          $scope.selected.stage.svgs[$scope.selected.svg].viewBox = "0 0 400 400";
          
          console.log("zoomResetButton",$scope.selected.stage.svgs[$scope.selected.svg].viewBox,viewBoxParts);
        },
        zoomInButton : function(scale){
          if(scale===undefined){
              scale=100;
          }
          var viewBox = $scope.selected.stage.svgs[$scope.selected.svg].viewBox;
          var viewBoxParts = viewBox.split(" ");
          var x1 = viewBoxParts[0] = parseInt(viewBoxParts[0]) * .8;
          var y1 = viewBoxParts[1] = parseInt(viewBoxParts[1]) * .8;
          var x2 = viewBoxParts[2] = parseInt(viewBoxParts[2]) * .8;
          var y2 = viewBoxParts[3] = parseInt(viewBoxParts[3]) * .8;
          
          viewBox = viewBoxParts.join(" ");
          $scope.selected.stage.svgs[$scope.selected.svg].viewBox = viewBox.toString();
          
          console.log("zoomInButton",$scope.selected.stage.svgs[$scope.selected.svg].viewBox,viewBoxParts);
        },
        rightArrowButton : function(scale){
          if(scale===undefined){
              scale=100;
          }
          var viewBox = $scope.selected.stage.svgs[$scope.selected.svg].viewBox;
          var viewBoxParts = viewBox.split(" ");
          var x1 = viewBoxParts[0] = parseInt(viewBoxParts[0]) - scale;
          var y1 = viewBoxParts[1];
          var x2 = viewBoxParts[2] = parseInt(viewBoxParts[2]) - scale;
          var y2 = viewBoxParts[3];
          
          viewBox = viewBoxParts.join(" ");
          $scope.selected.stage.svgs[$scope.selected.svg].viewBox = viewBox.toString();
          
          console.log("rightArrowButton",$scope.selected.stage.svgs[$scope.selected.svg].viewBox,viewBoxParts);
        },
        downArrowButton : function(scale){
          if(scale===undefined){
              scale=100;
          }
          var viewBox = $scope.selected.stage.svgs[$scope.selected.svg].viewBox;
          var viewBoxParts = viewBox.split(" ");
          var x1 = viewBoxParts[0];
          var y1 = viewBoxParts[1] = parseInt(viewBoxParts[1])-scale;
          var x2 = viewBoxParts[2];
          var y2 = viewBoxParts[3] = parseInt(viewBoxParts[3])+scale;
          
          viewBox = viewBoxParts.join(" ");
          $scope.selected.stage.svgs[$scope.selected.svg].viewBox = viewBox.toString();
          
          console.log("downArrowButton",$scope.selected.stage.svgs[$scope.selected.svg].viewBox,viewBoxParts);
        },
        leftArrowButton : function(scale){
          if(scale===undefined){
              scale=100;
          }
          var viewBox = $scope.selected.stage.svgs[$scope.selected.svg].viewBox;
          var viewBoxParts = viewBox.split(" ");
          var x1 = viewBoxParts[0] = parseInt(viewBoxParts[0])+scale;
          var y1 = viewBoxParts[1];
          var x2 = viewBoxParts[2] = parseInt(viewBoxParts[2])+scale;
          var y2 = viewBoxParts[3];
          x1 += 100;
          x2 += 100;
          viewBox = viewBoxParts.join(" ");
          $scope.selected.stage.svgs[$scope.selected.svg].viewBox = viewBox.toString();
          console.log("leftArrowButton",$scope.selected.stage.svgs[$scope.selected.svg].viewBox,viewBoxParts);
          console.log("leftArrowButton:",viewBox,scale);
        },
        upArrowButton : function(scale){
          if(scale===undefined){
              scale=100;
          }
          var viewBox = $scope.selected.stage.svgs[$scope.selected.svg].viewBox;
          var viewBoxParts = viewBox.split(" ");
          var x1 = viewBoxParts[0];
          var y1 = viewBoxParts[1] = parseInt(viewBoxParts[1])+scale;
          var x2 = viewBoxParts[2];
          var y2 = viewBoxParts[3] = parseInt(viewBoxParts[3])-scale;
          
          viewBox = viewBoxParts.join(" ");
          $scope.selected.stage.svgs[$scope.selected.svg].viewBox = viewBox.toString();
          
          console.log("upArrowButton",$scope.selected.stage.svgs[$scope.selected.svg].viewBox,viewBoxParts);
        },
      }
      $scope.showStages = false;
      $scope.template = { name: 'stage.html', url: 'partials/stage.html'};
      
      // $http.get('pages.json').success(function (data) {
      //   $rootScope.pages = data;
      // });
      //     
      // Set the slug for menu active class
      // $scope.$on('routeLoaded', function (event, args) {
      //   $scope.slug = args.slug;
      // });
      $scope.reflowModal = function () {
        $('#addElement').foundation("reveal");
      };
      $scope.selected = {};
      $scope.selected.svg = 0;
      
      $scope.clickIndex = 0;
      
      $scope.svgTemplates = {};
      $scope.svgTemplates.stage = {};
      $scope.svgTemplates.stage.svgs = [];
      $scope.svgTemplates.stage.svgs.defaultValue = ({"name":{"text":"defaultSvg"},"width":"400px", "height":"400px", "content":""});
      $scope.svgTemplates.stage.name = {};
      $scope.svgTemplates.stage.name.text = "Default Name";
      $scope.svgTemplates.stage.name.css = "text-shadow:0px 0px 7px #000, 0px 0px 13px #fff";
      $scope.svgTemplates.stage.css = "text-shadow: 0px 0px 7px #000,0px 0px 13px #fff";
      $scope.backgroundColors = ["#58994C","#58994C","#999543","#999543"];
      $scope.colors = ["#FBFBFB","#FBFBFB","#304B21","#304B21"]; 

      // $scope.stages = [];
    //   $scope.stages.push(clone($scope.svgTemplates.stage));
    //   
      if($scope.addElementDialog === undefined){
        $http({"method":"GET","url":"./static/elements.json"}).success(function(response){
          $scope.addElementDialog.elements = response; 
        });
      }
      // console.log('shaggy Southern Dart frog',$scope.stages);
      $scope.resetStages = function(){
        // console.log('Smarty white-tailed deer');
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
        if($scope.stages===undefined){
          $scope.stages = {};
        }
      };
      if($scope.stages === undefined){
        console.log('Purple cheetah');
        $scope.resetStages();
      }
      $scope.showStages = true;

      $store.bind($scope,'stages');

      $scope.sectionReflow = function(){
        $(document).foundation('section', 'reflow');
        $('#addElement').on('opened', function () {
          console.log('Smarty greyhound');
          $(document).foundation('section', 'reflow');
        });
        console.log('Green Tiger Shark');

      };

      $scope.tools = [
          {"name" : "Add Stage",
            "function":"addStage"
          },
          {"name" : "Reset Stages",
            "function":"resetStages"
          }
        ];
      $scope.SVGTools = [
          {"name" : "Add SVG",
            "function":"addSvg"
          },
          {"name" : "Add Element",
            "function":"addElement"
          },
          {"name" : "koch Repeaters",
            "function":"kochMenu",
            "functions":[
              {"name":"Koch 1","function":"koch1"},
              {"name":"Koch 2","function":"koch2"},
              {"name":"Koch 3","function":"koch3"},
              {"name":"Koch 4","function":"koch4"},
              {"name":"Koch 5","function":"koch5"},
              {"name":"Koch 6","function":"koch6"},
              {"name":"Koch Flake","function":"kochFlake"}
              ]
          }
        ];
        
      $scope.addElementDialog =  {};
      $scope.addElementDialog.selected = 0;
      
      $scope.isAddElementActive = function(index){
        return index===$scope.addElementDialog.selected;
      };
      $scope.getElementByName = function(name){
        for (var i = $scope.addElementDialog.elements.length - 1; i >= 0; i--) {
          if(name === $scope.addElementDialog.elements[i].name){
            return $scope.addElementDialog.elements[i];            
          }
        }
      };
     
      $scope.clearElement = function(name){
        console.log($scope,name);
      };
     
    
      $scope.showAddElementDialog = false;
      
      $scope.addElement = function(){
        $scope.showAddElementDialog = true;
        $scope.makeSvgPreview();
        $('#addElement').foundation('reveal', 'open');
        
      };
      
      
      
      $scope.addStage = function(){
        $scope.stages.push(clone($scope.svgTemplates.stage));
        var index = $scope.stages.length-1;
        $scope.stages[index].backgroundColor = $scope.backgroundColors[index%$scope.backgroundColors.length];
        $scope.stages[index].color = $scope.colors[index%$scope.colors.length];
        $http.get('./API/getName.php').success(function (data) {
          if(data.toString() === ""){
            data = "New Svg";
          }
          $scope.stages[index].name.text = data.toString();
          
        });
      };
      
      $scope.addSvg = function(){
        $scope.selected.stage.svgs.push(clone($scope.svgTemplates.stage.svgs.defaultValue));        
        $scope.selectSvg($scope.selected.stage.svgs.length-1);
        
        var svg = $scope.selected.stage.svgs[$scope.selected.svg];
        svg.name.text = "New Name";
        $http.get('./API/getName.php').success(function (data) {
          svg.name.text = data.toString();
        });
        
        console.log("svg",svg)
        
        $(document).foundation('section', 'reflow');
      };     
   
      $scope.isSvgActive = function(index) {
        
           return index === $scope.selected.svg;
      };
      $scope.removeSvg = function(index){
         $scope.selected.stage.svgs.splice(index,1);
      };
      $scope.removeStage = function(index){
         $scope.stages.splice(index,1);
      };
      $scope.callMe = function(input){
        console.log("Call Me: ",input);
      };
      $scope.mod = function(modThis, byThis){
        return modThis%byThis;
      };
      $scope.selectSvg = function(index){
        // $scope.selected.svg = $scope.selected.stage.svgs[index];
        // $scope.selected.svg.index = index;
        $scope.selected.svg = index;
      };
      $scope.selectStage = function(index){
        $scope.selected.stage = $scope.stages[index];
        $scope.selected.stage.index = index;
        $scope.showSelectedStage = true;
      };
      $scope.showAddLineDialog = false;
      $scope.showStages = true;
      
      $scope.makeSvg = function(svg){
        var svgString = "<svg style='border:1px solid" + $scope.colors[ $scope.mod( $scope.selected.stage.index,$scope.colors.length)] +
                             "' width='" + svg.width + "' height='" + svg.height + "'";
        if(svg.viewBox !== ""){
          svgString += "viewBox='" + svg.viewBox + "'";
        }
        svgString+=" >"+svg.content+"</svg>";
        return svgString;
      };
      
      $scope.visibleHeight = function(){
        
        var visibleHeight = 400;
        if($scope.selected.stage !== undefined && $scope.selected.svg !== undefined){
          visibleHeight = $scope.selected.stage.svgs[$scope.selected.svg].Height;
        }else{
          return visibleHeight;
        }
        
        visibleHeight = $scope.selected.stage.svgs[$scope.selected.svg].height;
        
        if($scope.selected.stage.svgs[$scope.selected.svg].viewBox!== undefined){
          var viewbox = $scope.selected.stage.svgs[$scope.selected.svg].viewBox;
          var viewBoxArray = viewbox.split(" ");
          visibleHeight = viewBoxArray[3] - viewBoxArray[1];
        }
        
        return visibleHeight;
      };
      $scope.visibleWidth = function(){
        // console.log("$scope.selected.stage.svgs[$scope.selected.svg].", $scope.selected.stage.svgs[$scope.selected.svg]);
        var visibleWidth = 400;
        if($scope.selected.stage !== undefined && $scope.selected.svg !== undefined){
          if($scope.selected.stage.svgs[$scope.selected.svg]!== undefined )
            visibleWidth = $scope.selected.stage.svgs[$scope.selected.svg].width;
        }else{
          return visibleWidth;
        }
        if($scope.selected.stage.svgs[$scope.selected.svg].viewBox!== undefined){
          var viewbox = $scope.selected.stage.svgs[$scope.selected.svg].viewBox;
          var viewBoxArray = viewbox.split(" ");
          visibleWidth  = viewBoxArray[2] - viewBoxArray[0];
        }
        return visibleWidth;
      };
      $scope.previewClickEnabled = false;
      $scope.enablePreviewClick = function(){
        $scope.previewClickEnabled = true;
          
      };
      $scope.previewClick = function($events){
        
        //var svg = $scope.selected.stage.svgs[$scope.selected.svg];
        var selectedTool = $scope.addElementDialog.selected || 0;

        if($scope.previewClickEnabled === false){
          return;
        }
        //drop out all non clicking tag elements
        if($scope.addElementDialog.elements[selectedTool].tags.clickable === undefined){
          return;
        }

        
        //var vars = $scope.addElementDialog.elements[selectedTool].tags.clickable.attributes[0].variables;
        var values = $scope.addElementDialog.elements[selectedTool].tags.clickable.attributes[0].values;
        // console.log('frightened Yellow-banded Dart frog',$scope.addElementDialog.elements);
        // var values = $scope.addElementDialog.elements[selectedTool].tags.clickable.attributes[0].values;

        $scope.lastMouseClick =  [($events.offsetX),($events.offsetY)];
        $scope.clickIndex += 1;

        values[$scope.clickIndex%values.length] = $scope.lastMouseClick;
        
        $scope.makeSvgPreview();          
      };
      $scope.doNothing = function(){
        
      };
      
      $scope.kochMenu = function(){
        console.log('filthy Mew Gull');
      }
      $scope.koch1 = function(){
        var oldWidth = $scope.visibleWidth().toString;
        var oldHeight = $scope.visibleHeight().toString;
        var oldSvg = $scope.selected.stage.svgs[$scope.selected.svg];
        $scope.addSvg();
        var newSvg = $scope.selected.stage.svgs[$scope.selected.stage.svgs.length-1];
        
        var id = "koch0";
        console.log('Smarty mako shark',oldSvg);
        newSvg.content = "<defs><g id='"+id+"'>"+oldSvg.content+"</g></defs>";
        newSvg.content += "<use xlink:href='#"+id+"'/>"
                +"<use xlink:href='#"+id+"'/>"
                +"<use xlink:href='#"+id+"' transform ='translate(900) rotate(-60,0,900)'/>"
                +"<use xlink:href='#"+id+"' transform ='rotate(60,1800,900) translate(900)'/>"
                +"<use xlink:href='#"+id+"' transform ='translate(1800)'/>";
        newSvg.viewBox = "-100 0 10000 12000"

        
        
      }
      $scope.koch2 = function(){

        var oldWidth = $scope.visibleWidth().toString;
        var oldHeight = $scope.visibleHeight().toString;
        var oldSvg = $scope.selected.stage.svgs[$scope.selected.svg];
        $scope.addSvg();
        var newSvg = $scope.selected.stage.svgs[$scope.selected.stage.svgs.length-1];
        
        var id = "koch0";
        console.log('Smarty mako shark',oldSvg);
        newSvg.content = "<defs><g id='"+id+"'>"+oldSvg.content+"</g>";
        
        newSvg.content +=  "<g id ='koch1' transform ='translate(0,600) scale( 0.3333333)'>"+
                "  <use xlink:href='#koch0'/>"+
                "  <use xlink:href='#koch0' transform='translate(900) rotate(-60,0,900)'/>"+
                "  <use xlink:href='#koch0' transform='rotate(60,1800,900) translate(900)'/>"+
                "  <use xlink:href='#koch0' transform='translate(1800)'/>"+
                "</g> "+
                "<g id='koch2' transform ='translate(0,600) scale(0.3333333)'>"+
                "  <use xlink:href='#koch1'/>"+
                "  <use xlink:href='#koch1' transform='translate(900) rotate(-60,0,900)'/>"+
                "  <use xlink:href='#koch1' transform ='rotate(60,1800,900) translate( 900)'/> "+
                "  <use xlink:href='#koch1' transform ='translate(1800)'/> "+
                "</g></defs><use xlink:href='#koch2'/>";
        newSvg.viewBox = "-100 0 1000 1200";
      }
      $scope.koch3 = function(){
        $scope.kochToTheN(3)  
      }
      $scope.koch4 = function(){
        $scope.kochToTheN(4)  
      }
      $scope.koch5 = function(){
        $scope.kochToTheN(5)  
      }
      $scope.koch6 = function(){
        $scope.kochToTheN(6)  
      }
      $scope.kochFlake = function (){
        var oldWidth = $scope.visibleWidth().toString;
        var oldHeight = $scope.visibleHeight().toString;
        var oldSvg = $scope.selected.stage.svgs[$scope.selected.svg];
        $scope.addSvg();
        var newSvg = $scope.selected.stage.svgs[$scope.selected.stage.svgs.length-1];
        
        var id = "kochFlakeSrc";
        console.log('Smarty mako shark',oldSvg);
        newSvg.content = "<defs><g id='"+id+"'>"+oldSvg.content+"</g>";
        newSvg.content +=  "<g id='kochFlakeSide' transform='scale(0.3333333)'>"+
                  "<use xlink:href='#kochFlakeSrc'/>"+
                  "<use xlink:href='#kochFlakeSrc' transform='translate(900) rotate(-60,0,900)'/>"+
                  "<use xlink:href='#kochFlakeSrc' transform='rotate(60,1800,900) translate( 900)'/>"+
                  "<use xlink:href='#kochFlakeSrc' transform='translate(1800)'/>"+
                  "</g>"+
                  "</defs>"+
                  "<use xlink:href='#kochFlakeSide'/>"+
                  "<use xlink:href='#kochFlakeSide' transform='rotate(60,0,300) translate( 900) rotate( 180,0,300)'/>"+
                  "<use xlink:href='#kochFlakeSide' transform='rotate(-60,900,300) translate( 900) rotate( 180,0,300)' />";

        
        newSvg.viewBox = "-100 0 1000 1200"

        
        
      }
      $scope.kochToTheN = function(n){
        console.log('silky gnu');
        var oldWidth = $scope.visibleWidth().toString;
        var oldHeight = $scope.visibleHeight().toString;
        console.log('lazy Brown Bear',oldWidth,oldHeight);
        var oldSvg = $scope.selected.stage.svgs[$scope.selected.svg];
        $scope.addSvg();
        var newSvg = $scope.selected.stage.svgs[$scope.selected.stage.svgs.length-1];
        
        var id = "koch";
        var levels = n;
        
        console.log('Smarty mako shark',oldSvg);
        newSvg.content = "<defs><g id='"+id+"0'>"+oldSvg.content+"</g>";
        
        for (var i = 1; i < levels; i++) {
          console.log('Smarty greyhound',(id+(i-1)));
          newSvg.content +=  "<g id='"+id+i+"' transform ='translate(0,600) scale( 0.3333333)'>"+
                "  <use xlink:href='#"+id+(i-1)+"'/>"+
                "  <use xlink:href='#"+id+(i-1)+"' transform='translate(900) rotate(-60,0,900)'/>"+
                "  <use xlink:href='#"+id+(i-1)+"' transform='rotate(60,1800,900) translate(900)'/>"+
                "  <use xlink:href='#"+id+(i-1)+"' transform='translate(1800)'/>"+
                "</g>";
        }
        newSvg.content += "</defs>"+
                "<use xlink:href='#koch"+(levels-1)+"'/>";
        newSvg.viewBox = "-100 0 1000 1200";
      };
      $scope.confirmElement = function(name){
        var element = $scope.getElementByName(name);
        // console.log(element);
        var theString = "<"+name;
        for (var i = Object.keys(element.tags).length - 1; i >= 0; i--) {
          var inputType = element.tags[Object.keys(element.tags)[i]];
          // console.log("inputType",inputType);
          for (var ii = inputType.attributes.length - 1; ii >= 0; ii--) {
            var attribute = inputType.attributes[ii];
            if( attribute.variable !== undefined || attribute.value !== undefined  )
            {
              theString += " "+attribute.variable+"='"+attribute.value+"'";              
            }else{
              for (var iii = attribute.values.length - 1; iii >= 0; iii--) {
                var values = attribute.values[iii];
                var vars = attribute.variables[iii];
                for (var iiii = 0; iiii < values.length; iiii++) {
                  var value = values[iiii];
                  var variable = vars[iiii];
                  theString += " "+ variable + "='" + value+"'";
                }
              }
              
            }
          }
        
        if(inputType.stopRenderIfChanged === true){
          // console.log(element.globalVars);
          for (var c = element.globalVariables.length - 1; c >= 0; c--) {
            var attribute = element.globalVariables[c];
            theString += " "+attribute.variable+"='"+attribute.value+"'";
          } 
          break;
        }
          
        }
          if(element.autoCloseTag === true){            
             theString +="/>";
          }else{
             theString +="></"+name+">";
          }
          $scope.selected.stage.svgs[$scope.selected.svg].content += theString;
           // console.log(theString);
          $('#addElement').foundation('reveal', 'close');
      };
      
      $scope.showTool = function(name){
        $scope.showToolNamed = {};
        $scope.showToolNamed.name = true;
      }
      $scope.addElementPreview = function(name){
        var element = $scope.getElementByName(name);

        var theString = "<"+name;

        for (var i = Object.keys(element.tags).length - 1; i >= 0; i--) {
          var inputType = element.tags[Object.keys(element.tags)[i]];
          for (var ii = inputType.attributes.length - 1; ii >= 0; ii--) {
            var attribute = inputType.attributes[ii];
            if( attribute.variable !== undefined || attribute.value !== undefined  )
            {
              theString += " "+attribute.variable+"='"+attribute.value+"'";              
            }else{
              for (var iii = attribute.values.length - 1; iii >= 0; iii--) {
                var values = attribute.values[iii];
                var vars = attribute.variables[iii];
                for (var iiii = 0; iiii < values.length; iiii++) {
                  var value = values[iiii];
                  var variable = vars[iiii];
                  theString += " "+ variable + "='" + value+"'";
                  // console.log(theString)
                }
              }
            }
          }
          
          if(inputType.stopRenderIfChanged === true){
            // console.log(element.globalVars);            
              for (var c = element.globalVariables.length - 1; c >= 0; c--) {
                var attribute = element.globalVariables[c];
          
          
                theString += " "+attribute.variable+"='"+attribute.value+"'";

            
              }
          }
        }

        if(element.autoCloseTag === true){            
           theString +="/>";
        }else{
           theString +="></"+name+">";
        }
         
          $scope.contentElementPreview = theString;
      };
      $scope.selectOptionForVar = function(index, attribute){
        console.log('Smarty horse',attribute);
        if( attribute.values !== undefined){
          attribute.value = attribute.selectedValue;
          console.log('strong pig');
        }
      }
      $scope.makeSvgPreview = function(){
        var svg = $scope.selected.stage.svgs[$scope.selected.svg];
        
        var svgString = "<svg style='border:1px solid" + $scope.colors[ $scope.mod( $scope.selected.stage.index,$scope.colors.length)] + "'";
        
        if( svg.width !== "" || svg.width !== undefined)
          { svgString += " width='" + $scope.visibleWidth() + "'"; }else{ svgString += " width='250'"; }
        if( svg.height !== ""|| svg.height !== undefined)
          { svgString += " height='" + $scope.visibleHeight() + "'"; }else{ svgString += " height='250'"; }
        if( svg.viewBox !== "" )
          { svgString += " viewBox='"  + svg.viewBox + "'";}
          
        $scope.addElementPreview($scope.addElementDialog.elements[$scope.addElementDialog.selected].name);
        svgString+=" >"+$scope.selected.stage.svgs[$scope.selected.svg].content+$scope.contentElementPreview+"</svg>";
        $scope.contentPreview = svgString;
        
      }

      $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        // console.log('Green striped marlin');
        $("#thisThingy").foundation('section', 'reflow');
        $(document).foundation('section', 'reflow');
      });
      $scope.setActiveAddElementTool = function(index){
        $scope.addElementDialog.selected = index;
        $scope.makeSvgPreview();
      };
    };
    
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
    