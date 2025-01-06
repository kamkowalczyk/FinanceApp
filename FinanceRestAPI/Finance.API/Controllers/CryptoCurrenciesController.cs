using Finance.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Finance.Domain.Services;

namespace Finance.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CryptoCurrenciesController : ControllerBase
    {
        private readonly ICryptoCurrencyRepository _cryptoCurrencyRepository;
        private readonly ICryptoCurrencyService _cryptoCurrencyService;

        public CryptoCurrenciesController(
            ICryptoCurrencyRepository cryptoCurrencyRepository,
            ICryptoCurrencyService cryptoCurrencyService)
        {
            _cryptoCurrencyRepository = cryptoCurrencyRepository;
            _cryptoCurrencyService = cryptoCurrencyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cryptocurrencies = await _cryptoCurrencyRepository.GetAllAsync();

            var result = cryptocurrencies.Select(c => new
            {
                Id = c.Id,
                Symbol = c.Symbol,
                Name = c.Name,
                CurrentPrice = c.CurrentPrice,
                MarketCap = c.MarketCap,
                LastUpdated = c.LastUpdated
            });
            return Ok(result);
        }

        [HttpGet("{symbol}")]
        public async Task<IActionResult> GetBySymbol(string symbol)
        {
            var cryptocurrency = await _cryptoCurrencyRepository.GetBySymbolAsync(symbol);
            if (cryptocurrency == null)
            {
                return NotFound();
            }
            return Ok(cryptocurrency);
        }

        [HttpGet("top10")]
        public async Task<IActionResult> GetTop10Cryptocurrencies()
        {
            var top10 = await _cryptoCurrencyService.GetTop10CryptocurrenciesAsync();
            return Ok(top10);
        }
    }
}