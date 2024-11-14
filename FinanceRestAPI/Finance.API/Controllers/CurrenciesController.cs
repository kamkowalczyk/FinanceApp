using Microsoft.AspNetCore.Mvc;
using Finance.Domain.Entities;
using Finance.Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class CurrenciesController : ControllerBase
{
    private readonly ICurrencyRepository _currencyRepository;

    public CurrenciesController(ICurrencyRepository currencyRepository)
    {
        _currencyRepository = currencyRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Currency>>> GetCurrencies()
    {
        var currencies = await _currencyRepository.GetAllAsync();
        return Ok(currencies);
    }

    [HttpGet("{code}")]
    public async Task<ActionResult<Currency>> GetCurrency(string code)
    {
        var currency = await _currencyRepository.GetByCodeAsync(code);

        if (currency == null)
        {
            return NotFound();
        }

        return Ok(currency);
    }
}
