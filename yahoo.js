$('#search').click(function(){
    $(this).text('Searching...')
    $('#city').html('')
    $('#info').html('')
    var UrlFromVal = encodeURIComponent($('#inp').val());
    $.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${UrlFromVal}%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`,
 		function(response){
 			$('#search').text('Search')
 			var title = response.query.results.channel.location
 			$('#city').append(title.city + ',' + title.country)
 			$.each(response.query.results.channel.item.forecast,
 			 function(){
 				$('#info').append ('<div class="days"><h4 class="w3-container w3-blue">' +
 					'Date: ' + this.date + '<br>' + 
 					'Day of week: ' + this.day + '<br>' +
 					'Maximum: ' + eval((this.high -32) * 5/9).toFixed(0) + '°C<br>' +
 					'Minimum: ' + eval((this.low -32) * 5/9).toFixed(0) + '°C<br>'+
 					this.text + '</h4></div>' )
 			})
 		}).fail(function(error){
 			alert('Not found')
 		})
})