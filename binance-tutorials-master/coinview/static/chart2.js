var chart2 = LightweightCharts.createChart(document.getElementById('chart2'), {
	width: 600,
		height: 400,
	layout: {
		backgroundColor: '#000000',
		textColor: 'rgba(255, 255, 255, 0.9)',
	},
	grid: {
		vertLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
		horzLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
	},
	crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	},
	priceScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
	},
	timeScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
		timeVisible: true,
		secondsVisible: false,
	},
});

var candleSeries2 = chart2.addCandlestickSeries({
	upColor: '#00ff00',
	downColor: '#ff0000',
	borderDownColor: 'rgba(255, 144, 0, 1)',
	borderUpColor: 'rgba(255, 144, 0, 1)',
	wickDownColor: 'rgba(255, 144, 0, 1)',
	wickUpColor: 'rgba(255, 144, 0, 1)',
});

fetch('http://127.0.0.1:5000/historyeth',
	{mode: 'no-cors',
	headers: {
	 	'Access-Control-Allow-Origin': '*'
	 // 'Content-Type': 'application/x-www-form-urlencoded',
	}})
	.then(r => r.json())
	.then(response => {
 		candleSeries2.setData(response);
	});

chart2.timeScale().fitContent();
var binanceSocket2 = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@kline_1m");

binanceSocket2.onmessage = function (event) {
	var message2 = JSON.parse(event.data);

	var candlestick2 = message2.k;

	console.log(candlestick2)

	candleSeries2.update({
		time: candlestick2.t / 1000,
		open: candlestick2.o,
		high: candlestick2.h,
		low: candlestick2.l,
		close: candlestick2.c
	})
}
