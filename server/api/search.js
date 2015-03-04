/* Search API */

/* dependencies */
var soap    = require('soap'),
	soapUrl = 'http://www.webservicex.net/BibleWebservice.asmx?WSDL';


module.exports = {
  get: function (req, res) {
	/* SOAP call example */
	soap.createClient(soapUrl, function(err, client) {
		client.GetBookTitles(function(err, result) {
			var a = result.GetBookTitlesResult[0].split('<BookTitle>'),
					b = '',
					c = [];

			a.shift();

			for (var i = 0; i < a.length; i++ ) {
				b = a[i].split("</BookTitle>")[0];
				c.push(b);
			}

			res.json(200, {
				results: c
			});
		});
	});
  }
};