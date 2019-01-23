// Exercise 27: Stock Ticker
function twentyseven(pricesNASDAQ, printRecord) {
	var microsoftPrices,
		now = new Date(),
		tenDaysAgo = new Date( now.getFullYear(), now.getMonth(), now.getDate() - 10);

	// use filter() to filter the trades for MSFT prices recorded any time after 10 days ago
	microsoftPrices =
		pricesNASDAQ.
			filter(priceRecord => 	 // finish this expression
                priceRecord.name==='MSFT' && priceRecord.timeStamp > tenDaysAgo);
        // Print the trades to the output console
        microsoftPrices.
            forEach(function(priceRecord) {
                printRecord(priceRecord);
            });
    }
		