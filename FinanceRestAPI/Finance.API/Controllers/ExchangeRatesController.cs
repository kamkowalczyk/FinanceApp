using Microsoft.AspNetCore.Mvc;
using Finance.Domain.Entities;
using Finance.Domain.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class ExchangeRatesController : ControllerBase
{
    private readonly IExchangeRateRepository _exchangeRateRepository;

    public ExchangeRatesController(IExchangeRateRepository exchangeRateRepository)
    {
        _exchangeRateRepository = exchangeRateRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ExchangeRate>>> GetExchangeRates()
    {
        var exchangeRates = await _exchangeRateRepository.GetByCurrencyCodeAsync(null);
        return Ok(exchangeRates);
    }

    [HttpGet("{currencyCode}")]
    public async Task<ActionResult<IEnumerable<ExchangeRate>>> GetExchangeRatesByCurrency(string currencyCode)
    {
        var exchangeRates = await _exchangeRateRepository.GetByCurrencyCodeAsync(currencyCode);

        if (exchangeRates == null)
        {
            return NotFound();
        }

        return Ok(exchangeRates);
    }
}
