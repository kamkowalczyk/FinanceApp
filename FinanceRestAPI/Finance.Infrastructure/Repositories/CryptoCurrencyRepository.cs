using Finance.Domain.Entities;
using Finance.Domain.Services;
using Finance.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Finance.Infrastructure.Repositories
{
    public class CryptoCurrencyRepository : ICryptoCurrencyRepository
    {
        private readonly FinanceDbContext _context;

        public CryptoCurrencyRepository(FinanceDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CryptoCurrency>> GetAllAsync()
        {
            return await _context.CryptoCurrencies.ToListAsync();
        }

        public async Task<CryptoCurrency> GetBySymbolAsync(string symbol)
        {
            return await _context.CryptoCurrencies
                .FirstOrDefaultAsync(c => c.Symbol == symbol);
        }

        public async Task AddAsync(CryptoCurrency cryptoCurrency)
        {
            _context.CryptoCurrencies.Add(cryptoCurrency);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(CryptoCurrency cryptoCurrency)
        {
            _context.CryptoCurrencies.Update(cryptoCurrency);
            await _context.SaveChangesAsync();
        }
    }
}