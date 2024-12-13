using Finance.Application.Interfaces;
using Finance.Domain.Entities;
using Finance.Domain.Services;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

namespace Finance.Application.Services
{
    public class CryptoCurrencyService : ICryptoCurrencyService
    {
        private readonly ICryptoCurrencyRepository _cryptoCurrencyRepository;
        private readonly ILogger<CryptoCurrencyService> _logger;

        public CryptoCurrencyService(
            ICryptoCurrencyRepository cryptoCurrencyRepository,
            ILogger<CryptoCurrencyService> logger)
        {
            _cryptoCurrencyRepository = cryptoCurrencyRepository;
            _logger = logger;
        }

        public async Task FetchAndStoreCryptoDataAsync()
        {
            using var client = new HttpClient();
            var url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

            var response = await client.GetAsync(url);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var data = JArray.Parse(content);

                foreach (var item in data)
                {
                    var symbol = item["symbol"]?.ToString();
                    var name = item["name"]?.ToString();
                    var currentPrice = item["current_price"]?.ToObject<decimal?>();
                    var marketCap = item["market_cap"]?.ToObject<decimal?>();
                    var totalVolume = item["total_volume"]?.ToObject<decimal?>();

                    var crypto = await _cryptoCurrencyRepository.GetBySymbolAsync(symbol);
                    if (crypto == null)
                    {
                        crypto = new CryptoCurrency
                        {
                            Symbol = symbol,
                            Name = name,
                            CurrentPrice = currentPrice,
                            MarketCap = marketCap,
                            TotalVolume = totalVolume,
                            LastUpdated = DateTime.UtcNow
                        };
                        await _cryptoCurrencyRepository.AddAsync(crypto);
                    }
                    else
                    {
                        crypto.Name = name;
                        crypto.CurrentPrice = currentPrice;
                        crypto.MarketCap = marketCap;
                        crypto.TotalVolume = totalVolume;
                        crypto.LastUpdated = DateTime.UtcNow;

                        await _cryptoCurrencyRepository.UpdateAsync(crypto);
                    }
                }

                _logger.LogInformation("Cryptocurrency data successfully fetched and stored.");
            }
            else
            {
                _logger.LogError("Failed to fetch cryptocurrency data.");
            }
        }
    }
}