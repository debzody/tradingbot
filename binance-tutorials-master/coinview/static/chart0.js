var chart0 = LightweightCharts.createChart(document.getElementById('chart0'), {
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
	priceFormat: {
                                            type: 'custom',
                                            minMove: '0.00000001',
                                            formatter: (price) => {
                                                if (price < 0.001) return parseFloat(price).toFixed(8)
                                                else if (price >= 0.001 && price < 1) return parseFloat(price).toFixed(6)
                                                else return parseFloat(price)
                                            }
                                        },
	priceScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
		autoScale: true
	},
	timeScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
		timeVisible: true,
		secondsVisible: false,
	},
	localization: {
                                            locale: 'en-US',
                                            priceFormatter:  (price) => {
                                                if (price < 0.001) return parseFloat(price).toFixed(8)
                                                else if (price >= 0.001 && price < 1) return parseFloat(price).toFixed(6)
                                                else return parseFloat(price)
                                            }
                                        },
});

var candleSeries0 = chart0.addCandlestickSeries({
	upColor: '#00ff00',
	downColor: '#ff0000',
	borderDownColor: 'rgba(255, 144, 0, 1)',
	borderUpColor: 'rgba(255, 144, 0, 1)',
	wickDownColor: 'rgba(255, 144, 0, 1)',
	wickUpColor: 'rgba(255, 144, 0, 1)',
});

fetch('http://127.0.0.1:5000/historybtcdown',
	{mode: 'no-cors',
	headers: {
	 	'Access-Control-Allow-Origin': '*'
	 // 'Content-Type': 'application/x-www-form-urlencoded',
	}})
	.then(r => r.json())
	.then(response => {
 		candleSeries0.setData(response);
	});

chart0.timeScale().fitContent();
var binanceSocket0 = new WebSocket("wss://stream.binance.com:9443/ws/btcdownusdt@kline_1m");

binanceSocket0.onmessage = function (event) {
	var message0 = JSON.parse(event.data);

	var candlestick0 = message0.k;

	console.log(candlestick0)

	candleSeries0.update({
		time: candlestick0.t / 1000,
		open: candlestick0.o,
		high: candlestick0.h,
		low: candlestick0.l,
		close: candlestick0.c
	})
}
