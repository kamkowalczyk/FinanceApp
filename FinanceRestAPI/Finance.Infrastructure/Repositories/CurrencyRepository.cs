using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Finance.Domain.Entities;
using Finance.Domain.Interfaces;
using Finance.Infrastructure.Data;

namespace Finance.Infrastructure.Repositories
{
    public class CurrencyRepository : ICurrencyRepository
    {
        private readonly FinanceDbContext _context;

        public CurrencyRepository(FinanceDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Currency>> GetAllAsync()
        {
            return await _context.Currencies.ToListAsync();
        }

        public async Task<Currency> GetByCodeAsync(string code)
        {
            return await _context.Currencies
                .FirstOrDefaultAsync(c => c.Code == code);
        }

        public async Task AddAsync(Currency currency)
        {
            _context.Currencies.Add(currency);
            await _context.SaveChangesAsync();
        }
    }
}