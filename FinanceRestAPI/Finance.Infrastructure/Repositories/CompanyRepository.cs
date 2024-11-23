using Finance.Domain.Entities;
using Finance.Domain.Interfaces;
using Finance.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Finance.Infrastructure.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly FinanceDbContext _context;

        public CompanyRepository(FinanceDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Company>> GetAllAsync()
        {
            return await _context.Companies.ToListAsync();
        }

        public async Task<Company> GetBySymbolAsync(string symbol)
        {
            return await _context.Companies.FirstOrDefaultAsync(c => c.Symbol == symbol);
        }

        public async Task AddAsync(Company company)
        {
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Company company)
        {
            _context.Companies.Update(company);
            await _context.SaveChangesAsync();
        }
    }
}