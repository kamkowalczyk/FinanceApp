using Finance.Application.Interfaces;
using Finance.Domain.Entities;
using Finance.Domain.Interfaces;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System.Globalization;

namespace Finance.Application.Services
{
    public class ExchangeRateService : IExchangeRateService
    {
        private readonly ICurrencyRepository _currencyRepository;
        private readonly IExchangeRateRepository _exchangeRateRepository;
        private readonly ILogger<ExchangeRateService> _logger;

        public ExchangeRateService(
            ICurrencyRepository currencyRepository,
            IExchangeRateRepository exchangeRateRepository,
            ILogger<ExchangeRateService> logger)
        {
            _currencyRepository = currencyRepository;
            _exchangeRateRepository = exchangeRateRepository;
            _logger = logger;
        }

        public async Task FetchAndStoreExchangeRatesAsync()
        {
            using var client = new HttpClient();
            var url = "http://api.nbp.pl/api/exchangerates/tables/A?format=json";

            try
            {
                var response = await client.GetAsync(url);
                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError($"Failed to fetch exchange rates. Status code: {response.StatusCode}");
                    return;
                }

                var content = await response.Content.ReadAsStringAsync();
                var data = JArray.Parse(content);

                var rates = data[0]["rates"];
                if (rates == null)
                {
                    _logger.LogError("No rates data found in API response.");
                    return;
                }

                foreach (var rate in rates)
                {
                    var currencyCode = rate["code"]?.ToString();
                    var currencyRate = rate["mid"]?.ToString();

                    if (string.IsNullOrEmpty(currencyCode) || string.IsNullOrEmpty(currencyRate))
                        continue;

                    var parsedRate = decimal.Parse(currencyRate, CultureInfo.InvariantCulture);
                    var currency = await _currencyRepository.GetByCodeAsync(currencyCode);

                    if (currency == null)
                    {
                        currency = new Currency
                        {
                            Code = currencyCode,
                            Name = currencyCode
                        };
                        await _currencyRepository.AddAsync(currency);
                    }

                    var exchangeRate = new ExchangeRate
                    {
                        CurrencyId = currency.Id,
                        Rate = parsedRate,
                        Date = DateTime.UtcNow.Date
                    };

                    await _exchangeRateRepository.AddAsync(exchangeRate);
                }

                _logger.LogInformation("Exchange rates successfully fetched and stored.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exchange rates from NBP API.");
            }
        }
    }
}