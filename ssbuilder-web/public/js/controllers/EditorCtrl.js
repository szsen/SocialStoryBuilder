/*jshint loopfunc: true */
//editor controller
angular.module('EditorCtrl', []).controller('EditorController', function($scope, $document, $attrs, $http) {
  var imageSearch;
  console.log('paneldata');
  var paneldata = JSON.parse($attrs.paneldata);
  $scope.formUrl = "/update-panel/"+ paneldata._id + "/"+ paneldata.ind;
  $scope.caption = paneldata.caption;
  $scope.image = paneldata.url;

  function addImage(imgUrl) {
    var input = document.getElementById('subject');
    input.value = imgUrl;
    var img = document.getElementById('imgSrc');
    img.src = imgUrl;
  }

  function searchComplete(response) {
        // Check that we got results
        if (response.data.items && response.data.items.length > 0) {

          // Grab our content div, clear it.
          var contentDiv = document.getElementById('content');
          contentDiv.innerHTML = '';

          var results = response.data.items;
          for (var i = 0; i < results.length; i++) {
            // For each result write it's title and image to the screen
            var result = results[i];
            var imgContainer = document.createElement('div');
            var title = document.createElement('div');
            
            // We use titleNoFormatting so that no HTML tags are left in the 
            // title
            title.innerHTML = result.titleNoFormatting;
            var newImg = document.createElement('img');

            // There is also a result.url property which has the escaped version
            newImg.src=result.image.thumbnailLink;
            newImg.setAttribute('realLink', result.link);
            newImg.setAttribute('style', 'display:block; margin:auto; padding:10px;');
            newImg.addEventListener("click", function(e){
            addImage(e.target.attributes[1].value);
            }, false);
            //imgContainer.appendChild(title);
            imgContainer.appendChild(newImg);

            // Put our title + image in the content
            contentDiv.appendChild(imgContainer);
          }
        }
      }

      $scope.search = function() {
        console.log('in search');

        // Find me a beautiful car.
        console.log($scope.searchQuery);
        //console.log(imageSearch.execute($scope.searchQuery));
        var cx = '018124525132556857150:uirayrb6cp0';
        $http({
          method: 'GET',
          url: 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAg7vvZmykQsIWuyyKu-Jvj2AdshF3y7c8&cx=018124525132556857150:uirayrb6cp0&searchType=image&imgType=clipart&q=' + $scope.searchQuery + ' clipart'
        }).then(function successCallback(response) {
            console.log(response);
            searchComplete(response);
            // this callback will be called asynchronously
            // when the response is available
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
  };

  setTimeout(function(){
    google.load('search', '1', {'callback':''});
  }, 1000);

})
.directive('editor', function() {
  return {
    controller: 'EditorController',
    restrict: 'E',
    templateUrl: '/templates/editor.html'
  };
});