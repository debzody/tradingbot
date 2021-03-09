var chart1 = LightweightCharts.createChart(document.getElementById('chart1'), {
	width: 550,
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

var candleSeries1 = chart1.addCandlestickSeries({
	upColor: '#00ff00',
	downColor: '#ff0000',
	borderDownColor: 'rgba(255, 144, 0, 1)',
	borderUpColor: 'rgba(255, 144, 0, 1)',
	wickDownColor: 'rgba(255, 144, 0, 1)',
	wickUpColor: 'rgba(255, 144, 0, 1)',
});

fetch('http://127.0.0.1:5000/historybnb',
	{mode: 'no-cors',
	headers: {
	 	'Access-Control-Allow-Origin': '*'
	 // 'Content-Type': 'application/x-www-form-urlencoded',
	}})
	.then(r => r.json())
	.then(response => {
 		candleSeries1.setData(response);
	});
chart1.timeScale().fitContent();

var binanceSocket1 = new WebSocket("wss://stream.binance.com:9443/ws/bnbusdt@kline_1m");

binanceSocket1.onmessage = function (event) {
	var message1 = JSON.parse(event.data);

	var candlestick1 = message1.k;

	console.log(candlestick1)

	candleSeries1.update({
		time: candlestick1.t / 1000,
		open: candlestick1.o,
		high: candlestick1.h,
		low: candlestick1.l,
		close: candlestick1.c
	})
}
