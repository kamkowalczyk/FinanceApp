﻿using Finance.Application.Interfaces;
using Finance.Domain.Entities;
using Finance.Domain.Interfaces;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System;
using System.Threading.Tasks;

namespace Finance.Application.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly ILogger<CompanyService> _logger;
        private readonly string _apiKey;

        public CompanyService(
            ICompanyRepository companyRepository,
            ILogger<CompanyService> logger)
        {
            _companyRepository = companyRepository;
            _logger = logger;
            _apiKey = "SMH7APF3Z8TM0FFM";
        }

        public async Task FetchAndStoreCompanyDataAsync()
        {
            var symbols = new[] { "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA" }; 

            foreach (var symbol in symbols)
            {
                using var client = new HttpClient();
                var url = $"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={_apiKey}";

                var response = await client.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var data = JObject.Parse(content);

                    var globalQuote = data["Global Quote"];
                    if (globalQuote != null)
                    {
                        var company = await _companyRepository.GetBySymbolAsync(symbol);
                        var price = decimal.TryParse(globalQuote["05. price"]?.ToString(), out var p) ? p : (decimal?)null;
                        var name = symbol;

                        if (company == null)
                        {
                            company = new Company
                            {
                                Symbol = symbol,
                                Name = name,
                                CurrentPrice = price,
                                LastUpdated = DateTime.UtcNow
                            };
                            await _companyRepository.AddAsync(company);
                        }
                        else
                        {
                            company.CurrentPrice = price;
                            company.LastUpdated = DateTime.UtcNow;
                            await _companyRepository.UpdateAsync(company);
                        }

                        _logger.LogInformation($"Data for company {symbol} fetched and stored.");
                    }
                    else
                    {
                        _logger.LogError($"No data found for symbol {symbol}.");
                    }
                }
                else
                {
                    _logger.LogError($"Failed to fetch data for symbol {symbol}.");
                }

                await Task.Delay(12000); 
            }
        }
    }
}