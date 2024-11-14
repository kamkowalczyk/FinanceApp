using Microsoft.EntityFrameworkCore;
using Finance.Domain.Entities;
using Finance.Domain.Interfaces;
using Finance.Infrastructure.Data;

namespace Finance.Infrastructure.Repositories
{
    public class ExchangeRateRepository : IExchangeRateRepository
    {
        private readonly FinanceDbContext _context;

        public ExchangeRateRepository(FinanceDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ExchangeRate>> GetByCurrencyCodeAsync(string currencyCode)
        {
            return await _context.ExchangeRates
                .Include(e => e.Currency)
                .Where(e => e.Currency.Code == currencyCode)
                .ToListAsync();
        }

        public async Task AddAsync(ExchangeRate exchangeRate)
        {
            _context.ExchangeRates.Add(exchangeRate);
            await _context.SaveChangesAsync();
        }
    }
}