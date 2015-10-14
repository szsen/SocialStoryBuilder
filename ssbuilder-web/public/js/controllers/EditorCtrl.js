/*jshint loopfunc: true */
//editor controller
angular.module('EditorCtrl', []).controller('EditorController', function($scope, $document) {
	console.log('Hello World');
	var imageSearch;
	
	function addImage(imgUrl) {
		console.log('clicked image');
		console.log(imgUrl);
		var input = document.getElementById('subject');
        input.value = imgUrl;
	}

	function searchComplete() {
		console.log('asdfdsf');
        // Check that we got results
        if (imageSearch.results && imageSearch.results.length > 0) {

          // Grab our content div, clear it.
          var contentDiv = document.getElementById('content');
          contentDiv.innerHTML = '';

          var results = imageSearch.results;
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
            newImg.src=result.tbUrl;
			newImg.setAttribute('realLink', result.url);
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
        // Create an Image Search instance.
        imageSearch = new google.search.ImageSearch();
        imageSearch.setResultSetSize(8);
        // Set searchComplete as the callback function when a search is 
        // complete.  The imageSearch object will have results in it.
        imageSearch.setSearchCompleteCallback(this, searchComplete, null);

        // Find me a beautiful car.
        imageSearch.execute($scope.searchQuery);
        
        // Include the required Google branding
        google.search.Search.getBranding('branding');
	};

	setTimeout(function(){
		google.load('search', '1', {'callback':''});
	}, 1000);

})
.directive('editor', function() {
	return {
		controller: 'EditorController',
		restrict: 'E',
		templateUrl: 'templates/editor.html'
	};
});