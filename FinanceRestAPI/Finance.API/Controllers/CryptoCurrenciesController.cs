using Finance.Domain.Entities;
using Finance.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Finance.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CryptoCurrenciesController : ControllerBase
    {
        private readonly ICryptoCurrencyRepository _cryptoCurrencyRepository;

        public CryptoCurrenciesController(ICryptoCurrencyRepository cryptoCurrencyRepository)
        {
            _cryptoCurrencyRepository = cryptoCurrencyRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CryptoCurrency>>> GetAll()
        {
            var cryptocurrencies = await _cryptoCurrencyRepository.GetAllAsync();
            return Ok(cryptocurrencies);
        }

        [HttpGet("{symbol}")]
        public async Task<ActionResult<CryptoCurrency>> GetBySymbol(string symbol)
        {
            var cryptocurrency = await _cryptoCurrencyRepository.GetBySymbolAsync(symbol);
            if (cryptocurrency == null)
            {
                return NotFound();
            }
            return Ok(cryptocurrency);
        }
    }
}