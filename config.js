exports.config = {
	// URL for geocoding an address (returns division & ward as a compositie value).
	geo_url: 'http://gis.phila.gov/arcgis/rest/services/ElectionGeocoder/GeocodeServer/findAddressCandidates?Street=%address%&Single+Line+Input=&category=&outFields=division&maxLocations=United+States&outSR=&searchExtent=&location=&distance=&magicKey=&f=pjson',
	// URL for Philadelphia polling lookup API.
	poll_url: 'http://api.phila.gov/polling-places/v1/?ward=%ward%&division=%division%'
}