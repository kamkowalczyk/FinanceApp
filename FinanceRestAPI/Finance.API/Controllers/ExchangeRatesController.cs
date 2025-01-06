using Finance.Application.Interfaces;
using Finance.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Finance.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExchangeRatesController : ControllerBase
    {
        private readonly IExchangeRateRepository _exchangeRateRepository;
        private readonly IExchangeRateService _exchangeRateService;

        public ExchangeRatesController(
            IExchangeRateRepository exchangeRateRepository,
            IExchangeRateService exchangeRateService)
        {
            _exchangeRateRepository = exchangeRateRepository;
            _exchangeRateService = exchangeRateService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllExchangeRates()
        {
            var rates = await _exchangeRateRepository.GetByCurrencyCodeAsync(null);
            var result = rates.Select(r => new
            {
                Id = r.Id,
                Rate = r.Rate,
                Date = r.Date,
                Currency = new
                {
                    Id = r.Currency.Id,
                    Code = r.Currency.Code,
                    Name = r.Currency.Name
                }
            });
            return Ok(result);
        }

        [HttpGet("{currencyCode}")]
        public async Task<IActionResult> GetExchangeRatesByCurrency(string currencyCode)
        {
            var exchangeRates = await _exchangeRateRepository.GetByCurrencyCodeAsync(currencyCode);
            if (!exchangeRates.Any())
            {
                return NotFound($"Exchange rates for currency '{currencyCode}' not found.");
            }

            var result = exchangeRates.Select(e => new
            {
                Id = e.Id,
                Rate = e.Rate,
                Date = e.Date,
                Currency = new
                {
                    Id = e.Currency.Id,
                    Code = e.Currency.Code,
                    Name = e.Currency.Name
                }
            });
            return Ok(result);
        }

        [HttpPost("fetch")]
        public async Task<IActionResult> FetchAndStoreExchangeRates()
        {
            try
            {
                await _exchangeRateService.FetchAndStoreExchangeRatesAsync();
                return Ok("Exchange rates successfully updated.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error while updating exchange rates: {ex.Message}");
            }
        }
    }
}
