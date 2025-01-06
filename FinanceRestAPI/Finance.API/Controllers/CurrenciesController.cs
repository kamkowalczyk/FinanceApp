using Finance.Domain.Entities;
using Finance.Domain.Interfaces;
using Finance.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Finance.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CurrenciesController : ControllerBase
    {
        private readonly FinanceDbContext _context;
        // lub ICurrencyRepository, jeśli go zmodyfikujesz, by zwracał dane łącznie z ExchangeRates.

        public CurrenciesController(FinanceDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCurrencies()
        {
            // Stary endpoint zwraca tylko:
            // Id, Code, Name
            var currencies = await _context.Currencies
                .Select(c => new {
                    c.Id,
                    c.Code,
                    c.Name
                })
                .ToListAsync();

            return Ok(currencies);
        }

        // Nowy endpoint, np. GET /api/currencies/withRates
        [HttpGet("withRates")]
        public async Task<IActionResult> GetCurrenciesWithLatestRate()
        {
            // Pobieramy waluty i dołączamy ExchangeRates
            // Następnie z każdej waluty wybieramy *ostatni* kurs (np. po dacie malejąco)
            // i zwracamy w polu Rate.
            // UWAGA: musisz mieć w encji Currency -> public ICollection<ExchangeRate> ExchangeRates { get; set; }
            var list = await _context.Currencies
                .Include(c => c.ExchangeRates)
                .Select(c => new
                {
                    Id = c.Id,
                    Code = c.Code,
                    Name = c.Name,
                    // Bierzemy NAJNOWSZĄ stawkę z ExchangeRates
                    // Jeśli waluta nie ma stawki, wówczas Rate = 0 / null
                    Rate = c.ExchangeRates
                        .OrderByDescending(e => e.Date)
                        .Select(e => e.Rate)
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(list);
        }
    }
}