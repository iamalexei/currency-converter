new Vue ({
	el: '.app',
	data: {
		apiData: '',
		currencyFrom: '',
		currencyTo: '',
		currencyList: ["USD"],
		amount: 1,
		swapCurrencies: false
	},
	created: function() {
		this.getCurrencyList();
	},
	methods: {
		getExchangeRate: function(b, s) {
			var url = "http://api.fixer.io/latest?base=" + b + "&symbols=" + s;
			this.$http.get(url).then( function(response) {
				if(response.body.rates[s] == null) {
					this.apiData = this.amount;
				} else {
					this.apiData = response.body.rates[s] * this.amount;
				};
				this.swapCurrencies = true;
			});
		},
		getCurrencyList: function(){
			this.$http.get('http://api.fixer.io/latest?base=USD').then( function(response) {
				var getRates = response.body.rates;
				for (rate in getRates) {
					this.currencyList.push(rate);
				}
			});
		},
		swap: function(){
			[this.currencyFrom, this.currencyTo] = [this.currencyTo, this.currencyFrom];
			this.getExchangeRate(this.currencyFrom, this.currencyTo, this.amount);
		}
	}
})