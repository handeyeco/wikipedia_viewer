(function () {

	$("#search-wiki").submit(function (e) {
		e.preventDefault();
		var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&callback=?&gsrsearch=" + $('#search-input').val();

		$.getJSON(url,
			function (data) {
				var results = [];

				//Reduce results to an array of objects
				for (var key in data.query.pages) {
					results.push(data.query.pages[key]);
				}

				//Sort result array by Wikipedia's "index"
				results.sort(function (a, b) {
					return a.index - b.index;
				});

				//Function to add some style to the result extract
				function extractEllipsis(text) {
					return text.trim().replace(/\W$/gim, "...");
				}

				//Update result-container div
				$('body').animate({'padding-top': 20}, 'fast', function () {
					$('#result-container').empty();
					results.forEach(function (e) {
						$('<a href="https://en.wikipedia.org/?curid=' +
							e.pageid +
							'"><div class="result"><h3>' +
							e.title +
							'</h3><p>' +
							extractEllipsis(e.extract) +
							'</p></div></a>').appendTo('#result-container');
					});
				});

				//Empty search form and remove focus
				$("#search-input").val('').blur();
			});
	});

})(jQuery);
