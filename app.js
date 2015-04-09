var topapp = (function()
{
	// Application object.
	var bottomapp = {};
	// Dictionary of beacons.
	var beacons = {};
	// Timer that displays list of beacons.
	var updateTimer = null;

	bottomapp.initialize = function()
	{
		document.addEventListener('deviceready', onDeviceReady, false);
	};

	function onDeviceReady()
	{
    ble = evothings.ble;
		startScan();
		updateTimer = setInterval(displayBeaconList, 1000);
	}

	function startScan()
	{
    evothings.ble.startScan()
		function onBeaconsRanged(beaconInfo)
		{
			for (var i in beaconInfo.beacons)
			{
				var beacon = beaconInfo.beacons[i];
				if (beacon.rssi < 0)
				{
					beacon.timeStamp = Date.now();
					var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
					beacons[key] = beacon;
				}
			}
		}

		function onError(errorMessage)
		{
			console.log('Ranging beacons did fail: ' + errorMessage);
		}

		estimote.beacons.requestAlwaysAuthorization();
		estimote.beacons.startRangingBeaconsInRegion({}, onBeaconsRanged, onError);
	}

	function displayBeaconList()
	{


		$.each(beacons, function(key, beacon) {


			if(beacon.distance < 0.2) {

					if(beacon.major == 8981 && beacon.minor == 49281) {
						$('body').css('background-color', 'green');
					}
					if (beacon.major == 33613 && beacon.minor == 1285) {
             $('body').css('background-color', 'blue');
					}
					if (beacon.major == 56449 && beacon.minor == 6595) {
						$('body').css('background-color', 'purple');
					}
					if (beacon.major == 4851 && beacon.minor == 360) {
						$('body').css('background-color', '#00FF00');
					}
					if (beacon.major == 23124 && beacon.minor == 41840) {
						$('body').css('background-color', '#3366FF');
					}
			};
		});
	}

	return bottomapp;
})();

topapp.initialize();