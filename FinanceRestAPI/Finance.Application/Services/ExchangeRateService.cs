using Finance.Application.Interfaces;
using Finance.Domain.Entities;
using Finance.Domain.Interfaces;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Logging;

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

            var url = "https://api.exchangerate.host/latest?base=EUR";

            var response = await client.GetAsync(url);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var data = JObject.Parse(content);

                var rates = data["rates"];

                foreach (var rate in rates)
                {
                    var currencyCode = rate.Path;
                    var currencyRate = (decimal)rate.First;

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
                        Rate = currencyRate,
                        Date = DateTime.UtcNow.Date
                    };

                    await _exchangeRateRepository.AddAsync(exchangeRate);
                }
            }
            else
            {
                _logger.LogError("Failed to fetch exchange rates.");
            }
        }
    }
}
